import {
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    Td,
    Text,
    Th,
    Tr
} from "@chakra-ui/react"
import React from "react"
import { useAppSelector } from "../../../../store";


interface FastOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}
export const StudentsMarkModal = ({ isOpen, onClose, onSave }: FastOrderModalProps) => {

    const { group } = useAppSelector(x => x.committees);

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // get students name from students

    return (
        <>
            <Modal
                isCentered
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='slideInBottom'
                size={'lg'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Marks for group {group && group.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {group && (
                            <>
                                {group.boardMarks.isAssigned ? (
                                    <>
                                        <Heading variant={'h2'}>Board Marks</Heading>
                                        <Table variant='simple'>
                                            <Tr>
                                                <Th>NAME</Th>
                                                <Th>ID</Th>
                                                <Th>Defence Mark</Th>
                                                <Th>Predefence Mark</Th>
                                            </Tr>
                                            {
                                                group.boardMarks.studentMarks.map(m => {
                                                    return (
                                                        <Tr>
                                                            <Td>{group.students.find(x => x.id === m.student)?.name}</Td>
                                                            <Td>{group.students.find(x => x.id === m.student)?.idNumber}</Td>
                                                            <Td>{m.defence}</Td>
                                                            <Td>{m.preDefence}</Td>
                                                        </Tr>
                                                    )
                                                })
                                            }
                                        </Table>
                                    </>
                                ) : <Text mb={'2'}>Board Marks not assigned</Text>
                                }

                                {group.supervisorMarks.isAssigned ? (
                                    <>
                                        <Heading variant={'h2'}>Supervisor Marks</Heading>
                                        <Table variant='simple'>
                                            <Tr>
                                                <Th>NAME</Th>
                                                <Th>ID</Th>
                                                <Th>Defence Mark</Th>
                                                <Th>Predefence Mark</Th>
                                            </Tr>
                                            {
                                                group.supervisorMarks.studentMarks.map(m => {
                                                    return (
                                                        <Tr>
                                                            <Td>{group.students.find(x => x.id === m.student)?.name}</Td>
                                                            <Td>{group.students.find(x => x.id === m.student)?.idNumber}</Td>
                                                            <Td>{m.defence}</Td>
                                                            <Td>{m.preDefence}</Td>
                                                        </Tr>
                                                    )
                                                })
                                            }
                                        </Table>
                                    </>
                                ) : <Text>Supervisor Marks not assigned</Text>
                                }
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}