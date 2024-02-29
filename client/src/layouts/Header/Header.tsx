import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton, Text,
    useColorModeValue as mode,
    Img,
} from '@chakra-ui/react'
import {MobileNav} from './MobileNav'
import {NavLink} from './NavLink'
import {AccountMenu} from './AccountMenu'
import {Link} from 'react-router-dom'
import {DarkModeSwitch} from '../../components/DarkModeSwitch'
import {useEffect} from "react";
// import {getUnreadNotifications} from "../../features/notifications/notificationSlice";
import {HiOutlineBell} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from '../../store'
import logo from "../../assets/images/Logo.png"
import { useLogoutMutation } from '../../features/account/api/accountApi'
import { history } from '../../helpers'
import { setUser } from '../../features/account/accountSlice'

export const Header = () => {
    const {user} = useAppSelector(x => x.account);
    // const {unreadNotifications} = useAppSelector(x => x.notifications);
    // const dispatch = useAppDispatch();
    const [logoutUser, { data, isSuccess, isError, error }] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const {unreadNotifications} = useAppSelector(x => x.notifications);

    const logout = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if(isSuccess) {
            dispatch(setUser(null));
            history.navigate('/')
        }
        // if (user) {
        //     dispatch(getUnreadNotifications());
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])
    return (
        <Box as="header" bg={mode('white', 'gray.800')} borderBottomWidth="1px">
            <Box maxW="7xl" mx="auto" py="4" px={{base: '6', md: '8'}}>
                <Flex as="nav" justify="space-between">
                    <HStack spacing="8">
                        <Box as={Link} to="/" rel="home">
                            <Img src={logo} height={'50px'}/>
                        </Box>
                        <HStack display={{base: 'none', lg: 'flex'}} spacing="8">
                        </HStack>
                    </HStack>
                    <Flex align="flex-end">
                        <HStack spacing="10" display={{base: 'none', md: 'flex'}}>
                            <DarkModeSwitch/>
                            {user && (
                                <>
                                    <Box position={'relative'}>
                                        {
                                            unreadNotifications !== 0 && (
                                                <Text color={'red.400'}
                                                      position={'absolute'}
                                                      top={'-5px'}
                                                      fontSize={'lg'}
                                                      fontWeight={'bold'}
                                                      left={'30px'}>{unreadNotifications}</Text>
                                            )
                                        }
                                        <IconButton
                                            as={Link}
                                            to="/account/notifications"
                                            isRound
                                            size="md"
                                            fontSize="3xl"
                                            aria-label="Show notification"
                                            variant="ghost"
                                            color="current"
                                            icon={<HiOutlineBell/>}
                                        />
                                    </Box>
                                    <AccountMenu/>
                                    <Button colorScheme="green" rounded="full" onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </>
                            )}
                            {!user && (
                                <>
                                    <Button as={Link} to="/register" colorScheme="blue" rounded="full">
                                        Register
                                    </Button>
                                </>
                            )}
                        </HStack>
                        <Box ml="5">
                            <MobileNav/>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
