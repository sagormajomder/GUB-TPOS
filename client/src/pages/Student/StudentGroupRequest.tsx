import { useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import GroupRequestForm from '../../features/students/components/GroupRequestForm';
import { useCreateGroupRequestMutation } from '../../features/common/api/groupsApi';
import { GroupRequest } from '../../features/common/models';
import { useToast } from '@chakra-ui/react';
import { history } from '../../helpers';
import { fetchSupervisors } from '../../features/thesis-committees/thesisCommitteeSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { ErrorModel } from '../../features/common/models/ErrorModel';

export const StudentGroupRequest = () => {
    const [createGroupRequest, { data, isSuccess, isError, error }] = useCreateGroupRequestMutation();
    const toast = useToast()
    const {semesterInfo} = useAppSelector(x => x.committees);
    const dispatch = useAppDispatch();

    const groupRequest = async (groupRequestData: GroupRequest) => {
        await createGroupRequest(groupRequestData);
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Request created.',
                position: 'top-right',
                description: "Request successfully created!.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            const errors = error.data.errors as ErrorModel[];
            errors.forEach(err => {
                toast({
                    title: 'Error!',
                    position: 'top-right',
                    description: err.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    useEffect(() => {
        if (semesterInfo.semester !== "") {
          dispatch(fetchSupervisors(semesterInfo));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <AccountLayout loading={false}>
            <GroupRequestForm onCreateRequest={groupRequest} />
        </AccountLayout>
    )
}
