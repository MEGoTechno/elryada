import Section from "../../style/mui/styled/Section"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import { TextBorderWithIcons } from "../ui/TextBorderAround"
import UserCourseDetails from "../content/UnitCourseDetails"
import { Navigation, Pagination,  A11y } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function LatestCourses() {
    const { data } = useGetCoursesQuery({ isFixed: true })

    if (data?.values?.courses)
        return (
            <Section>
                <TextBorderWithIcons colorOne={'primary.main'} color={'neutral.0'} title={'احدث الدورات التدريبيه'} endIcon={<img src="./assets/course-icon.svg" style={{ width: '30px' }} />} />

                <Swiper
                    modules={[Navigation, Pagination,  A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    // spaceBetween={25}
                    // slidesPerView={2.5}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 15 },   // mobile
                        640: { slidesPerView: 1.2, spaceBetween: 15 }, // small tablets
                        768: { slidesPerView: 2.25, spaceBetween: 20 },   // tablets
                      }}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    {data?.values?.courses.map((course, i) => <SwiperSlide key={i}> <UserCourseDetails course={course} /> </SwiperSlide>)}
                </Swiper>
            </Section>
        )
}

export default LatestCourses
