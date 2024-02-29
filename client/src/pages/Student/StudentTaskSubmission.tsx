import { useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import { useCreateGroupRequestMutation, useSubmitTaskMutation } from '../../features/common/api/groupsApi';
import { useAppSelector } from '../../store';
import { useToast } from '@chakra-ui/react';
import TaskSubmissionForm from '../../features/students/components/TaskSubmissionForm';
import { useParams } from 'react-router-dom';
import { history } from '../../helpers';

export const StudentTaskSubmission = () => {
    const [submitTask, { data, isSuccess, isError, error }] = useSubmitTaskMutation();
    const { user } = useAppSelector(x => x.account);
    const toast = useToast()
    let { id } = useParams();

    const onTaskSubmit = async (document: File) => {
        console.log(document);
        const formData = new FormData();
        formData.append('file', document);

        await submitTask({ taskId: id, data: formData });
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
            history.navigate('/student/tasks');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    useEffect(() => {
        // here get the task by id
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <TaskSubmissionForm onTaskSubmit={onTaskSubmit} />
        </AccountLayout>
    )
}
