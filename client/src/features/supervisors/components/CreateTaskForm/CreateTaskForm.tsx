import React, { useState, ChangeEvent, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from '@chakra-ui/react';
import { Group, Task } from '../../../common/models';
import { GroupDto } from '../../../common/dtos';

interface CreateTaskFormProps {
  onTaskSubmit: (task: Task) => void;
  groups: GroupDto[]
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskSubmit, groups }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleTaskSubmit = () => {
    const newTask: Task = {
      group: selectedGroup,
      description,
      title,
      files: selectedFiles,
      dueDate: dueDate || new Date(),
      submitted: false,
    };

    onTaskSubmit(newTask);
    // Clear form inputs
    setDescription('');
    setSelectedFiles(null);
    setDueDate(null);

    // Clear the file input by resetting its value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <FormControl>
        <Select
          placeholder="Select a group"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <Input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Due Date</FormLabel>
        <Input
          type="date"
          value={dueDate ? dueDate.toISOString().substr(0, 10) : ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(new Date(e.target.value))}
        />
      </FormControl>

      <FormControl mt={4}>
        <Input
          type="file"
          multiple
          ref={(el) => (fileInputRef.current = el)}
          accept=".zip" // Specify accepted file types
          onChange={handleFileChange}
        />
      </FormControl>

      <Button mt={4} colorScheme="blue" onClick={handleTaskSubmit}>
        Create Task
      </Button>
    </Box>
  );
};

export default CreateTaskForm;
