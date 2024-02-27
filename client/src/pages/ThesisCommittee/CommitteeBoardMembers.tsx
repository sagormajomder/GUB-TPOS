import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Heading, Select, Spinner, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { Link } from "react-router-dom";
import { fetchBoardMembers, fetchBoardSemesters } from "../../features/thesis-committees/thesisCommitteeSlice";
import { BoardMemberList } from "../../features/thesis-committees/components/BoardMemberList";

export const CommitteeBoardMembers = () => {
    const dispatch = useAppDispatch();
    const { boardMembers, semesterInfo, loading, error, boardSemesters } = useAppSelector((state) => state.committees);
    const [selectedBoardSemester, setSelectedBoardSemester] = useState("");

    useEffect(() => {
        dispatch(fetchBoardSemesters())
        dispatch(fetchBoardMembers(semesterInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onChangeSemester = (boardSemesterId: string) => {
        const boardSemester = boardSemesters.find(x => x._id === boardSemesterId);
        if (boardSemester) {
            const { semester, semesterYear } = boardSemester;
            setSelectedBoardSemester(boardSemester._id || "");
            dispatch(fetchBoardMembers({ semester, semesterYear }));
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
                    Board Members
                </Heading>
                <Stack spacing="5">
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <Select
                                maxW={'sm'}
                                placeholder={`Select semester`}
                                value={selectedBoardSemester}
                                mb={'10px'}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeSemester(e.target.value)}
                            >
                                {boardSemesters.map(sp => {
                                    return (
                                        <option value={sp._id} key={sp._id}>{sp.semester} - {sp.semesterYear}</option>
                                    )
                                })}
                            </Select>
                            <ButtonGroup size='sm' isAttached variant='outline'>
                                <Button as={Link} to="/committee/board-member-create" rightIcon={<AddIcon />}>Add Board Member</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                        <BoardMemberList boardMembers={boardMembers} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    )
}