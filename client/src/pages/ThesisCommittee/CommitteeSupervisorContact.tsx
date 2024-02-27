import { Box, Button, ButtonGroup, Select, Stack } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchSupervisorUserContacts, fetchSupervisors } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AddIcon } from "@chakra-ui/icons";
import { SupervisorContactList } from "../../features/thesis-committees/components/SupervisorContactList/SupervisorContactList";
import { SupervisorContactModal } from "../../features/thesis-committees/components/SupervisorContactModal/SupervisorContactModal";

export const CommitteeSupervisorContact = () => {
    const dispatch = useAppDispatch();
    const {semesterInfo, supervisors, supervisorContacts} = useAppSelector(x => x.committees);
    const [selectedMember, setSelectedMember] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        dispatch(fetchSupervisors(semesterInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <SupervisorContactModal
                    isOpen={showModal}
                    onClose={function (): void {
                        setShowModal(false);
                    }} onSave={function (): void {
                        setShowModal(false);
                        if(selectedMember !== "") {
                            dispatch(fetchSupervisorUserContacts(selectedMember))
                        }
                    }} />
                <Stack spacing={'5'}>
                    <Box px={{ base: '4', md: '6' }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                            <Select
                                maxW={'sm'}
                                value={selectedMember}
                                placeholder="Select supervisor"
                                onChange={(e) => {
                                    setSelectedMember(e.target.value);
                                    dispatch(fetchSupervisorUserContacts(e.target.value))
                                }}>
                                {supervisors.map((member) => (
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
                    <SupervisorContactList contacts={supervisorContacts} />
                </Box>
            </Box>
        </AccountLayout>
    )
}