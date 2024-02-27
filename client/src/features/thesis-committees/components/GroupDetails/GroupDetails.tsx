// show group details
// show all the tasks
// show assign mark form

import { Avatar, Box, FormControl, FormLabel, HStack, Input, VStack, Text } from "@chakra-ui/react";
import { FieldGroup } from "../../../../components/FieldGroup";
import { GroupDto } from "../../../common/dtos";

interface GroupDetailsProps {
    group: GroupDto;
}

export const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
    console.log(group)
    return (
        <Box mx="auto" px={{ base: '6', md: '8' }}>
            <FieldGroup title="Semester Info">
                <VStack width="full" spacing="6">
                    <HStack width={"full"}>
                        <FormControl id="semester">
                            <FormLabel>Semsester</FormLabel>
                            <Input value={group.semester} onChange={() => console.log('')} readOnly type="text" />
                        </FormControl>
                        <FormControl id="semesterYear">
                            <FormLabel>Year</FormLabel>
                            <Input value={group.semesterYear} onChange={() => console.log('')} readOnly type="text" />
                        </FormControl>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Supervisor">
                {group.supervisor && (
                    <VStack>
                        <HStack spacing={3}>
                            <Avatar name={group.supervisor?.name} src={group.supervisor?.imgUrl} boxSize="10" />
                            <VStack spacing={'0'}>
                                <Text fontWeight="medium">{group.supervisor?.name}</Text>
                                <Text fontWeight="medium">{group.supervisor?.email} {group.supervisor?.email}</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                )}
            </FieldGroup>
            <FieldGroup title="Group Members">
                <VStack>
                    {group.students.map(s => {
                        return (
                            <HStack spacing={3}>
                                <Avatar name={s.name} src={s.imgUrl} boxSize="10" />
                                <VStack spacing={'0'}>
                                    <Text fontWeight="medium">{s.name}</Text>
                                    <Text fontWeight="medium">{s.idNumber}</Text>
                                    <Text fontWeight="medium">{s.email}</Text>
                                </VStack>
                            </HStack>
                        )
                    })}
                </VStack>
            </FieldGroup>
        </Box>
    )
}