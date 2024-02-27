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
import { GroupRequestDto } from '../../../common/dtos';

interface GroupRequestTableProps {
  groupRequests: GroupRequestDto[];
  handleAcceptRequest: (request: GroupRequestDto) => void;
  handleRejectRequest: (request: GroupRequestDto) => void;
}

const GroupRequestList: React.FC<GroupRequestTableProps> = ({
  groupRequests,
  handleAcceptRequest,
  handleRejectRequest,
}) => {
  console.log(groupRequests);
  return (
    <Box mx='auto' px={{ base: '6', md: '8' }}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Initiator</Th>
            <Th>Students</Th>
            <Th>Semester Info</Th>
            <Th>Thesis/Project title</Th>
            <Th>Brief Idea of title</Th>
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
                    <Text>{s.idNumber}</Text>
                    <Text>{s.name}</Text>
                  </div>
                ))}
              </Td>

              {/* <Td>{request.supervisor.name}</Td> */}
              <Td>
                {request.semester} - {request.semesterYear}
              </Td>
              <Td>{request.name}</Td>
              <Td>{request.description}</Td>
              <Td>
                <Button
                  colorScheme='green'
                  onClick={() => handleAcceptRequest(request)}>
                  Accept
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => handleRejectRequest(request)}>
                  Reject
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
