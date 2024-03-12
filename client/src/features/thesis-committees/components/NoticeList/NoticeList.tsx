import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  Text
} from '@chakra-ui/react';
import { Notice } from '../../thesisCommitteeSlice';
import { BASE_URL } from '../../../../config';

interface NoticeTableProps {
  notices: Notice[];
}

const NoticeList: React.FC<NoticeTableProps> = ({ notices }) => {
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
    <Box mx="auto" px={{ base: '6', md: '8' }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Content</Th>
            <Th>For</Th>
            <Th>Attachments</Th>
            <Th>CreatedAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notices.map((notice) => (
            <Tr key={notice.id}>
              <Td>{notice.title}</Td>
              <Td>{notice.content}</Td>
              <Td>{notice.noticeFor}</Td>
              <Td>
              {notice.attachments?.map((attachment: any) => {
                return (
                  <HStack mt={3}>
                    <Box>
                      <Text color={'green.400'} cursor={'pointer'} onClick={() => handleDownload(attachment)}>{attachment}</Text>
                    </Box>
                  </HStack>
                )
              })}
              </Td>
              <Td>{notice.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default NoticeList;
