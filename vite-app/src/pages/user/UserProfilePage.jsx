import { useSelector } from 'react-redux'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../../components/ui/UserHeader'
import TitleSection from '../../components/ui/TitleSection'
import Separator from '../../components/ui/Separator'
import UserProfileUpdate from '../../components/users/UserProfileUpdate'
import RefreshUser from '../../components/users/RefreshUser'

function UserProfilePage() {

    const { user } = useSelector(s => s.global)

    return (
        <Section>
            <TitleSection title={'الصفحه الشخصيه'} icon={<RefreshUser />} />
            <UserHeader isAll={true} user={user} />
            <Separator />
            <UserProfileUpdate user={user} />
        </Section>
    )
}

export default UserProfilePage
