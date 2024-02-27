import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Avatar,
  Box,
  HStack,
} from '@chakra-ui/react';
import { GroupDto } from '../../../common/dtos';

interface GroupTableProps {
  groups: GroupDto[];
}

const GroupList: React.FC<GroupTableProps> = ({ groups }) => {
  console.log(groups);
  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Students</Th>
          <Th>Project Title</Th>
          <Th>Supervisor</Th>
          <Th>Board Info</Th>
        </Tr>
      </Thead>
      <Tbody>
        {groups.map(group => (
          <Tr key={group._id}>
            <Td>
              {group.students.map(s => (
                <HStack spacing='3'>
                  <Avatar name={s.name} src={s.imgUrl} boxSize='10' />
                  <Box>
                    <Text fontWeight='medium'>{s.idNumber}</Text>
                    <Text fontWeight='medium'>{s.name}</Text>
                  </Box>
                </HStack>
              ))}
            </Td>
            <Td>{group.name}</Td>
            <Td>{group.supervisor.name}</Td>
            <Td>{group.board ? group.board : 'NA'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GroupList;
