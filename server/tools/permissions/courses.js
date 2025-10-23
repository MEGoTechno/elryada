const coursesConstants = {
    CreateCourses: 'courses_create', UpdateCourses: 'courses_update', DeleteCourses: 'courses_delete',
    PermissionsCourses: 'courses_permissions', TeachersCourses: 'courses_teachers',
    CoursesSubscriptions: 'course_subscriptions', CouponsCourses: 'courses_coupons',

    $CourseUpdate: 'course_update:', $CourseDelete: 'course_delete:', $CourseCoupons: 'course_coupons:',

    $CourseLecturesCreate: 'course_lectures_create:',
    $CourseSubscriptions: 'course_subscriptions:', $CourseLecturesStatistics: 'course_lectures_statistics:',
    $CourseTeachers: 'course_teachers:', $CoursePermissions: 'course_permissions:'
}

const coursesPerms = (courseId, key = null, meta = { values: false }) => {
    const isScoped = (id) => id ? true : false

    const all = {
        create: [
            { id: 'courses_create', label: 'إنشاء كورسات' }
        ],
        subscriptions: [
            {
                id: coursesConstants.CoursesSubscriptions,
                label: "عرض الطلاب في الكورسات ",
            },
            isScoped(courseId) && {
                id: coursesConstants.$CourseSubscriptions + courseId,
                label: "عرض الطلاب للكورس",
                scoped: true
            },
        ].filter(Boolean),
        addSubscriptions: [
            {
                id: 'courses.addSubscriptions',
                label: "إضافة الطلاب الي الكورسات ",
            }, isScoped(courseId) && {
                id: 'course.addSubscriptions:' + courseId,
                label: "إضافة الطلاب الي هذا الكورس ",
                scoped: true
            },
        ].filter(Boolean),

        deleteSubscriptions: [{
            id: 'courses.deleteSubscriptions',
            label: "ازاله الطلاب من الكورسات ",
        }, isScoped(courseId) && {
            id: 'course.deleteSubscriptions:' + courseId,
            label: "ازاله الطلاب من هذا الكورس ",
            scoped: true
        },
        ].filter(Boolean),

        teachers: [
            {
                id: coursesConstants.TeachersCourses,
                label: "إضافة او حذف مدرس في الكورسات ",
            }, isScoped(courseId) && {
                id: coursesConstants.$CourseTeachers + courseId,
                label: "إضافة او حذف مدرس",
                scoped: true
            },
        ].filter(Boolean),

        permissions: [
            {
                id: coursesConstants.PermissionsCourses,
                label: "امكانيه تغيير الصلاحيات في الكورسات ",
            }, isScoped(courseId) && {
                id: coursesConstants.$CoursePermissions + courseId,
                label: "امكانيه تغيير الصلاحيات",
                scoped: true,
                isDefault: false
            },
        ].filter(Boolean),

        coupons: [
            {
                id: coursesConstants.CouponsCourses,
                label: "إدارة الكوبونات في الكورسات ",
            }, isScoped(courseId) && {
                id: coursesConstants.$CourseCoupons + courseId,
                label: "إدارة الكوبونات",
                scoped: true

            },
        ].filter(Boolean),

        delete: [
            {
                id: coursesConstants.DeleteCourses,
                label: "حذف الكورسات ",
            }, isScoped(courseId) && {
                id: coursesConstants.$CourseDelete + courseId,
                label: "حذف الكورس",
                scoped: true

            },
        ].filter(Boolean),
        read: [
            { id: 'courses_readAll', label: 'عرض كل الكورسات' }
        ].filter(Boolean),
        update: [
            {
                id: coursesConstants.UpdateCourses,
                label: "تعديل الكورسات ",
            }, isScoped(courseId) && {
                id: coursesConstants.$CourseUpdate + courseId,
                label: "تعديل الكورس",
                scoped: true
            },
        ].filter(Boolean),
    };

    return key ? all[key] : meta.values ? Object.values(all) : all
}

