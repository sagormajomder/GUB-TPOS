import { useEffect } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import GroupTaskList from '../../features/supervisors/components/GroupTaskList';
import { Box, Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import {AddIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import { SearchField } from '../../components/SearchField';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSupervisorTasks } from '../../features/supervisors/supervisorSlice';

export const SupervisorGroupTasks = () => {
    const { user } = useAppSelector(x => x.account);
    const { tasks } = useAppSelector(x => x.supervisors);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSupervisorTasks(user?.id!))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Heading size="xl" mb="8" fontWeight="normal" textAlign={'center'}>
                    Tasks
                </Heading>
                <Stack spacing="5">
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <SearchField />
                            <ButtonGroup size='sm' isAttached variant='outline'>
                                <Button as={Link} to="/supervisor/create-task" rightIcon={<AddIcon />}>Add New Task</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                    <GroupTaskList tasks={tasks} />
                    </Box>
                </Stack>
            </Box>
        </AccountLayout>
    )
}
