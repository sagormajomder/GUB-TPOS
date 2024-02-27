import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from '@chakra-ui/react';
import { User } from '../../../account/models/User';
import { useAppSelector } from '../../../../store';
import { BASE_URL } from '../../../../config';

interface ContactSupervisorFormProps {
  supervisors: User[];
  onSave: () => void;
}

const ContactSupervisorForm: React.FC<ContactSupervisorFormProps> = ({
  supervisors,
  onSave
}) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const {semesterInfo} = useAppSelector(x => x.committees)

  const handleSupervisorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSupervisor(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async () => {
    // Prepare form data
    const formData = new FormData();
    formData.append('userId', selectedSupervisor);
    formData.append('title', title);
    formData.append('description', description);
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }

    // Send contact request to backend
    try {
      const response = await fetch(`${BASE_URL}/api/committees/contact-supervisor?semester=${semesterInfo.semester}&semesterYear=${semesterInfo.semesterYear}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Handle success response
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
    onSave();
  };

  return (
    <Box>
      <FormControl id="supervisor" mb={4}>
        <FormLabel>Supervisor</FormLabel>
        <Select
          value={selectedSupervisor}
          onChange={handleSupervisorChange}
          placeholder="Select supervisor"
        >
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
        />
      </FormControl>
      <FormControl id="files" mb={4}>
        <FormLabel>Attachments</FormLabel>
        <Input
          type="file"
          onChange={handleFilesChange}
          multiple
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ContactSupervisorForm;
