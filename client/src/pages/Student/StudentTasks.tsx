import { AccountLayout } from '../../layouts/AccountLayout';
import TaskList from '../../features/students/components/TaskList';
import { useGetStudentGroupQuery, useGetTasksQuery } from '../../features/common/api/groupsApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { getTasks } from '../../features/students/studentSlice';

export const StudentTasks = () => {
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

    const { user } = useAppSelector(x => x.account);

    const {tasks} = useAppSelector(x => x.students);

    const dispatch = useAppDispatch()

    const { data: studentGroupData, isLoading } = useGetStudentGroupQuery(user?.id)

    useEffect(() => {
        if(studentGroupData) {
            dispatch(getTasks(studentGroupData._id))
        }
    },[studentGroupData])

    return (
        <AccountLayout loading={isLoading}>
            <TaskList tasks={tasks}/>
        </AccountLayout>
    )
}
