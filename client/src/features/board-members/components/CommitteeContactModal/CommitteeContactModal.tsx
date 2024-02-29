import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import React from "react"
import ContactCommitteeForm from "../ContactCommitteeForm/ContactCommitteeForm";

interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}
export const CommitteeContactModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

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
                    <ModalHeader>Contact Committee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <ContactCommitteeForm onSave={onSave}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}