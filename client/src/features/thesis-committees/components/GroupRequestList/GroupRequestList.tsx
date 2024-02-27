import React from 'react';
import { GroupRequestDto } from '../../../common/dtos';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';

interface GroupRequestTableProps {
  groupRequests: GroupRequestDto[];
  onSelectSupervisor: (request: GroupRequestDto) => void;
}

const GroupRequestList: React.FC<GroupRequestTableProps> = ({
  groupRequests,
  onSelectSupervisor,
}) => {
  return (
    <Box mx="auto" px={{ base: '6', md: '8' }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Initiator</Th>
            <Th>Students</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groupRequests.map((request, index) => (
            <Tr key={request._id}>
              <Td>
                {request.initiator.name}
              </Td>
              <Td>
                {request.students.map((s) => (
                  <Text key={s.id}>
                    {s.name}
                  </Text>
                ))}
              </Td>
              <Td>
                <Button
                  colorScheme="green"
                  onClick={() => onSelectSupervisor(request)}
                >
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
