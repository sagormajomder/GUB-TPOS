import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../../store';
import { BASE_URL } from '../../../../config';

interface ContactCommitteeFormProps {
  onSave: () => void;
}

const ContactCommitteeForm = ({onSave}: ContactCommitteeFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const {semesterInfo} = useAppSelector(x => x.committees);
  const {user} = useAppSelector(x => x.account)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(fileList);
    }
  };

  const handleSubmit = async () => {
    // You can perform form validation here before submitting

    const formData = new FormData();
    formData.append('userId', user?.id!);
    formData.append('title', title);
    formData.append('description', description);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const response = await fetch(`${BASE_URL}/api/committees/contact-board?semester=${semesterInfo.semester}&semesterYear=${semesterInfo.semesterYear}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to contact board');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error contacting board:', error);
    }
    onSave();
  };

  return (
    <Box>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Attachments</FormLabel>
          <Input type="file" multiple onChange={handleFileChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Contact Committee
        </Button>
      </VStack>
    </Box>
  );
};

export default ContactCommitteeForm;
