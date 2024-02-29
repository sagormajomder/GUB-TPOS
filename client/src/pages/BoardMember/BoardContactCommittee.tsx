/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { CommitteeContactModal } from "../../features/board-members/components/CommitteeContactModal/CommitteeContactModal";
import { CommitteeContactList } from "../../features/board-members/components/CommitteeContactList/CommitteeContactList";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { fetchBoardUserContacts } from "../../features/thesis-committees/thesisCommitteeSlice";
import { useAppSelector, useAppDispatch } from "../../store";

export const BoardContactCommittee = () => {
    const {user} = useAppSelector(x => x.account);
    const {boardContacts} = useAppSelector(x => x.committees);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchBoardUserContacts(user?.id!))
    },[])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <CommitteeContactModal
                    isOpen={showModal}
                    onClose={function (): void {
                        setShowModal(false);
                    }} onSave={function (): void {
                        setShowModal(false);
                        dispatch(fetchBoardUserContacts(user?.id!))
                    }} />
                <Stack spacing={'5'}>
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <ButtonGroup size='sm' isAttached variant='outline'>
                                <Button onClick={() => setShowModal(true)} rightIcon={<AddIcon />}>Contact</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                </Stack>
                <Box>
                    <CommitteeContactList contacts={boardContacts} />
                </Box>
            </Box>
        </AccountLayout>
    )
}