import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FieldGroup } from '../../../account/components/FieldGroup';
import { useAppSelector } from '../../../../store';
import { fetchSupervisors } from '../../../thesis-committees/thesisCommitteeSlice';
import { GroupRequest } from '../../../common/models';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

interface NewGroupRequestFormProps {
  onCreateRequest: (groupRequest: GroupRequest) => void;
}

const MAX_MEMBER = 3;

const GroupRequestForm: React.FC<NewGroupRequestFormProps> = ({
  onCreateRequest,
}) => {
  const [groupMembers, setGroupMembers] = useState<string[]>(['', '']);
  const [supervisor, setSupervisor] = useState<string>('');
  const [groupSupervisors, setGroupSupervisors] = useState<string[]>([
    '',
    '',
    '',
  ]);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState('');
  const { semesterInfo, supervisors } = useAppSelector(x => x.committees);
  const { user } = useAppSelector(x => x.account);

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...groupMembers];
    updatedMembers[index] = value;
    setGroupMembers(updatedMembers);
  };

  const handleSupervisorChange = (index: number, value: string) => {
    const updatedGroupSupervisors = [...groupSupervisors];
    updatedGroupSupervisors[index] = value;
    setGroupSupervisors(updatedGroupSupervisors);
  };

  const handleAddMember = () => {
    if (groupMembers.length < 3) {
      setGroupMembers(prevMembers => [...prevMembers, '']);
    }
  };

  const handleRemoveMember = (index: number) => {
    setGroupMembers(prevMembers => prevMembers.filter((_, i) => i !== index));
  };

  const handleCreateRequest = () => {
    // validate the students
    // validate the supervisors
    onCreateRequest({
      semester: semesterInfo.semester,
      semesterYear: semesterInfo.semesterYear,
      name,
      students: groupMembers,
      supervisor,
      supervisors: groupSupervisors,
      description: description,
      initiator: user?.id!,
    });
  };

  return (
    <Box maxW={{ base: 'xl', md: '4xl' }} mx='auto' px={{ base: '6', md: '8' }}>
      <Heading size='lg' as='h1' paddingBottom='4'>
        Create New Group Request
      </Heading>
      <FieldGroup title='Thesis/Project Title'>
        <Input
          placeholder='Title'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FieldGroup>
      <FieldGroup title='Group Member Details'>
        <VStack width='full' spacing='3'>
          {groupMembers.map((member, index) => {
            return (
              <Flex width={'100%'}>
                <Input
                  key={index}
                  mb={'10px'}
                  type='text'
                  placeholder={`Group Member ${index + 1} Email`}
                  value={member}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleMemberChange(index, e.target.value)
                  }
                />
                {index + 1 === MAX_MEMBER && (
                  <IconButton
                    aria-label='Remove research interest'
                    icon={<CloseIcon />}
                    ml={2}
                    onClick={() => handleRemoveMember(index)}
                  />
                )}
              </Flex>
            );
          })}
          {MAX_MEMBER > groupMembers.length && (
            <Button
              leftIcon={<AddIcon />}
              colorScheme='teal'
              variant='outline'
              mt={4}
              onClick={handleAddMember}>
              Add Member
            </Button>
          )}
        </VStack>
      </FieldGroup>
      <FieldGroup title='Supervisor'>
        <VStack width={'full'} spacing={'3'}>
          {groupSupervisors.map((gs, index) => {
            const selectedSupervisor = supervisors.find(sp => sp.id === gs);
            return (
              <Box width={'full'}>
                <Select
                  placeholder={`Select Supervisor ${index + 1}`}
                  value={gs}
                  mb={'10px'}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleSupervisorChange(index, e.target.value)
                  }>
                  {supervisors.map(sp => {
                    return (
                      <option value={sp.id} key={sp.id}>
                        {sp.name}
                      </option>
                    );
                  })}
                </Select>
                {selectedSupervisor && (
                  <>
                    <Text fontSize='sm' color='gray.500'>
                      Groups : {selectedSupervisor.groups}
                    </Text>
                    <Text fontSize='sm' color='gray.500'>
                      Research Interests :{' '}
                      {selectedSupervisor.researchInterests?.map(ri => {
                        return <span>{ri}, </span>;
                      })}
                    </Text>
                  </>
                )}
              </Box>
            );
          })}
        </VStack>
      </FieldGroup>
      <FieldGroup title='Brief Idea of title'>
        <Textarea
          placeholder='Description'
          mb={'10px'}
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </FieldGroup>
      <Button onClick={handleCreateRequest} colorScheme='green'>
        Create Request
      </Button>
    </Box>
  );
};

export default GroupRequestForm;
