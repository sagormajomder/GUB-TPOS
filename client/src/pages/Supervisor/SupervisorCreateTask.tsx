/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import CreateTaskForm from '../../features/supervisors/components/CreateTaskForm';
import { Task } from '../../features/common/models';
import { Box, Heading, Stack, useToast } from '@chakra-ui/react';
import { useCreateTaskMutation } from '../../features/common/api/groupsApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { history } from '../../helpers';
import { fetchGroups } from '../../features/supervisors/supervisorSlice';

export const SupervisorCreateTask = () => {
    const [createGroupsTask, { _, isSuccess  }] = useCreateTaskMutation();
    const { user } = useAppSelector(x => x.account);
    const {groups} = useAppSelector(x => x.supervisors);
    const {semesterInfo} = useAppSelector(x => x.committees);
    const toast = useToast();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Task created.',
                position: 'top-right',
                description: "Task successfully created!.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            history.navigate('/supervisor/group-tasks');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    useEffect(() => {
        dispatch(fetchGroups(semesterInfo))
    },[])

    const createTask = async (task: Task) => {
        // here add the supervisor to the task
        // here use form data 
        const formData = new FormData();
        const files = task.files; // Assuming it's an array of File objects

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }
        if(task.group) {
            formData.append('title', task.title);
            formData.append('description', task.description);
            formData.append('dueDate', task.dueDate.toISOString());
            formData.append("supervisor", user?.id!);
            formData.append("group", task.group!)
            await createGroupsTask(formData);
        } else {
            toast({
                title: 'Select group',
                position: 'top-right',
                description: "Please select a group to add the task",
                status: 'info',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Create New Task
                </Heading>
                <Stack spacing="5">
                    <CreateTaskForm onTaskSubmit={(task) => createTask(task)} groups={groups} />
                </Stack>
            </Box>
        </AccountLayout>
    )
}
