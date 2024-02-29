import {
    Box,
    Button,
    Heading,
    Stack,
} from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa';
import { Fragment, useEffect } from 'react';
import { Feature } from '../../components/Feature';
import { AccountLayout } from "../../layouts/AccountLayout";
import { useAppDispatch, useAppSelector } from '../../store';
import { getNotifications } from '../../features/notifications/notificationSlice';

export const Notifications = () => {
    const { loading, notifications, unreadNotifications } = useAppSelector(x => x.notifications);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // send the GetUser request
        // check local storage if user object exist
        dispatch(getNotifications());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AccountLayout loading={loading}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="bold">
                    Notifications
                </Heading>
                <Stack spacing="12">
                    {notifications.map(notification => {
                        return (
                            <Fragment key={notification._id}>
                                <Feature icon={<Box as={FaCopy} w="6" h="6" />} title={notification.title}>
                                    {notification.description}
                                </Feature>
                            </Fragment>
                        )
                    })}
                </Stack>
                {unreadNotifications != 0 && (
                    <Box
                        mt={4}
                        width={"100%"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}>
                        <Button colorScheme='green'>Mark all as read</Button>
                    </Box>
                )}
            </Box>
        </AccountLayout>
    )
}
