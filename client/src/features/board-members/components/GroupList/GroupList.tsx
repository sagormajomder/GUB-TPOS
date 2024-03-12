import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { GroupDto } from '../../../common/dtos';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

interface GroupTableProps {
  groups: GroupDto[];
  onViewStudentsMark: (groupId: string) => void; 
}

const GroupList: React.FC<GroupTableProps> = ({ groups, onViewStudentsMark }) => {
  return (
    <Box mx="auto" px={{ base: '6', md: '8' }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Students</Th>
            <Th>Marks</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map((group) => (
            <Tr key={group._id}>
              <Td>{group.name}</Td>
              <Td>
                {group.students.map((s) => (
                  <>
                    <Text key={s.id}>
                      {s.name}
                    </Text>
                  </>
                ))}
              </Td>
              <Td>
                <Button onClick={() => onViewStudentsMark(group._id)}>View Marks</Button>
              </Td>
              <Td>
                {!group.boardMarks.isReleased && (
                  <HStack spacing='1'>
                    <IconButton
                      as={Link}
                      to={`/board/groups/${group._id}`}
                      icon={<FaEdit fontSize='1.25rem' />}
                      variant='ghost'
                      aria-label='Edit member'
                    />
                  </HStack>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GroupList;
