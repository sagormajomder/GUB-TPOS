// show group details
// show all the tasks
// show assign mark form

import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FieldGroup } from '../../../../components/FieldGroup';
import { Board } from '../../boardMemberSlice';

interface GroupDetailsProps {
  board: Board;
}

export const BoardDetails: React.FC<GroupDetailsProps> = ({ board }) => {
  return (
    <Box mx='auto' px={{ base: '6', md: '8' }}>
      <FieldGroup title='Semester Info'>
        <VStack width='full' spacing='6'>
          <HStack width={'full'}>
            <FormControl id='semester'>
              <FormLabel>Semsester</FormLabel>
              <Input
                value={board.semester}
                onChange={() => console.log('')}
                readOnly
                type='text'
              />
            </FormControl>
            <FormControl id='semesterYear'>
              <FormLabel>Year</FormLabel>
              <Input
                value={board.semesterYear}
                onChange={() => console.log('')}
                readOnly
                type='text'
              />
            </FormControl>
          </HStack>
        </VStack>
      </FieldGroup>
      <FieldGroup title='Board Number'>
        <Text fontWeight='medium'>{board.title}</Text>
      </FieldGroup>
      <FieldGroup title='Board Members'>
        <VStack>
          {board.members.map(s => {
            return (
              <HStack spacing={3}>
                <Avatar name={s.name} src={s.imgUrl} boxSize='10' />
                <VStack spacing={'0'}>
                  <Text fontWeight='medium'>{s.name}</Text>
                  <Text fontWeight='medium'>{s.idNumber}</Text>
                  <Text fontWeight='medium'>{s.email}</Text>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </FieldGroup>
    </Box>
  );
};
