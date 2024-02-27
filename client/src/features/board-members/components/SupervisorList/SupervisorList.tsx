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
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FiEdit2, FiTrash2 } from 'react-icons/fi'
  import { IoArrowDown } from 'react-icons/io5'
import { User } from '../../../account/models/User';
import { Link } from 'react-router-dom';

  interface SupervisorListProps {
    supervisors: User[];
  }
  
  export const SupervisorList: React.FC<SupervisorListProps> = ({supervisors}) => (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Name</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th>Email</Th>
          <Th>Groups</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {supervisors.map((member) => (
          <Tr key={member.id}>
            <Td>
              <HStack spacing="3">
                <Avatar name={member.name} src={member.imgUrl} boxSize="10" />
                <Box>
                  <Text fontWeight="medium">{member.name}</Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">{member.email}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.groups}</Text>
            </Td>
            <Td>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
  