import { AccountLayout } from '../../layouts/AccountLayout';
import { useAddMessageToChatMutation, useGetStudentGroupQuery } from '../../features/common/api/groupsApi';
import ChatList from '../../features/students/components/ChatList';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ChatMessage } from '../../features/common/models';
import { getChat } from '../../features/students/studentSlice';
import { Flex, Text } from '@chakra-ui/react';

export const StudentChats = () => {
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

    const { user } = useAppSelector(x => x.account);

    const { chatMessages } = useAppSelector(x => x.students);

    const dispatch = useAppDispatch()

    const { data: studentGroupData } = useGetStudentGroupQuery(user?.id)

    const [addMessageToChat, { data: addedMessage, isSuccess, isError }] = useAddMessageToChatMutation();

    useEffect(() => {
        if (studentGroupData) {

            setSelectedGroup(studentGroupData._id);

            dispatch(getChat(studentGroupData._id));
        }
    }, [studentGroupData])

    const sendMessage = async (message: string) => {
        const chatMessage: ChatMessage = {
            user: user?.id!,
            group: selectedGroup!,
            content: message,
        }
        await addMessageToChat(chatMessage);
    }

    useEffect(() => {
        if (addedMessage) {
            dispatch(getChat(selectedGroup!));
        }

    }, [addedMessage]);

    useEffect(() => {
        console.log(chatMessages);
    }, [chatMessages])

    return (
        <AccountLayout loading={false}>
            {selectedGroup && (
                <ChatList messages={chatMessages || []} onSendMessage={sendMessage} />
            )}
            {!selectedGroup && (
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={'20px'}>You still haven't joined in any groups.</Text>
                </Flex>
            )}
        </AccountLayout>
    )
}
