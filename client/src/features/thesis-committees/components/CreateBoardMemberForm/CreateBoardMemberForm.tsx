import {
  AlertStatus,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../config';
import { history } from '../../../../helpers';
import { FieldGroup } from '../../../account/components/FieldGroup';
import { useAppSelector } from '../../../../store';
import { useParams } from 'react-router-dom';
import { Board } from '../../thesisCommitteeSlice';

interface Faculty {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface BoardMember {
  id?: string;
  title: string;
  members: string[];
  semester: string;
  semesterYear: string;
}

export const CreateBoardMemberForm = () => {
  const { boardId } = useParams();
  const { semesterInfo } = useAppSelector(x => x.committees);
  const toast = useToast();
  const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [title, setTitle] = useState('');
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const showToast = (message: string, status: AlertStatus) => {
    toast({
      title: message,
      position: 'top-right',
      isClosable: true,
      status: status,
    });
  };

  const createBoardMember = () => {
    const supervisor: BoardMember = {
      id: currentBoard?._id,
      title,
      members: selectedFaculty,
      semester: semesterInfo.semester,
      semesterYear: semesterInfo.semesterYear,
    };
    // create user
    axios
      .post(`${BASE_URL}/api/committees/boardMembers`, supervisor)
      .then(res => {
        showToast('BoardMember successfully created!', 'success');
        history.navigate('/committee/board-members');
      })
      .catch(err => {
        // handle error here
        showToast(`BoardMember update failed.`, 'error');
        console.log(err);
      });
  };

  const handleCheckboxChange = (facultyId: string) => {
    setSelectedFaculty(prevSelected => {
      if (prevSelected.includes(facultyId)) {
        // Remove facultyId if it's already selected
        return prevSelected.filter(id => id !== facultyId);
      } else {
        // Add facultyId if it's not selected
        return [...prevSelected, facultyId];
      }
    });
  };

  const getFacalties = () => {
    axios.get(`${BASE_URL}/api/committees/facalties`).then(res => {
      setFacultyList(res.data);
    });
  };

  const getBoardById = () => {
    axios
      .get(`${BASE_URL}/api/committees/boardMembers/${boardId}`)
      .then(res => {
        setCurrentBoard(res.data);
        setTitle(res.data.title);
      });
  };

  useEffect(() => {
    // get facalties
    getFacalties();
    if (boardId) {
      getBoardById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentBoard) {
      // Check if each supervisor exists in the facultyList
      const updatedSelectedFaculty = facultyList
        .filter(supervisor =>
          currentBoard.members.some(m => m.id === supervisor.id)
        )
        .map(supervisor => supervisor.id) as string[];
      setSelectedFaculty(updatedSelectedFaculty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoard]);

  return (
    <VStack align='start'>
      <FieldGroup title='Semester Info'>
        <VStack width='full' spacing='6'>
          <HStack width={'full'}>
            <FormControl id='semester'>
              <FormLabel>Semsester</FormLabel>
              <Input
                value={semesterInfo.semester}
                onChange={() => console.log('')}
                readOnly
                type='text'
              />
            </FormControl>
            <FormControl id='semesterYear'>
              <FormLabel>Year</FormLabel>
              <Input
                value={semesterInfo.semesterYear}
                onChange={() => console.log('')}
                readOnly
                type='text'
              />
            </FormControl>
          </HStack>
        </VStack>
      </FieldGroup>
      <FieldGroup title='Board Number'>
        <FormControl id='semester'>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type='text'
          />
        </FormControl>
      </FieldGroup>
      <FieldGroup title='BoardMember List'>
        <VStack align='start' spacing={2}>
          {facultyList.map(faculty => (
            <Checkbox
              size={'lg'}
              key={faculty.id}
              isChecked={selectedFaculty.includes(faculty.id)}
              onChange={() => handleCheckboxChange(faculty.id)}>
              {faculty.name}
            </Checkbox>
          ))}
        </VStack>
      </FieldGroup>
      <FieldGroup>
        <Button onClick={() => createBoardMember()}>Save Changes</Button>
      </FieldGroup>
    </VStack>
  );
};
