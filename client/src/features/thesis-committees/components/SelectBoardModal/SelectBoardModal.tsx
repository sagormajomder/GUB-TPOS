import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useAppSelector } from "../../../../store";

interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (boardId: string) => void;
}
export const SelectBoardModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

    const { boardMembers } = useAppSelector(x => x.committees);
    const [boardId, setBoardId] = useState('');
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
                    <ModalHeader>Select Board</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Select Board</FormLabel>
                            <Select placeholder="Select an option" onChange={e => setBoardId(e.target.value)}>
                                {boardMembers.map((option) => (
                                    <option key={option._id} value={option._id}>
                                        {option.title}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => onSave(boardId)}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}