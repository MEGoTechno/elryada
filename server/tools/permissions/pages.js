const pages = {
    sessions: [{ id: 'p_sessions' }],
    permissions: [{ id: 'p_permissions' }],
    teachers: [{ id: 'p_teachers' }],
    users: [{ id: 'p_users' }],
    findUser: [{ id: 'p_findUser' }],
    coursesManage: [{ id: 'p_coursesManage', isDefault: true }],
    subscriptions: [{ id: 'p_subscriptions' }],
    questions: [{ id: 'p_questions' }],
    attempts: [{ id: 'p_attempts' }],
    lectures: [{ id: 'p_lectures' }],
    views: [{ id: 'p_views' }],
    codes: [{ id: 'p_codes' }],
    coupons: [{ id: 'p_coupons' }],
    createCode: [{ id: 'p_createCode' }],
    groups: [{ id: 'p_groups' }],
    managePrivacy: [{ id: 'p_managePrivacy' }],
    stdReports: [{ id: 'p_stdReports' }],
    payments: [{ id: 'p_payments' }],
    invoices: [{ id: 'p_invoices' }],
    feedBacks: [{ id: 'p_feedBacks' }]
};
const usersPerms = (none, key = null) => {

    const all = {
        create: [
            { id: "users_create", label: "إنشاء طلاب" },
        ].filter(Boolean),

        update: [
            { id: "users_update", label: "التعديل على طلاب" },
        ],
        delete: [
            { id: "users_delete", label: "حذف مستخدمين طلاب ودرسين" },
        ]
    }

    return key ? all[key] : all
}

module.exports = { pages, usersPerms }