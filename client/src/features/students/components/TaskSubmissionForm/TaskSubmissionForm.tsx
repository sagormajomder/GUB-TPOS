import React, { useState, ChangeEvent, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  Heading,
} from '@chakra-ui/react';

interface TaskSubmissionFormProps {
  onTaskSubmit: (document: File) => void;
}

const TaskSubmissionForm: React.FC<TaskSubmissionFormProps> = ({ onTaskSubmit }) => {
  const [document, setDocument] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocument(files[0]);
    }
  };

  const handleSubmit = () => {
    if (document) {
      onTaskSubmit(document);
      setDocument(null);

      // Clear the file input by resetting its value
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
      <Heading size="lg" as="h1" paddingBottom="4">
        Create New Group Request
      </Heading>

      <FormControl>
        <FormLabel>Upload Document</FormLabel>
        <input
          type="file"
          ref={(el) => (fileInputRef.current = el)}
          accept=".zip"
          onChange={handleDocumentChange}
        />
      </FormControl>

      {document && (
        <Text mt={2}>
          Selected document: {document.name}
        </Text>
      )}

      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleSubmit}
      >
        Submit Task
      </Button>
    </Box>
  );
};

export default TaskSubmissionForm;
