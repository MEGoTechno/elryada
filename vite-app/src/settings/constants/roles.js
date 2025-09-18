export const user_roles = {
    ADMIN: "أدمن",
    SUBADMIN: "مشرف",
    STUDENT: "طالب",
    ONLINE: 'اونلاين',
    INREVIEW: "تحت المراجعه",
    NOT_USER: 'غير مسجل',
    TEACHER: 'مدرس',
}

// 1- add to Permissions Columns - 2-> hasPermissions on specific Item
// 3- -=> controller Backend


//Scenarios =>
// 1- All models => update only
// 2- specific Model as course => course.update
// 3- specific Doc as courseId => update:courseId
// 4- actions => actionsName as Prev schema || 
//users => global by S - create:id => dynamic - addSubscription:id