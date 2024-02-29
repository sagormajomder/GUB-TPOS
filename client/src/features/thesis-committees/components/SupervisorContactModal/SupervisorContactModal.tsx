import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import React from "react"
import { useAppSelector } from "../../../../store";
import ContactSupervisorForm from "../ContactSupervisorForm/ContactSupervisorForm";

interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}
export const SupervisorContactModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

    const { supervisors } = useAppSelector(x => x.committees);
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
                        <ContactSupervisorForm supervisors={supervisors} onSave={onSave}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}