import {
  Avatar,
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { IoArrowDown } from 'react-icons/io5'
import { User } from '../../../account/models/User';
import { Link } from 'react-router-dom';
import { Board } from '../../thesisCommitteeSlice';

interface BoardMemberListProps {
  boardMembers: Board[];
}

export const BoardMemberList: React.FC<BoardMemberListProps> = ({ boardMembers }) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>
          <HStack spacing="3">
            <HStack spacing="1">
              <Text>Name</Text>
              <Icon as={IoArrowDown} color="muted" boxSize="4" />
            </HStack>
          </HStack>
        </Th>
        <Th>Groups</Th>
        <Th>Semester</Th>
        <Th>Year</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {boardMembers.map((bm) => (
        <Tr key={bm._id}>
          <Td>
            {bm.title}
          </Td>
          <Td>
            <Box>
              {bm.members.map(member => {
                return (
                  <HStack mt={3}>
                    <Avatar name={member.name} src={member.imgUrl} boxSize="10" />
                    <Box>
                      <Text fontWeight="medium">{member.name}</Text>
                    </Box>
                  </HStack>
                )
              })}
            </Box>
          </Td>
          <Td>
            {bm.groups.length}
          </Td>
          <Td>
            {bm.semester}
          </Td>
          <Td>
            {bm.semesterYear}
          </Td>
          <Td>
            <HStack spacing="1">
              <IconButton
                icon={<FiTrash2 fontSize="1.25rem" />}
                variant="ghost"
                aria-label="Delete member"
              />
              <IconButton
                as={Link}
                to={`/committee/board-member-edit/${bm._id}`}
                icon={<FiEdit2 fontSize="1.25rem" />}
                variant="ghost"
                aria-label="Edit member"
              />
            </HStack>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)
