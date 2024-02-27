import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useAppSelector } from "../../../../store";
import { User } from "../../../account/models/User";

interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (supervisorId: string) => void;
}
export const SelectSupervisorModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

    const { supervisors } = useAppSelector(x => x.committees);
    const [supervisorId, setSupervisorId] = useState('');
    const [supervisor, setSupervisor] = useState<User | null>(null)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    return (
        <>
            <Modal
                isCentered
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Supervisor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Select Supervisor</FormLabel>
                            <Select placeholder="Select an option" onChange={e => {
                                setSupervisorId(e.target.value);
                                const found = supervisors.find(x => x._id === e.target.value);
                                if (found) {
                                    setSupervisor(found)
                                }
                            }}>
                                {supervisors.map((option) => (
                                    <option key={option._id} value={option._id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Select>
                            {supervisor && (
                                <>
                                    <Text>Total groups {supervisor.groups}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Research Interests : {supervisor.researchInterests?.map(ri => {
                                            return (
                                                <span>{ri}, </span>
                                            )
                                        })}
                                    </Text>
                                </>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => onSave(supervisorId)}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}