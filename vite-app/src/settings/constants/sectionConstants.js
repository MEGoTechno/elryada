const sectionConstants = {
    VIDEO: 'فيديو',
    FILE: 'ملف PDF', //مرفقات
    EXAM: "اختبار",
    LINK: 'لينك',
    LIVE: 'بث',
    EXERCISE: 'تدريب'
}

export const modifiedSection = [
    {
        label: 'بث مباشر',
        value: sectionConstants.LIVE,
    },
    {
        label: sectionConstants.VIDEO,
        value: sectionConstants.VIDEO,
    }, {
        label: 'مرفقات',
        value: sectionConstants.FILE,
    }, {
        label: 'لينك',
        value: sectionConstants.LINK,
    }, {
        label: 'تدريب',
        value: sectionConstants.EXERCISE,
    }, {
        label: 'اختبار',
        value: sectionConstants.EXAM,
    },
]

export default sectionConstants