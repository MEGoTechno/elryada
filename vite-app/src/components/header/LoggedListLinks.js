import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { pagesPerms, sidebarLinks } from '../../settings/sidebarLinks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RtArrow } from './Icons';
import { user_roles } from '../../settings/constants/roles';
import TabInfo from '../ui/TabInfo';
// import { pagesPerms } from '../permissions/constants/pages';
import usePermissions from '../permissions/hooks/usePermissions';


function LoggedListLinks({ user, setSidebar }) {
    const { pathname } = useLocation()
    const theme = useTheme()
    const [activeLink, setActiveLink] = useState('')
    const navigate = useNavigate()
    const [hasPermission] = usePermissions()

    useEffect(() => {
        if (pathname) {
            setActiveLink(pathname)
        }
    }, [pathname])


    return (

        <List sx={{ height: '100%' }}>
            {sidebarLinks.map((link, i) => {

                // const isAllowed = link.allowedTo?.includes(user?.role)
                const isUsePerms = [user_roles.TEACHER, user_roles.SUBADMIN].includes(user?.role)

                if (isUsePerms && user && link.id) {
                    const canAccess = hasPermission([{ id: link.id }, ...(link.perms || [])].flat())
                    if (!canAccess) {
                        return null
                    }
                }
                //Admin && online => skip || teacher - subAdmin not skip
                if (!link.to && link.allowedTo?.includes(user?.role)) {

                    const checkHeader = () => {
                        const nextNoToIndex = sidebarLinks.findIndex(
                            (obj, j) => j > i && !("to" in obj)
                        );
                        const isValid = sidebarLinks.slice(
                            i + 1,
                            nextNoToIndex === -1 ? sidebarLinks.length : nextNoToIndex
                        );
                        // ✅ check if at least one item in the slice passes permission
                        const hasValidAccess = isValid.some(item => {
                            if (isUsePerms && item.id) {
                                const link = pagesPerms.find(p => p.id === item.id)
                                const linkPerms = [{ id: link.id }, ...(link.perms || [])].flat()
                                return hasPermission(linkPerms);
                            }
                            return item?.allowedTo?.includes(user?.role) ?? true
                        });

                        return hasValidAccess
                    }

                    if (!checkHeader()) return null;

                    return (
                        <Divider key={i}>
                            <LinksHeader link={link} />
                        </Divider>
                    )
                }

                if ((link.allowedTo?.includes(user?.role) && user) || !link.allowedTo || (link.allowedTo.includes(user_roles.NOT_USER) && !user)) { //?.allowedTo?.includes(user?.role)

                    return (
                        <ListItem key={i} sx={{ p: "0 10px" }}>
                            <ListItemButton
                                disabled={link.isDisabled}
                                component={Link}
                                to={link.to}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSidebar(false)
                                    navigate(link.to)
                                }}
                                sx={{
                                    my: '4px',
                                    borderRadius: '16px',
                                    border: '2px solid transparent',
                                    backgroundColor:
                                        activeLink === link.to
                                            ? "rgba( 0 167 111 / 0.08)"
                                            : 'transparent',
                                    color:
                                        activeLink === link.to
                                            ? 'primary.main'
                                            : 'neutral.100',
                                    // "&:hover": {
                                    // borderColor: theme.palette.primary[500],
                                    // backgroundColor: theme.palette.primary.main,
                                    // color: theme.palette.text.hover,
                                    // }
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: "primary.main", minWidth: '40px'
                                }}>
                                    {link.icon}
                                </ListItemIcon>

                                <Typography variant='subtitle2'>
                                    {link.name}
                                </Typography>

                                {activeLink === link.to && (
                                    <RtArrow size='22px' style={{
                                        marginRight: "auto",
                                        color: theme.palette.primary.main,
                                        display: activeLink === link.to ? "block" : "none",
                                        transform: 'rotate(180deg)'
                                    }} />
                                )}

                                {(link.info && activeLink !== link.to) && <TabInfo sx={{
                                    m: 'auto'
                                }} count={link.info.title} i={link.info.i} />}

                            </ListItemButton>
                        </ListItem>
                    )
                }
                return
            })}
        </List>
    )
}

const LinksHeader = ({ link }) => <Box
    sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexWrap: 'nowrap', gap: '8px', opacity: ".4" }}>
    <Typography variant='subtitle1' >
        {link.name}
    </Typography>
    {link.icon}
</Box >

export default LoggedListLinks
