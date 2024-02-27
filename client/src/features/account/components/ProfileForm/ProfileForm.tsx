import {
    AlertStatus,
    Avatar,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    StackDivider,
    Text,
    useColorModeValue as mode, useToast,
    VStack,
} from '@chakra-ui/react'
import { HiCloudUpload } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from '../../../../store'
import { FieldGroup } from '../FieldGroup';
import { User } from '../../models/User';
import { UpdateProfileData, useUpdateProfileMutation } from '../../api/accountApi';

const initialValues: User = {
    isActive: true,
    name: "",
    email: "",
    role: ""
}

export const ProfileForm = () => {
    const { user } = useAppSelector(x => x.account);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [updateUserProfile, { data, isSuccess, isError }] = useUpdateProfileMutation();
    const { semesterInfo } = useAppSelector(x => x.committees)

    const onUpdateProfile = async (values: any) => {
        const updateUser: UpdateProfileData = {
            id: user?.id!,
            name: values.name
        }
        await updateUserProfile(updateUser);
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Account updated.',
                position: 'top-right',
                description: "Account successfully created!.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
            <Formik
                enableReinitialize
                initialValues={user || initialValues}
                onSubmit={(values) => onUpdateProfile(values)}
            >
                {({ handleSubmit, errors, touched, values }) => (
                    <Form
                        id="settings-form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing="4" divider={<StackDivider />}>
                            <Heading size="lg" as="h1" paddingBottom="4">
                                Account Details
                            </Heading>
                            <FieldGroup title="Personal Info">
                                <VStack width="full" spacing="6">
                                    <HStack width={"full"}>
                                        <FormControl id="name">
                                            <FormLabel>Name</FormLabel>
                                            <Field as={Input} name={"name"} type="text" />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="email">
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" name={"email"} isReadOnly value={user!.email} />
                                    </FormControl>
                                </VStack>
                            </FieldGroup>
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
                        </Stack>
                        <FieldGroup mt="8">
                            <HStack width="full">
                                <Button isLoading={loading}
                                    loadingText={'Updating...'}
                                    type="submit"
                                    colorScheme="green">
                                    Save Changes
                                </Button>
                            </HStack>
                        </FieldGroup>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
