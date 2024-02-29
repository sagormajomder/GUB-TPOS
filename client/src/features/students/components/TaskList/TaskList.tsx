import React from 'react';
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
import { Task } from '../../../common/models/Task';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {

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
    <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Documents</Th>
            <Th>Submission</Th>
            <Th>Due Date</Th>
            <Th>Submitted</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <Tr key={task._id}>
              <Td>{task.title}</Td>
              <Td>
                {task.supervisorDocuments?.map(doc => {
                  return (
                    <Text color={'green.400'} cursor={'pointer'} onClick={() => handleDownload(doc.filename)} key={doc._id}>{doc.filename}</Text>
                  )
                })}
              </Td>
              <Td>
                {task.submittedDocument && (
                  <Text color={'green.400'} cursor={'pointer'} onClick={() => handleDownload(task.submittedDocument!.filename)}>{task.submittedDocument.filename}</Text>
                )}
              </Td>
              <Td>{new Date(task.dueDate).toLocaleDateString()}</Td>
              <Td>{task.submitted ? 'Yes' : 'No'}</Td>
              <Td>
                <Button as={Link} to={`/student/tasks/${task._id}`} size="sm" colorScheme="blue">
                  Submit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TaskList;





