import { ChangeEvent, useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import GroupList from '../../features/supervisors/components/GroupList';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchGroups } from '../../features/supervisors/supervisorSlice';
import { Box, Select, Stack } from '@chakra-ui/react';
import { fetchGroup, fetchGroupSemesters } from '../../features/thesis-committees/thesisCommitteeSlice';
import { StudentsMarkModal } from '../../features/supervisors/components/StudentsMarkModal/StudentsMarkModal';

export const SupervisorGroups = () => {
    const { groups } = useAppSelector(x => x.supervisors);
    const { semesterInfo, groupSemesters } = useAppSelector(x => x.committees);
    const [selectedGroupSemester, setSelectedGroupSemester] = useState("");
    const [showStudentMarksModal, setShowStudentMarksModal] = useState(false);
    const dispatch = useAppDispatch();
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
            <StudentsMarkModal isOpen={showStudentMarksModal} onClose={() => setShowStudentMarksModal(false)} onSave={() => console.log('')} />
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
            <GroupList
                groups={groups}
                onViewStudentsMark={groupId => {
                    dispatch(fetchGroup(groupId))
                    setShowStudentMarksModal(true)
                }} />
        </AccountLayout>
    )
}
