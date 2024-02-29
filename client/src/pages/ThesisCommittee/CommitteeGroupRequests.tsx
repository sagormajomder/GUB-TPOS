import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { assignSupervisorToPendingGroup, fetchPendingGroups, fetchSupervisors, resetOperationSuccess } from "../../features/thesis-committees/thesisCommitteeSlice";
import GroupRequestList from "../../features/thesis-committees/components/GroupRequestList/GroupRequestList";
import { SelectSupervisorModal } from "../../features/thesis-committees/components/SelectSupervisorModal/SelectSupervisorModal";


export const CommitteeGroupRequests = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const [selectedGroup, setSelectedGroup] = useState('');
    const [showSupervisorSelectModal, setShowSupervisorSelectModal] = useState(false);
    const { semesterInfo, pendingGroups, operationSuccess } = useAppSelector(x => x.committees);

    useEffect(() => {
        if (operationSuccess) {
            toast({
                title: 'Supervisor assigned',
                position: 'top-right',
                description: "Supervisor successfully assigned!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            dispatch(fetchPendingGroups(semesterInfo))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operationSuccess])

    // here implement the accept functionality

    const assignSupervisor = async (supervisorId: string) => {
        dispatch(assignSupervisorToPendingGroup({groupRequestId: selectedGroup, supervisorId}));
        setShowSupervisorSelectModal(false);
    }

    useEffect(() => {
        dispatch(resetOperationSuccess());
        dispatch(fetchPendingGroups(semesterInfo))
        dispatch(fetchSupervisors(semesterInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <SelectSupervisorModal isOpen={showSupervisorSelectModal} onClose={() => setShowSupervisorSelectModal(false)} onSave={(supervisorId) => assignSupervisor(supervisorId)} />
            <GroupRequestList groupRequests={pendingGroups} onSelectSupervisor={(group) => {
                setShowSupervisorSelectModal(true);
                setSelectedGroup(group._id!);
            }} />
        </AccountLayout>
    )
}
