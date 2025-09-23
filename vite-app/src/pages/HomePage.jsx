import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
// import AboutUS from '../components/home/AboutUS'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import Teachers from '../components/home/Teachers'
import LatestCourses from '../components/home/LatestCourses'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'

function HomePage() {

    const user = useSelector(s => s.global.user)

    if (user) {
        return <>
            <SEOHelmetAsync
                title={"منصه الريادة - طريقك للتفوق"}
                desc={"منصه الريادة للتفوق و تأهيل الطلاب لاجتياز الاختبارت و الدورات التدريبيه بواسطه معلمين متخصصين"}
                url={window.location.href}
                isSiteLink={true}
            />
            <UserHome />
        </>
    }
    return (
        <div>
            <SEOHelmetAsync
                title={"منصه الريادة - طريقك للتفوق"}
                desc={"منصه الريادة للتفوق و تأهيل الطلاب لاجتياز الاختبارت و الدورات التدريبيه بواسطه معلمين متخصصين"}
                url={window.location.href}
                isSiteLink={true}
            />
            <Hero />
            <LatestCourses />
            <Teachers />
            {/* <AboutUS /> */}
            <Grades />
            <br />
            <Services />
        </div>
    )
}

export default HomePage
