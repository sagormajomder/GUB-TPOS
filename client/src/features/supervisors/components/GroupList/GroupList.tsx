import {
  Box,
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
import { FaCheck, FaEdit, FaMinus } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { GroupDto } from '../../../common/dtos';
import Button from '../../../../components/Button';

interface GroupTableProps {
  groups: GroupDto[];
}

const GroupList: React.FC<GroupTableProps> = ({ groups }) => {
  console.log(groups);

  return (
    <Box mx='auto' px={{ base: '6', md: '8' }}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Thesis/Project Title</Th>
            <Th>Students</Th>
            <Th>Board Info</Th>
            <Th>Marks</Th>
            <Th>Assign Mark</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map(group => (
            <Tr key={group._id}>
              <Td>{group.name}</Td>
              <Td>
                {group.students.map(s => (
                  <div key={s.id}>
                    <Text>{s.idNumber}</Text>
                    <Text>{s.name}</Text>
                  </div>
                ))}
              </Td>
              {/* <Td>{group.supervisorMarks.isReleased ? <FaCheck></FaCheck> : <FaMinus></FaMinus>}</Td> */}
              <Td>{group.board ? group.board : 'NA'}</Td>
              <Td>
                <Button>View Marks</Button>
              </Td>
              <Td>
                <HStack spacing='1'>
                  <IconButton
                    as={Link}
                    to={`/supervisor/groups/${group._id}`}
                    icon={<FaEdit fontSize='1.25rem' />}
                    variant='ghost'
                    aria-label='Edit member'
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
