import { useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import { ProfileForm } from '../../features/account/components/ProfileForm';
import CreateTaskForm from '../../features/supervisors/components/CreateTaskForm';
import { Task } from '../../features/common/models';
import { Box, Heading, Stack } from '@chakra-ui/react';

export const SupervisorCreateTask = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // dispatch(closeMenu());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createTask = (task: Task) => {
        console.log(task);
    }

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Create New Task
                </Heading>
                <Stack spacing="5">
                    {/* <CreateTaskForm onTaskSubmit={(task) => createTask(task)} /> */}
                </Stack>
            </Box>
        </AccountLayout>
    )
}