const chapterPerms = (chapterId, key = null, meta = { courseId: null, values: false }) => {
    const courseId = meta.courseId ?? null

    const isScoped = (id) => id ? true : false

    const multiply = (ids, permCode, others) => {
        return Array.isArray(ids) ? ids.map(id => ({ id: permCode + id, ...others })) : { id: permCode + ids, ...others }
    }

    const all = {
        create: [
            { id: "chapters_create", label: "إنشاء اجزاء لاي كورس" },
            isScoped(courseId) && {
                id: courseId ? `course_chapters_create:${courseId}` : null,
                label: "إنشاء اجزاء لهذا الكورس", scoped: true
            }
        ].filter(Boolean),

        update: [
            { id: "chapters_update", label: "تعديل الاجزاء في الكورسات " },
            isScoped(chapterId) && {
                id: `chapter_update:${chapterId}`, label: "تعديل الجزء", scoped: true,
                isDefault: true
            },
        ].filter(Boolean),

        delete: [
            { id: "chapters_delete", label: "حذف اي جزء  في الكورسات " },
            isScoped(chapterId) && {
                id: `chapter_delete:${chapterId}`, label: "حذف الجزء", scoped: true
            },
        ].filter(Boolean),

        permissions: [
            { id: "chapters_permissions", label: "صلاحيات الاجزاء في الكورسات " },
            isScoped(chapterId) && {
                id: `chapter_permissions:${chapterId}`, label: "صلاحيات الجزء", scoped: true
                , isDefault: false
            },
        ].filter(Boolean),

        lecturesShow: [
            { id: "chapters_lectures_read", label: "عرض محاضرات المدرس", isDefault: true },
        ],
        lecturesStatistics: [
            { id: "chapters_lectures_statistics", label: "امكانيه عرض الاحصائيات لكل المحاضرات" },
            isScoped(chapterId) && {
                id: `chapter_lectures_statistics:${chapterId}`, label: " عرض الاحصائيات لمحاضرات هذا الفصل", scoped: true
                , isDefault: true
            },
            courseId && {
                id: `course_lectures_statistics:${courseId}`, label: " عرض الاحصائيات لمحاضرات هذا الكورس", scoped: true
                , isDefault: true
            },
        ].filter(Boolean),

        lecturesCodes: [
            { id: "chapters_lectures_codes", label: "امكانيه إنشاء اكواد للمحاضرات" },
            courseId && {
                id: `course_lectures_codes:${courseId}`, label: "امكانيه إنشاء اكواد لمحاضرات هذا الفصل", scoped: true
            },
            isScoped(chapterId) && {
                id: `chapter_lectures_codes:${chapterId}`, label: "امكانيه إنشاء اكواد لمحاضرات هذا الفصل", scoped: true
            },
        ].filter(Boolean),

        lecturesCreate: [
            { id: "chapters_lectures_create", label: "إضافة المحاضرات  في الكورسات " },
            isScoped(chapterId) && multiply(chapterId, 'chapter_lectures_create:', { isDefault: true, scoped: true }),
        ].flat().filter(Boolean),

        lecturesUpdate: [
            { id: "chapters_lectures_update", label: "تعديل المحاضرات  في الكورسات " },
            isScoped(chapterId) && multiply(chapterId, 'chapter_lectures_update:', { isDefault: true, scoped: true }),
        ].flat().filter(Boolean),

        lecturesDelete: [
            { id: "chapter_lectures_delete", label: "حذف محاضرات في الكورسات " },
            isScoped(chapterId) && multiply(chapterId, 'chapter_lectures_delete:', { isDefault: true, scoped: true }),
        ].flat().filter(Boolean),
    }
    return key ? all[key] : meta.values ? Object.values(all).flat() : all
}

const unitsPerms = (no, key = null, meta = { values: false }) => {
    const all = {
        create: [
            { id: 'units_create', label: 'إنشاء وحدات' },
        ],
        update: [
            { id: 'units_update', label: 'تعديل الوحدات' },
        ],
        delete: [
            { id: 'units_delete', label: 'حذف الوحدات' },
        ],
    }
    return key ? all[key] : meta.values ? Object.values(all) : all
}

const questionsPerms = (key = null, meta = { values: false }) => {
    const all = {
        manageQuestions: [
            { id: 'questions.manage', label: 'إدارة أسئلة', isDefault: true }
        ],
        create: [
            { id: 'questions.create', label: 'إنشاء أسئلة', isValid: false }
        ],
        update: [
            { id: 'questions.update', label: 'تعديل الأسئلة', isValid: false }
        ],
        delete: [
            { id: 'questions.delete', label: 'حذف الأسئلة', isValid: false }
        ],
        showAnswers: [
            { id: 'answers.read', label: 'عرض كل الإجابات' }
        ]

    }

    return key ? all[key] : meta.values ? Object.values(all) : all
}

const tagsPerms = (key = null, meta = { values: false }) => {
    const all = {
        manageTags: [
            { id: 'tags.manage', label: 'إدارة المهارات', isValid: true, isDefault: true }
        ],
        create: [
            { id: 'tags.create', label: 'إنشاء رابط أسئلة', isValid: false }
        ],
        update: [
            { id: 'tags.update', label: 'تعد', isValid: false }
        ],
        delete: [
            { id: 'tags.delete', label: '', isValid: false }
        ]
    }

    return key ? all[key] : meta.values ? Object.values(all) : all
}

module.exports = { unitsPerms, coursesPerms, chapterPerms, questionsPerms, tagsPerms }