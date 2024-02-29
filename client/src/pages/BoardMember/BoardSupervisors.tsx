import { useEffect } from "react";
import { Box, Button, ButtonGroup, Heading, Spinner, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchSupervisors } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AddIcon } from "@chakra-ui/icons";
import { SearchField } from "../../components/SearchField";
import { AccountLayout } from "../../layouts/AccountLayout";
import { Link } from "react-router-dom";
import { SupervisorList } from "../../features/thesis-committees/components/SupervisorList";

export const BoardSupervisors = () => {
    const dispatch = useAppDispatch();
    const { supervisors, loading, error, semesterInfo } = useAppSelector((state) => state.committees);

    useEffect(() => {
        if (semesterInfo.semester !== "") {
            dispatch(fetchSupervisors(semesterInfo));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Box color="red">{error}</Box>;
    }

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Supervisors
                </Heading>
                <Stack spacing="5">
                    <Box overflowX="auto">
                        <SupervisorList supervisors={supervisors} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    );
}