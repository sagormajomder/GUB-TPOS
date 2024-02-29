import { AccountLayout } from '../../layouts/AccountLayout';
import { useAddMessageToChatMutation, useGetStudentGroupQuery } from '../../features/common/api/groupsApi';
import ChatList from '../../features/students/components/ChatList';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ChatMessage } from '../../features/common/models';
import { getChat } from '../../features/students/studentSlice';
import { Flex, Text } from '@chakra-ui/react';
import GroupDetails from '../../features/students/components/GroupDetails';

export const StudentGroupInformations = () => {
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

    const { user } = useAppSelector(x => x.account);

    const dispatch = useAppDispatch()

    const { data: studentGroupData } = useGetStudentGroupQuery(user?.id)

    useEffect(() => {
        if (studentGroupData) {

            setSelectedGroup(studentGroupData._id);

            dispatch(getChat(studentGroupData._id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentGroupData])


    return (
        <AccountLayout loading={false}>
            {selectedGroup && (
                <GroupDetails group={studentGroupData}/>
            )}
            {!selectedGroup && (
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={'20px'}>You still haven't joined in any groups.</Text>
                </Flex>
            )}
        </AccountLayout>
    )
}
