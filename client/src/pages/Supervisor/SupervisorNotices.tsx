import { useEffect } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchNotices } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AccountLayout } from "../../layouts/AccountLayout";
import NoticeList from "../../features/thesis-committees/components/NoticeList";

export const SupervisorNotices = () => {
    const { notices } = useAppSelector(x => x.committees);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchNotices("SUPERVISOR"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Notices
                </Heading>
                <Stack spacing="5">
                    <Box overflowX="auto">
                        <NoticeList notices={notices || []} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    )
}