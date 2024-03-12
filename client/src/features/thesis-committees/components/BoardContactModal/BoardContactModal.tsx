import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../../../store";
import ContactBoardForm from "../ContactBoardForm/ContactBoardForm";
import { User } from "../../../account/models/User";

interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}
export const BoardContactModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

    const { boardMembers } = useAppSelector(x => x.committees);
    const [boardUsers, setBoardUsers] = useState<User[]>([]);
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        const newBoardUsers = boardMembers.flatMap(bm => bm.members);
        setBoardUsers(newBoardUsers);
    }, [boardMembers])


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
                        <ContactBoardForm boardMembers={boardUsers} onSave={() => onSave()}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}