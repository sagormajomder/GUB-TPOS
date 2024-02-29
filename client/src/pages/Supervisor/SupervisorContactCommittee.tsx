/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { AddIcon } from "@chakra-ui/icons";
import { fetchSupervisorUserContacts } from "../../features/thesis-committees/thesisCommitteeSlice";
import { CommitteeContactModal } from "../../features/supervisors/components/CommitteeContactModal/CommitteeContactModal";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { CommitteeContactList } from "../../features/supervisors/components/CommitteeContactList/CommitteeContactList";

export const SupervisorContactCommittee = () => {

    const {user} = useAppSelector(x => x.account);
    const {supervisorContacts} = useAppSelector(x => x.committees);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchSupervisorUserContacts(user?.id!))
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
                        dispatch(fetchSupervisorUserContacts(user?.id!))
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
                    <CommitteeContactList contacts={supervisorContacts} />
                </Box>
            </Box>
        </AccountLayout>
    )
}