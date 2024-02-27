import { useEffect } from "react";
import { Box, Button, ButtonGroup, Heading, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchNotices } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AccountLayout } from "../../layouts/AccountLayout";
import NoticeList from "../../features/thesis-committees/components/NoticeList";
import { AddIcon } from "@chakra-ui/icons";
import { SearchField } from "../../components/SearchField";
import { Link } from "react-router-dom";

export const CommitteeNotices = () => {
    const { notices } = useAppSelector(x => x.committees);
    const dispatch = useAppDispatch();
    console.log(notices);

    useEffect(() => {
        dispatch(fetchNotices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Notices
                </Heading>
                <Stack spacing="5">
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <SearchField />
                            <ButtonGroup size='sm' isAttached variant='outline'>
                                <Button as={Link} to="/committee/notice-create" rightIcon={<AddIcon />}>Add Notice</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                        <NoticeList notices={notices || []} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    )
}