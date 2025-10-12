import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Section from '../../style/mui/styled/Section'
import UserQuestionsBank from '../../components/questions/UserQuestionsBank'
import { PiBankBold } from "react-icons/pi";

function QuestionsBankPage() {
    return (
        <Section>
            <TitleWithDividers
                title={'بنك الأسئلة'}
                icon={<PiBankBold size={'40px'} color={'inherit'} />}
                desc='اختار العناوين التى من خلالها ستظهر الأسئلة الخاصه بها ثم حدد عدد الأسئلة التى تريد الاختبار عليها' />
            <UserQuestionsBank />
        </Section>
    )
}

export default QuestionsBankPage
