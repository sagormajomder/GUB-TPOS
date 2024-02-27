import {
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text
} from '@chakra-ui/react'
import * as React from 'react'
import { BASE_URL } from '../../../../config';

interface BoardMemberListProps {
  contacts: any;
}

export const SupervisorContactList: React.FC<BoardMemberListProps> = ({ contacts }) => {
  const handleDownload = (filename: string) => {
    // Construct the download URL
    const downloadUrl = `${BASE_URL}/download/${filename}`;

    // Trigger the download by creating a temporary link
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Attachments</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contacts.map((contact: any) => (
          <Tr key={contact._id}>
            <Td>
              {contact.title}
            </Td>
            <Td>
              {contact.description}
            </Td>
            <Td>
              {contact.attachments.map((attachment: any) => {
                return (
                  <HStack mt={3}>
                    <Box>
                      <Text color={'green.400'} cursor={'pointer'} onClick={() => handleDownload(attachment)}>{attachment}</Text>
                    </Box>
                  </HStack>
                )
              })}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
