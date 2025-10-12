
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import MakeForm from '../../tools/makeform/MakeForm'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'

import { IoSchool } from 'react-icons/io5'
import useGrades from '../../hooks/useGrades'

function QuestionsForm({ onSubmit, status, questions = null, metaData = { isAdd: true, isDelete: true } }) {
    const { grades } = useGrades()

    const questionSchema = {
        title: "",
        hints: "",
        image: "",
        rtOptionId: "",
        points: 1,
        isShuffle: true,
        clarifyText: '',
        clarifyUrl: '',
        grade: localStorage.getItem('grade') ? grades.find(g => g._id === localStorage.getItem('grade')) : '',
        options: [
            {
                id: uuidv4(),
                title: "",
                image: ""
            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }
        ]
    }

    const optionSchema = [
        {
            id: uuidv4(),
            title: ""
        }
    ]

    //exam info => in update nested
    const inputs = [
        {
            name: "questions",
            label: "الأسئلة ==>",
            schema: questionSchema,
            value: questions || [questionSchema], //Clone it, not Acc to Schema
            addLabel: metaData.isAdd && "إضافه سؤال",
            removeLabel: metaData.isAdd && "ازاله السؤال",
            startNums: 1,

            type: "chunk",
            array: [ //inputs control to values of schema
                {
                    name: "title",
                    label: "العنوان",
                    rows: 3,
                    type: "editor"
                }, {
                    name: 'grade',
                    label: lang.GRADE,
                    type: 'select',
                    options: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
                    icon: <IoSchool color='green' />,
                }, {
                    name: "hints",
                    label: "ملحوظه",
                }, {
                    name: "image",
                    label: "إضافه صوره",
                    type: "file",
                    disabled: false
                }, {
                    name: "points",
                    label: "عدد النقاط",
                    type: "number",
                    value: 1
                }, {
                    type: 'header',
                    title: 'الإختيارات'
                }, {
                    name: "isShuffle",
                    label: "هل تريد جعل الإختيارات عشوائيه؟",
                    type: 'switch',
                }, {
                    name: "rtOptionId",
                    label: "الإجابه الصحيحه",
                    disabled: true,
                    hidden: true
                }, {
                    name: "options",
                    type: "array",

                    value: [],
                    schema: optionSchema,
                    array: [
                        {
                            name: "id",
                            label: "...",
                            disabled: true,
                            hidden: true,
                        }, {
                            name: "title",
                            label: "الإجابه",
                            choose: "rtOptionId",
                            from: 'id',
                            rows: 3,

                        }
                    ]
                },
                {
                    name: "clarifyText",
                    label: "ايضافه توضيح لايجابه (يظهر عن عرض الحل)",
                    rows: 4,
                    variant: 'filled'

                }, {
                    name: "clarifyUrl",
                    label: "ايضافه لينك فيديو (يظهر عن عرض الحل)",
                    type: "url",
                    player: "youtube"
                },
            ],
            validation:
                Yup.array()
                    .of(
                        Yup.object().shape({
                            // title: Yup.string().required(lang.REQUERIED),
                            title: Yup.string()
                                .nullable()
                                .when('image', {
                                    is: (image) => !image || (!image.url && !image.name),
                                    then: (schema) => schema.required('العنوان مطلوب'),
                                    otherwise: (schema) => schema.notRequired(),
                                }),
                            rtOptionId: Yup.string().required('اختر الإجابه الصحيحه'),
                            grade: Yup.string().required(lang.REQUERIED),
                            image: Yup.mixed()
                                .test({
                                    message: 'Please provide a supported image typed(jpg or png)',
                                    test: (file, context) => {
                                        if (file && !file.url) {
                                            if (file?.url) {
                                                file.type = file.resource_type + "/" + file.format
                                            }
                                            const isValid = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file?.type);
                                            if (!isValid) context?.createError();
                                            return isValid;
                                        } else {
                                            return true
                                        }
                                    }
                                })
                                .test({
                                    message: `يجب ان يكون حجم الملف اقل من ${Number(import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN) || 15} MB `,
                                    test: (file) => {
                                        if (file && file.size) {
                                            const isValid = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN || 15) * 1024 * 1024; // 15MB
                                            return isValid;
                                        } else {
                                            return true
                                        }
                                    }
                                }),
                            options: Yup.array().of(
                                Yup.object().shape({
                                    title: Yup.string().required(lang.REQUERIED),
                                })
                            )
                        })
                    )
                    .required('يجب ان يكون هناك أسئلة') // these constraints are shown if and only if inner constraints are satisfied
                    .min(1, '1 على الاقل') // *_*
            ,
        }
    ]

    return (
        <div>
            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} enableReinitialize={false} />
        </div>
    )
}

export default QuestionsForm
