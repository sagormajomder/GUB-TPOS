import React, { useState, ChangeEvent } from 'react';
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    Select,
    Textarea,
} from '@chakra-ui/react';
import { FieldGroup } from '../../../account/components/FieldGroup';
import { Notice } from '../../thesisCommitteeSlice';

interface CreateNoticeFormProps {
    onCreateNotice: (notice: Notice) => void;
}

const forOptions = ["ALL", "BOARD", "STUDENT", "SUPERVISOR"];

const CreateNoticeForm: React.FC<CreateNoticeFormProps> = ({ onCreateNotice }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState("");
    const [noticeFor, setNoticeFor] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
      };

    const handleCreateNotice = () => {
        // validate the students
        // validate the supervisors
        onCreateNotice({
            title,
            content,
            noticeFor,
            files: selectedFiles
        });
    };

    return (
        <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
            <Heading size="lg" as="h1" paddingBottom="4">
                Create New Notice
            </Heading>
            <FieldGroup title="Title">
                <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            </FieldGroup>
            <FieldGroup title='Description'>
                <Textarea
                    placeholder="Description"
                    mb={'10px'}
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                />
            </FieldGroup>
            <FieldGroup title="For">
                <Select
                    placeholder={`Select Option`}
                    value={noticeFor}
                    mb={'10px'}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setNoticeFor(e.target.value)}
                >
                    {forOptions.map((option, index) => {
                        return (
                            <option key={index} value={option}>{option}</option>
                        )
                    })}
                </Select>
            </FieldGroup>
            <FieldGroup>
                <FormControl id="files" mb={4}>
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        accept=".pdf,.doc,.docx"
                    />
                </FormControl>
            </FieldGroup>
            <Button onClick={handleCreateNotice} colorScheme='green'>Create Notice</Button>
        </Box>
    )
}

export default CreateNoticeForm;