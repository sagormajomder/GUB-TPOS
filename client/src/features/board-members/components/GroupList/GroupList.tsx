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
} from '@chakra-ui/react';
import { GroupDto } from '../../../common/dtos';
import { FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaCheck, FaCross, FaMinus } from 'react-icons/fa';

interface GroupTableProps {
  groups: GroupDto[];
}

const GroupList: React.FC<GroupTableProps> = ({ groups }) => {
  return (
    <Box mx="auto" px={{ base: '6', md: '8' }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Students</Th>
            <Th>Mark Released</Th>
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
              <Td>{group.supervisorMarks.isReleased ? <FaCheck></FaCheck> : <FaMinus></FaMinus>}</Td>
              <Td>
                <HStack spacing="1">
                  <IconButton
                    as={Link}
                    to={`/supervisor/groups/${group._id}`}
                    icon={<FiEye fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Edit member"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GroupList;
