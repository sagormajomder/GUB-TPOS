/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import SupervisorChat from '../../features/supervisors/components/SupervisorChat';
import { useAddMessageToChatMutation } from '../../features/common/api/groupsApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchGroups, getChat, setMessages } from '../../features/supervisors/supervisorSlice';
import { ChatMessage } from '../../features/common/models';

export const SupervisorGroupChats = () => {
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
    const { user } = useAppSelector(x => x.account);
    const { chatMessages, groups } = useAppSelector(x => x.supervisors)
    const [addMessageToChat, { data: addedMessage }] = useAddMessageToChatMutation();
    const {semesterInfo} = useAppSelector(x => x.committees)


    const dispatch = useAppDispatch();

    const selectGroup = (groupId: string) => {
        setSelectedGroup(groupId);
        if (groupId) {
            dispatch(getChat(groupId))
        } else {
            dispatch(setMessages([]));
        }
    }
    const sendMessage = async (message: string) => {
        const chatMessage: ChatMessage = {
            user: user?.id!,
            group: selectedGroup!,
            content: message,
        }
        await addMessageToChat(chatMessage);
    }

    useEffect(() => {
        if(addedMessage) {
            dispatch(getChat(selectedGroup!));
        }

    },[addedMessage]);

    useEffect(() => {
        dispatch(fetchGroups(semesterInfo))
    },[])

    return (
        <AccountLayout loading={false}>
            <SupervisorChat groups={groups}
                messages={chatMessages}
                selectedGroup={selectedGroup}
                onSelectGroup={selectGroup}
                onSendMessage={sendMessage} />
        </AccountLayout>
    )
}
