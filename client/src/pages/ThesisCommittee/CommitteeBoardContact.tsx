import { Box, Button, ButtonGroup, Select, Stack } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchBoardMembers, fetchBoardUserContacts } from "../../features/thesis-committees/thesisCommitteeSlice";
import { User } from "../../features/account/models/User";
import { AddIcon } from "@chakra-ui/icons";
import { BoardContactModal } from "../../features/thesis-committees/components/BoardContactModal/BoardContactModal";
import { BoardContactList } from "../../features/thesis-committees/components/BoardContactList/BoardContactList";

export const CommitteeBoardContact = () => {
    const dispatch = useAppDispatch();
    const { semesterInfo, boardMembers, boardContacts } = useAppSelector(x => x.committees);
    const [boardUsers, setBoardUsers] = useState<User[]>([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchBoardMembers(semesterInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const newBoardUsers = boardMembers.flatMap(bm => bm.members);
        setBoardUsers(newBoardUsers);
    }, [boardMembers])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <BoardContactModal
                    isOpen={showModal}
                    onClose={function (): void {
                        setShowModal(false);
                    }} onSave={function (): void {
                        setShowModal(false);
                        if(selectedMember !== "") {
                            dispatch(fetchBoardUserContacts(selectedMember))
                        }
                    }} />
                <Stack spacing={'5'}>
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <Select
                                maxW={'sm'}
                                value={selectedMember}
                                placeholder="Select Board Member"
                                onChange={(e) => {
                                    setSelectedMember(e.target.value);
                                    dispatch(fetchBoardUserContacts(e.target.value))
                                }}>
                                {boardUsers.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </Select>
                            <ButtonGroup size='sm' isAttached variant='outline'>
                                <Button onClick={() => setShowModal(true)} rightIcon={<AddIcon />}>Contact</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                </Stack>
                <Box>
                    <BoardContactList contacts={boardContacts} />
                </Box>
            </Box>
        </AccountLayout>
    )
}