export const chapterPerms = (chapterId, key = null, meta = { courseId: null, values: false }) => {
    const courseId = meta.courseId ?? null

    const all = {
        create: [
            { id: "chapters_create", label: "انشاء اجزاء لاي كورس" },
            {
                id: courseId ? `course_chapters_create:${courseId}` : null,
                label: "انشاء اجزاء لهذا الكورس", scoped: true
            },
        ],

        update: [
            { id: "chapters_update", label: "تعديل الاجزاء في الكورسات " },
            { id: `chapter_update:${chapterId}`, label: "تعديل الجزء", scoped: true },
        ],
        delete: [
            { id: "chapters_delete", label: "حذف اي جزء  في الكورسات " },
            { id: `chapter_delete:${chapterId}`, label: "حذف الجزء", scoped: true },
        ],
        permissions: [
            { id: "chapters_permissions", label: "صلاحيات الاجزاء في الكورسات " },
            { id: `chapter_permissions:${chapterId}`, label: "صلاحيات الجزء", scoped: true },
        ],
        lecturesShow: [
            { id: "chapters_lectures_read", label: "عرض محاضرات المدرس" },
        ],
        lecturesCreate: [
            { id: "chapters_lectures_create", label: "ايضافه المحاضرات  في الكورسات " },
            { id: `chapter_lectures_create:${chapterId}`, label: "ايضافه محاضرات", scoped: true },
        ],
        lecturesStatistics: [
            { id: "chapters_lectures_statistics", label: "امكانيه عرض الاحصائيات لكل المحاضرات" },
            // chapterId && { id: `chapter_lectures_statistics:${chapterId}`, label: " عرض الاحصائيات لمحاضرات هذا الفصل", scoped: true },
            courseId && { id: `course_lectures_statistics:${courseId}`, label: " عرض الاحصائيات لمحاضرات هذا الكورس", scoped: true },
        ].filter(Boolean),

        lecturesCodes: [
            { id: "chapters_lectures_codes", label: "امكانيه انشاء اكواد للمحاضرات" },
            chapterId && { id: `chapter_lectures_codes:${chapterId}`, label: "امكانيه انشاء اكواد لمحاضرات هذا الفصل", scoped: true },
            courseId && { id: `course_lectures_codes:${courseId}`, label: " امكانيه انشاء اكواد لمحاضرات هذا الكورس", scoped: true },
        ].filter(Boolean),

        lecturesUpdate: [
            { id: "chapters_lectures_update", label: "تعديل المحاضرات  في الكورسات " },
            { id: `chapter_lectures_update:${chapterId}`, label: "تعديل محاضرات", scoped: true },
        ],
        lecturesDelete: [
            { id: "chapter_lectures_delete", label: "حذف محاضرات في الكورسات " },
            { id: `chapter_lectures_delete:${chapterId}`, label: "حذف محاضرات", scoped: true },
        ],
    }
    return key ? all[key] : meta.values ? Object.values(all) : all
}

export const usersPerms = (none, key = null) => {

    const all = {
        create: [
            { id: "users_create", label: "انشاء طلاب" },
        ].filter(Boolean),

        update: [
            { id: "users_update", label: "التعديل على طلاب" },
        ],
        delete: [
            { id: "users_delete", label: "حذف مستخدمين طلاب و معلمين" },
        ]
    }

    return key ? all[key] : all
}

export const questionsPerms = (key = null, meta = { values: false }) => {
    const all = {
        manageQuestions: [
            { id: 'questions.manage', label: 'اداره اسئله' }
        ],
        create: [
            { id: 'questions.create', label: 'انشاء اسئله', isValid: false }
        ],
        update: [
            { id: 'questions.update', label: 'تعديل الاسئله', isValid: false }
        ],
        delete: [
            { id: 'questions.delete', label: 'حذف الاسئله', isValid: false }
        ],
        showAnswers: [
            { id: 'answers.read', label: 'عرض كل الايجابات' }
        ]

    }

    return key ? all[key] : meta.values ? Object.values(all) : all
}

export const tagsPerms = (key = null, meta = { values: false }) => {
    const all = {
        manageTags: [
            { id: 'tags.manage', label: 'اداره الروابط', isValid: true }
        ],
        create: [
            { id: 'tags.create', label: 'انشاء رابط اسئله', isValid: false }
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