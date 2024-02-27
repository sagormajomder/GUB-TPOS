import { Formik, Field } from "formik";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel, IconButton,
    Input,
    InputGroup, InputRightElement,
    Stack,
    useToast,
    Text,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useRegisterSupervisorMutation } from "../../api/accountApi";
import { setUser } from "../../accountSlice";
import { history } from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface IRegisterForm {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    researchInterests: string[]
}

interface Error {
    message: string;
}

export const RegisterSupervisorForm = () => {
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<Error[]>([]);
    const [registerUser, { data, isSuccess, isError, error }] = useRegisterSupervisorMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(x => x.account);
    const [researchInterests, setResearchInterests] = useState<string[]>(['']);


    const initialValues: IRegisterForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        researchInterests: []
    }
    const createAccount = async (values: IRegisterForm) => {
        setLoading(true);
        values.researchInterests = researchInterests;
        await registerUser(values)
    }

    const handleAddResearchInterest = () => {
      setResearchInterests((prevInterests) => [...prevInterests, '']);
    };
  
    const handleRemoveResearchInterest = (index: number) => {
      setResearchInterests((prevInterests) =>
        prevInterests.filter((_, i) => i !== index)
      );
    };
  
    const handleResearchInterestChange = (index: number, value: string) => {
      setResearchInterests((prevInterests) =>
        prevInterests.map((interest, i) => (i === index ? value : interest))
      );
    };

    useEffect(() => {
        if (data) {
            // set the token in the local storage
            // set the state of accountSlice isLoggedIn to true
            // redirect to the dashboard
            dispatch(setUser(data));
        }
    }, [data]);

    useEffect(() => {
        if (user) {
            history.navigate('/account/profile');
        }
    }, [user])

    useEffect(() => {
        if (error) {
            setServerErrors(error.data.errors);
        }
    }, [error])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => createAccount(values)}
        >
            {({ handleSubmit, errors, touched, values }) => (
                <form
                    onSubmit={handleSubmit}
                >
                    {serverErrors.map((sError, index) => {
                        return (
                            <Alert status='error' key={index}>
                                <AlertIcon />
                                {sError.message}
                            </Alert>
                        )
                    })}
                    <Stack spacing="4">
                        <Flex gap='2'>
                            <FormControl isInvalid={!!errors.name && touched.name}>
                                <FormLabel mb={1}>Name</FormLabel>
                                <Field as={Input} id="name" name="name" required
                                    validate={(value: string) => {
                                        let error;
                                        if (value.length === 0) {
                                            error = "Name is required.";
                                        }
                                        return error;
                                    }} />
                                {errors.name && touched.name && errors.name}
                            </FormControl>
                        </Flex>
                        <FormControl isInvalid={!!errors.email && touched.email}>
                            <FormLabel mb={1}>Email</FormLabel>
                            <Field as={Input}
                                type="email"
                                id="email"
                                name="email"
                                required
                                validate={(value: string) => {
                                    let error;
                                    if (value.length === 0) {
                                        error = "Email is required.";
                                    }else {
                                        // Regular expression to validate email format with any department and fixed last part
                                        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+green\.edu\.bd$/;
                        
                                        if (!emailRegex.test(value)) {
                                            error = "Invalid email format. Please use a valid green.edu.bd domain.";
                                        }
                                    }
                                    return error;
                                }} />
                            {errors.email && touched.email && errors.email}
                        </FormControl>
                        <Box>
                            <Text fontSize="xl" mb={4}>
                                Research Interests
                            </Text>
                            <Stack spacing={4}>
                                {researchInterests.map((interest, index) => (
                                    <Flex key={index} align="center">
                                        <Input
                                            type="text"
                                            placeholder="Enter research interest"
                                            value={interest}
                                            onChange={(e) =>
                                                handleResearchInterestChange(index, e.target.value)
                                            }
                                        />
                                        <IconButton
                                            aria-label="Remove research interest"
                                            icon={<CloseIcon />}
                                            ml={2}
                                            onClick={() => handleRemoveResearchInterest(index)}
                                        />
                                    </Flex>
                                ))}
                            </Stack>
                            <Button
                                leftIcon={<AddIcon />}
                                colorScheme="teal"
                                variant="outline"
                                mt={4}
                                onClick={handleAddResearchInterest}
                            >
                                Add Research Interest
                            </Button>
                        </Box>
                        <FormControl isInvalid={!!errors.password && touched.password}>
                            <FormLabel mb={1}>Password</FormLabel>
                            <InputGroup>
                                <InputRightElement>
                                    <IconButton
                                        variant="link"
                                        aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                                        icon={showPassword ? <HiEye /> : <HiEyeOff />}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </InputRightElement>
                                <Field as={Input}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    validate={(value: string) => {
                                        let error;
                                        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[a-zA-Z\d!@#$%^&*]{5,}$/;
                                        if (value.length === 0) {
                                            return "Password is required.";
                                        }
                                        if (!passwordFormat.test(value)) {
                                            error = "Password must have 1 uppercase, 1 lowercase, 1 number letter and at least 5 characters"
                                        }

                                        return error;
                                    }} />
                            </InputGroup>
                            {errors.password && touched.password && errors.password}
                        </FormControl>
                        <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                            <FormLabel mb={1}>Confirm password</FormLabel>
                            <InputGroup>
                                <InputRightElement>
                                    <IconButton
                                        variant="link"
                                        aria-label={showConfirmPassword ? 'Mask password' : 'Reveal password'}
                                        icon={showConfirmPassword ? <HiEye /> : <HiEyeOff />}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </InputRightElement>
                                <Field as={Input}
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    validate={(value: string) => {
                                        let error;
                                        if (value.length === 0) {
                                            return "Confirm password is required.";
                                        }
                                        if (value !== values.password) {
                                            error = "Password and confirm password do not match."
                                        }
                                        return error;
                                    }} />
                            </InputGroup>
                            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                        </FormControl>
                        <Text
                            color={mode("gray.600", "gray.400")}
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            Are you student?{" "}
                            <Box as={Link} to="/register" 
                            color={mode("blue.600", "blue.300")}
                            >
                                Create account here
                            </Box>
                        </Text>
                        <Button isLoading={loading} loadingText="Creating account..." type="submit" colorScheme="green"
                            size="lg" fontSize="md">
                            Create my account
                        </Button>
                    </Stack>
                </form>
            )}
        </Formik>
    )
}
