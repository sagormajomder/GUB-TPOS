import { Avatar, Box, Button, FormControl, FormLabel, HStack, Input, VStack, Text } from "@chakra-ui/react";
import { FieldGroup } from "../../../../components/FieldGroup";
import { GroupDto } from "../../../common/dtos";
import { useState } from "react";
import { useAppDispatch } from "../../../../store";
import { assignMarkToGroup } from "../../boardMemberSlice";

interface GroupDetailsProps {
    group: GroupDto;
}

export const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
    const [preDefenceMarks, setPreDefenceMarks] = useState<string[]>(group.boardMarks.studentMarks.map(mark => mark.preDefence));
    const [defenceMarks, setDefenceMarks] = useState<string[]>(group.boardMarks.studentMarks.map(mark => mark.defence));
    const dispatch = useAppDispatch();

    const onUpdateMarks = () => {
        const updatedMarks = group.boardMarks.studentMarks.map((mark, index) => ({
            student: mark.student,
            preDefence: preDefenceMarks[index],
            defence: defenceMarks[index]
        }));
        dispatch(assignMarkToGroup({
            groupId: group._id, 
            boardMarks: {
                isReleased: group.boardMarks.isReleased,
                studentMarks: updatedMarks
            }
        }));
    };

    return (
        <Box mx="auto" px={{ base: '6', md: '8' }}>
            <FieldGroup title="Semester Info">
                <VStack width="full" spacing="6">
                    <HStack width={"full"}>
                        <FormControl id="semester">
                            <FormLabel>Semester</FormLabel>
                            <Input value={group.semester} readOnly type="text" />
                        </FormControl>
                        <FormControl id="semesterYear">
                            <FormLabel>Year</FormLabel>
                            <Input value={group.semesterYear} readOnly type="text" />
                        </FormControl>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Students">
                <VStack>
                    {group.students.map(s => (
                        <HStack spacing={3} key={s._id}>
                            <Avatar name={s.name} src={s.imgUrl} boxSize="10" />
                            <VStack spacing={'0'}>
                                <Text fontWeight="medium">{s.idNumber}</Text>
                                <Text fontWeight="medium">{s.name}</Text>
                                <Text fontWeight="medium">{s.email}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>
            </FieldGroup>
            <FieldGroup title="Marks">
                <VStack>
                    {group.boardMarks.studentMarks.map((mark, index) => (
                        <HStack width={"full"} key={mark.student}>
                            <FormControl id={`preDefenceMark-${index}`}>
                                <FormLabel>Pre Defence Mark for {group.students.find(x => x.id === mark.student)?.name}</FormLabel>
                                <Input type='number' value={preDefenceMarks[index]} onChange={(e) => setPreDefenceMarks(prevMarks => {
                                    const updatedMarks = [...prevMarks];
                                    updatedMarks[index] = e.target.value;
                                    return updatedMarks;
                                })} />
                            </FormControl>
                            <FormControl id={`defenceMark-${index}`}>
                                <FormLabel>Defence Mark for {group.students.find(x => x.id === mark.student)?.name}</FormLabel>
                                <Input type='number' value={defenceMarks[index]} onChange={(e) => setDefenceMarks(prevMarks => {
                                    const updatedMarks = [...prevMarks];
                                    updatedMarks[index] = e.target.value;
                                    return updatedMarks;
                                })} />
                            </FormControl>
                        </HStack>
                    ))}
                    <Button isLoading={false}
                        loadingText={'Updating...'}
                        type="submit"
                        disabled={group.boardMarks.isReleased}
                        onClick={onUpdateMarks}
                        colorScheme="green">
                        Save Changes
                    </Button>
                </VStack>
            </FieldGroup>
        </Box>
    )
}