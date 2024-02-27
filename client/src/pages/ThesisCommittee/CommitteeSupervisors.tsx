import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Heading, Select, Spinner, Stack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { SupervisorSemester, fetchSupervisorSemesters, fetchSupervisors } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AddIcon } from "@chakra-ui/icons";
import { SearchField } from "../../components/SearchField";
import { AccountLayout } from "../../layouts/AccountLayout";
import { Link } from "react-router-dom";
import { SupervisorList } from "../../features/thesis-committees/components/SupervisorList";

export const CommitteeSupervisors = () => {
    const dispatch = useAppDispatch();
    const { supervisors, loading, error, semesterInfo, supervisorSemesters } = useAppSelector((state) => state.committees);
    const [selectedSupervisorSemester, setSelectedSupervisorSemester] = useState("");

    useEffect(() => {
        if (semesterInfo.semester !== "") {
            dispatch(fetchSupervisorSemesters())
            dispatch(fetchSupervisors(semesterInfo));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onChangeSemester = (supervisorSemesterId: string) => {
        const supervisorSemester = supervisorSemesters.find(x => x._id === supervisorSemesterId);
        if (supervisorSemester) {
            const { semester, semesterYear } = supervisorSemester;
            setSelectedSupervisorSemester(supervisorSemester._id || "");
            dispatch(fetchSupervisors({ semester, semesterYear }));
        }
    }

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
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }}>
                            <Select
                                maxW={'sm'}
                                placeholder={`Select semester`}
                                value={selectedSupervisorSemester}
                                mb={'10px'}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeSemester(e.target.value)}
                            >
                                {supervisorSemesters.map(sp => {
                                    return (
                                        <option value={sp._id} key={sp._id}>{sp.semester} - {sp.semesterYear}</option>
                                    )
                                })}
                            </Select>
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                        <SupervisorList supervisors={supervisors} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    );
}