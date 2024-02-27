import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react';
import { Notice } from '../../thesisCommitteeSlice';

interface NoticeTableProps {
  notices: Notice[];
}

const NoticeList: React.FC<NoticeTableProps> = ({ notices }) => {
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
              <Td>{notice.attachments?.map(fn => {
                return (
                  <a href={`${fn}`}>fn</a>
                )
              })}</Td>
              <Td>{notice.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default NoticeList;
