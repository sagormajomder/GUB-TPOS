import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../store';
import { GroupDto } from '../../../common/dtos';
import Button from '../../../../components/Button';

interface GroupTableProps {
  groups: GroupDto[];
  onSelectBoard: (group: GroupDto) => void;
  onSelectSupervisor: (group: GroupDto) => void;
  onViewStudentsMark: (groupId: string) => void;
}

const GroupList: React.FC<GroupTableProps> = ({
  groups,
  onSelectBoard,
  onSelectSupervisor,
  onViewStudentsMark,
}) => {
  const { boardMembers } = useAppSelector(x => x.committees);
  return (
    <Box mx='auto' px={{ base: '6', md: '8' }}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Thesis/Project Title</Th>
            <Th>Students</Th>
            <Th>Supervisor</Th>
            <Th>Board Info</Th>
            <Th>Marks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map(group => (
            <Tr key={group._id}>
              <Td>{group.name}</Td>
              <Td>
                {group.students.map(s => (
                  <div key={s.id}>
                    <Text fontWeight='medium'>{s.idNumber}</Text>
                    <Text>{s.name}</Text>
                  </div>
                ))}
              </Td>
              <Td>
                <Flex alignItems={'center'}>
                  <HStack spacing='3'>
                    <Avatar
                      name={group.supervisor.name}
                      src={group.supervisor.imgUrl}
                      boxSize='10'
                    />
                    <Box>
                      <Text fontWeight='medium'>{group.supervisor.name}</Text>
                    </Box>
                  </HStack>
                  <IconButton
                    isRound
                    size='sm'
                    fontSize='xl'
                    aria-label='Show notification'
                    variant='ghost'
                    color='current'
                    icon={<FaEdit />}
                    onClick={() => onSelectSupervisor(group)}
                  />
                </Flex>
              </Td>
              <Td>
                {!group.board && (
                  <Button onClick={() => onSelectBoard(group)}>
                    Assign Board
                  </Button>
                )}
                {group.board && (
                  <Text>
                    {boardMembers.find(x => x._id === group.board)?.title}
                  </Text>
                )}
              </Td>
              <Td>
                <Td>
                  <Button onClick={() => onViewStudentsMark(group._id)}>
                    View Marks
                  </Button>
                </Td>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GroupList;
