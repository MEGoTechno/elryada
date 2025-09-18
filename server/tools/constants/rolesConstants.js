const user_roles = {
    ADMIN: "أدمن",
    SUBADMIN: "مشرف",
    STUDENT: "طالب",
    ONLINE: 'اونلاين',
    INREVIEW: "تحت المراجعه",
    NOT_USER: 'غير مسجل',
    TEACHER: 'مدرس',
    MENTOR: ""
}

const userRolesArr = [
    { id: user_roles.ADMIN, label: '', isActive: true },
    { id: user_roles.SUBADMIN, label: '', isActive: true },
    { id: user_roles.TEACHER, label: '', isActive: true },
    { id: user_roles.ONLINE, label: '', isActive: true },
    { id: user_roles.STUDENT, label: '', isActive: false },
    { id: user_roles.INREVIEW, label: '', isActive: true },
]

const coursesObj = {
    CREATE: 'courses.create', UPDATE: 'courses.update', READ: 'courses.read', DELETE: 'courses.delete',
    STATISTICS: "courses.statistics", Permissions: 'permissions',
    UpdateOne: 'update:', statisticsOne: 'statistics:'
}

const permissions = [
    ...Object.values(coursesObj),
]

module.exports = { user_roles, userRolesArr, coursesObj }