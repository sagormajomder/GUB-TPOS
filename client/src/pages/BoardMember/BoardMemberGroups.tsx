import { useState, useEffect, ChangeEvent } from "react";
import GroupList from "../../features/supervisors/components/GroupList";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchGroups } from "../../features/board-members/boardMemberSlice";
import { Stack, Select, Box } from "@chakra-ui/react";
import { fetchGroupSemesters } from "../../features/thesis-committees/thesisCommitteeSlice";

export const BoardMemberGroups = () => {
    const dispatch = useAppDispatch();
    const { groups } = useAppSelector(x => x.boards);
    const { groupSemesters, semesterInfo } = useAppSelector(x => x.committees);
    const [selectedGroupSemester, setSelectedGroupSemester] = useState("");
    useEffect(() => {
        dispatch(fetchGroupSemesters());
        dispatch(fetchGroups(semesterInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeSemester = (groupSemesterId: string) => {
        const groupSemester = groupSemesters.find(x => x._id === groupSemesterId);
        if (groupSemester) {
            const { semester, semesterYear } = groupSemester;
            setSelectedGroupSemester(groupSemester._id || "");
            dispatch(fetchGroups({ semester, semesterYear }));
        }
    }

    return (
        <AccountLayout loading={false}>
            <Box px={{ base: '4', md: '6' }} pt="5">
                <Stack direction={{ base: 'column', md: 'row' }}>
                    <Select
                        maxW={'sm'}
                        placeholder={`Select semester`}
                        value={selectedGroupSemester}
                        mb={'10px'}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeSemester(e.target.value)}
                    >
                        {groupSemesters.map(sp => {
                            return (
                                <option value={sp._id} key={sp._id}>{sp.semester} - {sp.semesterYear}</option>
                            )
                        })}
                    </Select>
                </Stack>
            </Box>
            <GroupList groups={groups || []} />
        </AccountLayout>
    )
}
