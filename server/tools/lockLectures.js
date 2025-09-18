const { default: mongoose } = require("mongoose");
const ChapterModel = require("../models/ChapterModel");
const LectureModel = require("../models/LectureModel");
const sectionConstants = require("./constants/sectionConstants");

const populate = [
    {
        path: 'video',
        select: 'duration', // Only select the `duration` field from the `video`
    },
    {
        path: 'exam',
        select: 'questions attemptsNums time', // Select `questions` field from `exam`
    }
];

const lockLectures = async (course, userCourse, user = null) => {

    try {

        // Mark subscription status
        course.isSubscribed = !!userCourse; //true Or false
        if (userCourse) course.subscribedAt = userCourse.createdAt;

        let chapters = await ChapterModel.find({ courses: course._id, isActive: true }).lean()
        let lectures = await LectureModel.find({ chapters: { $in: chapters.map((ch) => ch._id) }, isActive: true }).populate(populate).lean()
        //course: { $in: [...course.linkedTo, course._id] }

        // Group lectures by chapter in one pass
        const lectureMap = {};

        lectures.forEach((lecture, i) => {
            // Paid status
            if (user) {
                user.lectures = user.lectures || [];
                lecture.isPaid = user.lectures.includes(lecture._id);
            }

            // Exam question length optimization
            if (lecture.sectionType === sectionConstants.EXAM && lecture.exam) {
                lecture.exam.questionsLength = lecture.exam.questions?.length || 0;
                delete lecture.exam.questions;
            }

            // Put lectures into map for each chapter
            (lecture.chapters || []).forEach((chId) => {
                const id = chId.toString();
                if (!lectureMap[id]) lectureMap[id] = [];
                lectureMap[id].push(lecture);
            });
        });

        // Attach lectures to each chapter and handle locking
        const modifiedChapters = chapters.map((chapter) => {
            const userChapterProgress = userCourse?.chapters?.find(c => c.chapter.toString() === chapter._id.toString())?.currentIndex || 1;

            //Locking => chapter.isMust - userCourse
            const chapterLectures = (chapter.isMust && userCourse) ? (lectureMap[chapter._id.toString()] || []).map((lecture, i) => {
                lecture.index = i + 1

                if (userChapterProgress < lecture.index) {
                    lecture.locked = true;
                }
                return lecture;
            }) : lectureMap[chapter._id.toString()]?.map((_, i) => ({ ..._, index: i + 1 })) || []

            return {
                ...chapter,
                lectures: chapterLectures
            };
        });

        if (userCourse) {
            course.userProgress = userCourse.chapters || {}
        }
        // if (userCourse && course.isMust) {
        //     //lock lectures
        //     modifiedLectures.map(lecture => {
        //         if (userCourse.currentIndex < lecture.index) {
        //             lecture.locked = true
        //         }
        //         return lecture
        //     })

        //     let startIndex = lectures.findIndex(obj => obj.index === userCourse.currentIndex);

        //     if (startIndex < 0) {
        //         startIndex = 0
        //     }
        //     // Slice from the found startIndex to the end, and from the beginning to startIndex
        //     const firstPart = lectures.slice(startIndex); // Elements from found index to end
        //     const secondPart = lectures.slice(0, startIndex); // Elements from beginning to found index - 1

        //     // Concatenate the two parts
        //     lectures = firstPart.concat(secondPart);
        // }

        return [course, modifiedChapters]
    } catch (error) {
        return error
    }
}

const lockLecturesAggregate = async (course, userCourse, user = null) => {
    try {
        // Mark subscription status
        course.isSubscribed = !!userCourse;
        if (userCourse) course.subscribedAt = userCourse.createdAt;
        const courseId = new mongoose.Types.ObjectId(course._id)

        // Aggregate chapters + lectures in one query
        const chaptersData = await ChapterModel.aggregate([
            { $match: { courses: courseId, isActive: true } },
            {
                $lookup: {
                    from: "lectures",
                    let: { chapterId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $and: [{ $in: ["$$chapterId", "$chapters"] }, { $eq: ["$isActive", true] }] }
                            }
                        }, {
                            $lookup: {
                                from: "videos",
                                localField: "video",
                                foreignField: "_id",
                                as: "video"
                            }
                        },
                        { $unwind: { path: "$video", preserveNullAndEmptyArrays: true } },
                        // { $project: { "video.duration": 1, exam: 1, sectionType: 1, chapters: 1, title: 1 } }
                    ],
                    as: "lectures"
                }
            },
            // { $project: { name: 1, lectures: 1 } }
        ]);
        // console.log(chaptersData)
        // Process lectures in one pass
        const finalChapters = chaptersData.map((chapter) => {
            const userChapterProgress = userCourse?.chapters?.find(c => c.chapter.toString() === chapter._id.toString())?.currentIndex || null;

            chapter.lectures = chapter.lectures.map((lec, i) => {
                lec.index = i + 1;

                // Is Paid logic
                if (user) {
                    lec.isPaid = (user.lectures || []).includes(lec._id);
                }

                // Exam question length optimization
                if (lec.sectionType === "EXAM" && lec.exam) {
                    lec.exam.questionsLength = lec.exam.questions?.length || 0;
                    delete lec.exam.questions;
                }

                // Lock lectures if must complete order
                if (userChapterProgress && chapter.isMust && userChapterProgress < lec.index) {
                    lec.locked = true;
                }

                return lec;
            });

            return chapter;
        });

        return [course, finalChapters];
    } catch (error) {
        return error;
    }
};

module.exports = lockLectures