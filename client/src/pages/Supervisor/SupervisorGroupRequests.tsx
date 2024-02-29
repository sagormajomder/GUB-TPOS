import { useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import GroupRequestList from '../../features/supervisors/components/GroupRequestList';
import { useCreateGroupMutation, useGetGroupRequestsQuery } from '../../features/common/api/groupsApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { GroupRequestDto } from '../../features/common/dtos';
import { useToast } from '@chakra-ui/react';
import { rejectGroupRequest } from '../../features/supervisors/supervisorSlice';

export const SupervisorGroupRequests = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAppSelector(x => x.account);
    const { data, error, isLoading } = useGetGroupRequestsQuery(user?.id);
    const [createGroup, { data: groupData, isSuccess, isError }] = useCreateGroupMutation();
    const {operationSuccess} = useAppSelector(x => x.supervisors);
    const toast = useToast();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Request accepted.',
                position: 'top-right',
                description: "Group request successfully accepted!.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    useEffect(() => {
        if (operationSuccess) {
            toast({
                title: 'Request rejected',
                position: 'top-right',
                description: "Group request rejected!.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operationSuccess])

    useEffect(() => {
        console.log(error);
    }, [error])

    // here implement the accept functionality

    const acceptRequest = async (groupData: GroupRequestDto) => {
        await createGroup(groupData);
    }

    const rejectRequest = async (groupData: GroupRequestDto) => {
        dispatch(rejectGroupRequest(groupData._id!))
    }

    return (
        <AccountLayout loading={isLoading}>
            <GroupRequestList groupRequests={data ? data.groupRequests : []}
                handleAcceptRequest={acceptRequest} handleRejectRequest={rejectRequest} />
        </AccountLayout>
    )
}
