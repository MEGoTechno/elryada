import MakeForm from '../../tools/makeform/MakeForm'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import sectionConstants from '../../settings/constants/sectionConstants'
import { lang } from '../../settings/constants/arlang'
import dayjs from 'dayjs'
import LinkToQuestion from './LinkToQuestion'
import { memo } from 'react'
import examMethods, { examMethodsConstants } from '../../settings/constants/examMethods'
import { isDevelop } from '../../tools/isDevelop'
import { durationRegex } from '../content/LectureForm'
import MakeInput from '../../tools/makeform/MakeInput'
import { useField } from 'formik'
import useQuestionsSchema from '../questions/useQuestionsSchema'

// const durationRegex = /^(?:(?:\d+)\s*[hms]?)(?:\s+(?:(?:\d+)\s*[hms]))*$/;
const TimeInput = ({ value, input }) => {
    const [{ value: isTime }] = useField('isTime')

    return <>
        {isTime && (
            <MakeInput input={{ ...input, value: value }} />
        )}
    </>

}

function ExamForm({ lecture, status, onSubmit, sectionName = 'الاختبار', sectionType = sectionConstants.EXAM }) {

    const test = useQuestionsSchema({ grade: lecture.grade, questions: lecture?.exam?.questions ?? [] })

    //lecture info
    const lectureInfoInputs = [
        {
            name: 'sectionType',
            label: 'section',
            value: sectionType,
            hidden: false,
            disabled: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 1,
            row: 1
        }, {
            name: 'grade',
            label: '',
            value: lecture?.grade,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
        }, {
            name: 'course',
            label: '',
            value: lecture?.course,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture.name ?? '',
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 1,
            row: 2,
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 10,
            value: lecture.description ?? '',
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 2,
            row: 1,
            rowSpan: 3, // to match height of 3 rows in column 1
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: lecture.isActive ?? true,
            column: 1,
            row: 5,
        }, {
            name: 'method',
            label: 'اختر طريقه التصحيح',
            type: 'select',
            value: lecture?.exam?.method ?? (sectionType === sectionConstants.EXAM ? examMethodsConstants.EXAM : examMethodsConstants.QUESTION), //? getExamMethod({ isDefault: true, key: 'value' })
            options: examMethods,
            column: 1,
            row: 3,
            validation: Yup.string()
                .required(lang.REQUERIED),
        },
        {
            name: "isTime",
            label: "هل تريد تفعيل التوقيت فى " + sectionName,
            type: 'switch',
            value: lecture?.exam?.isTime ?? sectionType === sectionConstants.EXAM,
            column: 1,
            row: 3,
        }, {
            name: "dateStart",
            label: "تاريخ تفعيل " + sectionName,
            type: 'fullDate',
            value: lecture?.dateStart ? dayjs(lecture.dateStart) : null,
            column: 3,
            row: 1,
        }, {
            name: "dateEnd",
            label: "تاريخ الغاء " + sectionName,
            type: 'fullDate',
            value: lecture?.dateEnd ? dayjs(lecture.dateEnd) : null,
            column: 3,
            row: 2,
            validation: Yup.mixed()
                .nullable()
                .when('dateStart', (dateStart, schema) =>
                    dateStart
                        ? schema.test(
                            'is-after-start-date',
                            'يجب ان يكون تاريخ النهايه بعد تاريخ البدايه',
                            (dateEnd) => {
                                if (dateEnd) {
                                    return dayjs(dateEnd).isAfter(dayjs(dateStart))
                                } else {
                                    return true
                                }
                            }
                        )
                        : schema
                ),
        }, {
            name: "attemptsNums",
            label: "عدد المحاولات",
            type: 'number',
            value: lecture?.exam?.attemptsNums ?? 1,
            validation: Yup.number()
                .required(lang.REQUERIED),
            column: 1,
            row: 4
        },
        {
            name: "showAnswersDate",
            label: "تاريخ اظهار الإجابات",
            type: 'fullDate',
            value: lecture?.exam?.showAnswersDate ? dayjs(lecture.exam.showAnswersDate) : null,
            column: 3,
            row: 3,
        }, {
            name: "isShowAnswers",
            label: "هل تريد اظهار الإجابات",
            type: 'switch',
            value: lecture?.exam?.isShowAnswers ?? true,
            column: 3,
            row: 3,
        },
        //  {
        //     name: "time",
        //     label: "الوقت",
        //     value: lecture?.exam?.time ?? '15m',
        //     validation: Yup.string()
        //         .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
        //         .required(lang.REQUERIED),
        //     column: 1,
        //     row: 4
        // },
        {
            name: 'time',
            label: 'الوقت',
            value: lecture?.exam?.time ?? '15m',
            column: 1, row: 4,
            component: TimeInput,
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
        }, {
            name: 'price',
            label: 'السعر',
            type: 'number',
            value: lecture?.price ?? 0,
            column: 2
        }, {
            name: 'isSalable',
            label: 'قابله للبيع',
            type: 'switch',
            value: lecture?.isSalable ?? true,
            column: 3
        }, {
            name: "linkedQuestions",
            component: LinkToQuestion
        },
    ]

    //exam info => in update nested
    const inputs = [...lectureInfoInputs, ...test
    ]
   
    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} enableReinitialize={false} />
    )
}

export default memo(ExamForm)