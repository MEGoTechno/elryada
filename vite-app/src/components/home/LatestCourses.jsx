import Section from "../../style/mui/styled/Section"
import { TextBorderWithIcons } from "../ui/TextBorderAround"

function LatestCourses() {
    return (
        <Section>
            <TextBorderWithIcons colorOne={'primary.main'} color={'neutral.0'} title={'احدث الدورات التدريبيه'} endIcon={<img src="./assets/course-icon.svg" style={{ width: '30px' }} />} />

        </Section>
    )
}

export default LatestCourses
