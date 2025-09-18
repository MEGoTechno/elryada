export const coursesConstants = {
    CreateCourses: 'courses_create', UpdateCourses: 'courses_update', DeleteCourses: 'courses_delete',
    PermissionsCourses: 'courses_permissions', TeachersCourses: 'courses_teachers',
    CoursesSubscriptions: 'course_subscriptions', CouponsCourses: 'courses_coupons',

    $CourseUpdate: 'course_update:', $CourseDelete: 'course_delete:', $CourseCoupons: 'course_coupons:',

    $CourseLecturesCreate: 'course_lectures_create:',
    $CourseSubscriptions: 'course_subscriptions:', $CourseLecturesStatistics: 'course_lectures_statistics:',
    $CourseTeachers: 'course_teachers:', $CoursePermissions: 'course_permissions:', $CourseJoin: 'course_joins:'
}

export const coursesPerms = (courseId, key = null, meta = { values: false }) => {
    const all = {
        create: [
            { id: 'courses_create', label: 'انشاء كورسات' }
        ], read: [
            { id: 'courses_readAll', label: 'عرض كل الكورسات' }
        ],
        update: [
            {
                id: coursesConstants.UpdateCourses,
                label: "تعديل الكورسات ",
            }, {
                id: coursesConstants.$CourseUpdate + courseId,
                label: "تعديل الكورس",
                scoped: true

            },
        ],
        delete: [
            {
                id: coursesConstants.DeleteCourses,
                label: "حذف الكورسات ",
            }, {
                id: coursesConstants.$CourseDelete + courseId,
                label: "حذف الكورس",
                scoped: true

            },
        ],
        subscriptions: [
            {
                id: coursesConstants.CoursesSubscriptions,
                label: "عرض الطلاب في الكورسات ",
            }, {
                id: coursesConstants.$CourseSubscriptions + courseId,
                label: "عرض الطلاب للكورس",
                scoped: true
            },
        ],
        addSubscriptions: [
            {
                id: 'courses.addSubscriptions',
                label: "ايضافه الطلاب الي الكورسات ",
            }, {
                id: 'course.addSubscriptions:' + courseId,
                label: "ايضافه الطلاب الي هذا الكورس ",
                scoped: true
            },
        ],
        deleteSubscriptions: [{
            id: 'courses.deleteSubscriptions',
            label: "ازاله الطلاب من الكورسات ",
        }, {
            id: 'course.deleteSubscriptions:' + courseId,
            label: "ازاله الطلاب من هذا الكورس ",
            scoped: true
        },],

        teachers: [
            {
                id: coursesConstants.TeachersCourses,
                label: "ايضافه او حذف مدرس في الكورسات ",
            }, {
                id: coursesConstants.$CourseTeachers + courseId,
                label: "ايضافه او حذف مدرس",
                scoped: true
            },
        ],

        permissions: [
            {
                id: coursesConstants.PermissionsCourses,
                label: "امكانيه تغيير الصلاحيات في الكورسات ",
            }, {
                id: coursesConstants.$CoursePermissions + courseId,
                label: "امكانيه تغيير الصلاحيات",
                scoped: true
            },
        ],

        coupons: [
            {
                id: coursesConstants.CouponsCourses,
                label: "اداره الكوبونات في الكورسات ",
            }, {
                id: coursesConstants.$CourseCoupons + courseId,
                label: "اداره الكوبونات",
                scoped: true

            },
        ],


        joinCourses: [
            {
                id: coursesConstants.$CourseJoin + courseId,
                label: "",
                isValid: false,
                scoped: true

            },
        ],
    };

    return key ? all[key] : meta.values ? Object.values(all) : all
}

export const unitsPerms = (no, key = null, meta = { values: false }) => {
    const all = {
        create: [
            { id: 'units_create', label: 'انشاء وحدات' },
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