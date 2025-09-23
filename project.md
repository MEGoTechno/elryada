chapters in specific course
    teacher View
        *Link coruses together
        *add and remove teachers has no perms just frontend by chapters perms
        -default courses perms when create

        -in Frontend ==> make if id found return and filter(Boolean)
    FInal
            --المعلمون
        Teacher Page
        --whatsapp numbers && validations
        2- when add Link => give notification
        Some work on teachers
        2- CreatedBy show && Permissions namings && Tracking middleware => CUD
        4- make it Alive
        5- Fix user.lectures => cancel it
        6- find Teacher


ui/ux => Home, userHome, LectureCard ...

# [--''my plan ##]
        1- saudi =>
            1- Teachers Home and page
            2- Live Settings
            3- live Chat app and chating
            4- Tracking middleware
            5- linking system
             6   Fix user.lectures
            7--whatsapp numbers && validations
                coding

['AddCourses'] "courses array in LectureModel" to Lecture
["Chapters"] chapters Idea
['DeleteQuestion'] 
['ReportsPage'] ==> need more customizations
['useGet'] => without lazy
overView

## ForgetPassword.jsx ['106'] => props.resetForm() //+walid,
## in createQuestions =>    const questions = await saveFiles(values) and add req.body.questions in questionController //+walid
## QuestionsForms [21] grade: isNaN(Number(localStorage.getItem('grade'))) ? '' : Number(localStorage.getItem("grade")),
## usePostData => Array.isArray ? values : entries.filter

--remove display block from SwitchStyled => to avoid accedent click
## in CreateFormik [26] add else use preValue proper
## CrudDataGrid , 31         await updateFc(newRow, field);  add field

## factoryHandler [481] message: `تم بنجاح` + ' ' + (action === 'push' ? ' تمت الايضافه بنجاح' : ' تمت الازاله بنجاح'),
## ShowImg => remove minHeight
## course price percentage

## in elbeltagy ==> createManh questions grade error
## home react helmet
++Walid done,

//

## lectureRoutes deleteFromBody(['course', 'exam'])

## export durationRegex from lectureForm to ExamForm
## createFormik 
            inputs.forEach((input, i) => {
            if (input.name) {
                if (preValue) {
                    data[input.name] = preValue[input.name] ?? ''
                } else if ((typeof input.value === 'object' && Object.keys(input.value || {}).length === 0) && input?.value) {
                    data[input.name] = ''
                } else if (input.value ?? true) {
                    data[input.name] = input.value ?? ""
                    // After That No
                } else if (input.type === 'array') {
                    data[input.name] = input.value || []
                } else {
                    data[input.name] = ''
                }
            }

            if (input.validation) {
                validation[input.name] = input.validation
            }

            if (isAllDisabled) {
                input.disabled = true
            }
        });


## عليك انشاء 4 اسئله على الاقل
## useLazyGetData ==>             
        const handledParams = Array.isArray(params) ? params : Object.fromEntries(
                    Object.entries(params).filter(([k, v]) => v !== null && v !== undefined && v !== '')
                );
## AdminCardLecture use isNativeLecture to and remove populate from lectureCreate in routes
    ["solve populate cours"] and so no need for pupulate in getLecturesForAdminController

## usePostData    after mainFc directly     if (setLoading) {
          setLoading(false)
        }
secure routes in analysis => sesssions, users
# routes
    file take it copy paste and in routes.js import sidebarLinks


## Learnings
    - page layout full control

### [Grade] dictionary

    1- make CRUD And Manage
    2- make Hook useGrades
    3- Fix backend => data and models and params
    4- frontend use search and replace
    5- grade Header && grade.index
    6- grades.jsx
    7- manage grade => grade.index for counting