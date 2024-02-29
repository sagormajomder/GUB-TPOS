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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { BASE_URL } from "../../../../config";
import { history } from "../../../../helpers";
import { FieldGroup } from '../../../account/components/FieldGroup';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { fetchSupervisors } from '../../thesisCommitteeSlice';


interface Faculty {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

interface Supervisor {
    members: string[],
    semester: string,
    semesterYear: string
}

export const CreateSupervisorForm = () => {
    const dispatch = useAppDispatch();
    const { semesterInfo, supervisors } = useAppSelector(x => x.committees)
    const toast = useToast();
    const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);
    const [facultyList, setFacultyList] = useState<Faculty[]>([]);


    const showToast = (message: string, status: AlertStatus) => {
        toast({
            title: message,
            position: 'top-right',
            isClosable: true,
            status: status
        })
    }

    const createSupervisor = () => {
        const supervisor: Supervisor = {
            members: selectedFaculty,
            semester: semesterInfo.semester,
            semesterYear: semesterInfo.semesterYear
        }
        // create user
        axios.post(`${BASE_URL}/api/committees/supervisors`, supervisor).then(res => {
            showToast("Supervisor successfully created!", "success");
            history.navigate("/committee/supervisors");
        }).catch(err => {
            // handle error here
            showToast(`Supervisor update failed.`, 'error')
            console.log(err);
        })
    }

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
        })
    }

    useEffect(() => {
        // get facalties
        getFacalties();
        if (semesterInfo.semester !== "") {
            dispatch(fetchSupervisors(semesterInfo));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        // Check if each supervisor exists in the facultyList
        const updatedSelectedFaculty = supervisors
            .filter((supervisor) => facultyList.some((faculty) => faculty.id === supervisor._id))
            .map((supervisor) => supervisor._id) as string[]; // Use non-null assertion operator
            console.log(supervisors)
            console.log(facultyList);

        setSelectedFaculty(updatedSelectedFaculty);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supervisors, facultyList])

    return (
        <VStack align="start">
            <FieldGroup title="Semester Info">
                <VStack width="full" spacing="6">
                    <HStack width={"full"}>
                        <FormControl id="semester">
                            <FormLabel>Semsester</FormLabel>
                            <Input value={semesterInfo.semester} onChange={() => console.log('')} readOnly type="text" />
                        </FormControl>
                        <FormControl id="semesterYear">
                            <FormLabel>Year</FormLabel>
                            <Input value={semesterInfo.semesterYear} onChange={() => console.log('')} readOnly type="text" />
                        </FormControl>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Supervisor List">
                <VStack align="start" spacing={2}>
                    {facultyList.map(faculty => (
                        <Checkbox
                            size={'lg'}
                            key={faculty.id}
                            isChecked={selectedFaculty.includes(faculty.id)}
                            onChange={() => handleCheckboxChange(faculty.id)}
                        >
                            {faculty.name}
                        </Checkbox>
                    ))}
                </VStack>
            </FieldGroup>
            <FieldGroup>
                <Button onClick={() => createSupervisor()}>Save Changes</Button>
            </FieldGroup>
        </VStack>
    );
}