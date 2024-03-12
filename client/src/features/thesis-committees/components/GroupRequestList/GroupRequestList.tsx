import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineHdrStrong } from 'react-icons/md';
import { GroupRequestDto } from '../../../common/dtos';

interface GroupRequestTableProps {
  groupRequests: GroupRequestDto[];
  onSelectSupervisor: (request: GroupRequestDto) => void;
}

const GroupRequestList: React.FC<GroupRequestTableProps> = ({
  groupRequests,
  onSelectSupervisor,
}) => {
  return (
    <Box mx='auto' px={{ base: '6', md: '8' }}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Initiator</Th>
            <Th>Students</Th>
            <Th>Thesis/Project Title</Th>
            <Th>Brief Idea of Title</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groupRequests.map((request, index) => (
            <Tr key={request._id}>
              <Td>{request.initiator.name}</Td>
              <Td>
                {request.students.map(s => (
                  <div key={s.id}>
                    <Text>
                      <strong>{s.idNumber}</strong>
                    </Text>
                    <Text>{s.name}</Text>
                  </div>
                ))}
              </Td>
              <Td>{request.name}</Td>
              <Td>{request.description}</Td>
              <Td>
                <Button
                  colorScheme='green'
                  onClick={() => onSelectSupervisor(request)}>
                  Assign Supervisor
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GroupRequestList;
