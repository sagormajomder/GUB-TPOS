import { ChangeEvent, useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import GroupList from '../../features/thesis-committees/components/GroupList';
import { useAppDispatch, useAppSelector } from '../../store';
import { assignBoardToGroup, assignSupervisorToGroup, fetchBoardMembers, fetchGroup, fetchGroupSemesters, fetchGroups, fetchSupervisors } from '../../features/thesis-committees/thesisCommitteeSlice';
import { SelectBoardModal } from '../../features/thesis-committees/components/SelectBoardModal/SelectBoardModal';
import { SelectSupervisorModal } from '../../features/thesis-committees/components/SelectSupervisorModal/SelectSupervisorModal';
import { Stack, Select, Box } from '@chakra-ui/react';
import { StudentsMarkModal } from '../../features/thesis-committees/components/StudentsMarkModal/StudentsMarkModal';

export const CommitteeGroups = () => {
    const dispatch = useAppDispatch();
    const { groups, semesterInfo, groupSemesters } = useAppSelector(x => x.committees);
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [showSupervisorSelectModal, setShowSupervisorSelectModal] = useState(false);
    const [selectedGroupSemester, setSelectedGroupSemester] = useState("");
    const [showStudentMarksModal, setShowStudentMarksModal] = useState(false);
    useEffect(() => {
        dispatch(fetchGroupSemesters())
        dispatch(fetchGroups(semesterInfo))
        dispatch(fetchBoardMembers(semesterInfo));
        dispatch(fetchSupervisors(semesterInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const assignBoard = (boardId: string) => {
        if (boardId !== "") {
            console.log('assigning board');
            dispatch(assignBoardToGroup({ boardId, groupId: selectedGroup }))
            dispatch(fetchGroups(semesterInfo))
        }
        setShowModal(false)
    }

    const assignSupervisor = (supervisorId: string) => {
        if (supervisorId !== "") {
            dispatch(assignSupervisorToGroup({ groupId: selectedGroup, supervisorId }))
            dispatch(fetchGroups(semesterInfo))
        }
        setShowSupervisorSelectModal(false);
    }

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
            <SelectBoardModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={(boardId) => assignBoard(boardId)} />
            <SelectSupervisorModal isOpen={showSupervisorSelectModal} onClose={() => setShowSupervisorSelectModal(false)} onSave={(supervisorId) => assignSupervisor(supervisorId)} />
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
            <GroupList groups={groups || []}
                onSelectBoard={(group) => {
                    setShowModal(true);
                    setSelectedGroup(group._id);
                }}
                onSelectSupervisor={(group) => {
                    setShowSupervisorSelectModal(true);
                    setSelectedGroup(group._id);
                }} 
                onViewStudentsMark={groupId => {
                    dispatch(fetchGroup(groupId))
                    setShowStudentMarksModal(true)
                }}/>
        </AccountLayout>
    )
}
