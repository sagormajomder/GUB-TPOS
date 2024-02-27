import { Field, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel, IconButton,
  Input, InputGroup, InputRightElement,
  LightMode,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useLoginMutation } from "../../api/accountApi";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setUser } from "../../accountSlice";
import { history } from "../../../../helpers";

export interface ILoginForm {
  email: string,
  password: string,
  role: string
}

interface Error {
  message: string;
}

const initialValues: ILoginForm = {
  email: "",
  password: "",
  role: ""
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Error[]>([]);
  const [loginUser, { data, isSuccess, isError, error }] = useLoginMutation();
  const { user } = useAppSelector(x => x.account);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'Student';

  const handleLogin = async (values: ILoginForm) => {
    values.role = role
    await loginUser(values);
  }

  useEffect(() => {
    if (data) {
      // set the token in the local storage
      // set the state of accountSlice isLoggedIn to true
      // redirect to the dashboard
      dispatch(setUser(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      onSubmit={(values) => handleLogin(values)}
    >
      {({ handleSubmit, errors, touched }) => (
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
          <Stack spacing="8">
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
                    return "Email is required.";
                  }
                  return error;
                }} />
              {errors.email && touched.email && errors.email}
            </FormControl>
            <Box>
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
                      if (value.length === 0) {
                        return "Password is required.";
                      }
                    }} />
                </InputGroup>
                {errors.password && touched.password && errors.password}
              </FormControl>
              <Box
                display="inline-block"
                as={Link}
                to="/forgot-password"
                color={mode("green.600", "green.300")}
                fontWeight="semibold"
                fontSize="sm"
                mt="3"
              >
                Forgot password?
              </Box>
            </Box>
          </Stack>
          <Flex
            gap='4'
            direction={{
              base: "column-reverse",
              md: "row",
            }}
            mt="6"
            align="center"
            justify="space-between"
          >
            {(role === "Student" || role === "Supervisor") && (
              <Text
                color={mode("gray.600", "gray.400")}
                fontSize="sm"
                fontWeight="semibold"
              >
                New user?{" "}
                <Box as={Link} to="/register" color={mode("green.600", "green.300")}>
                  Create account
                </Box>
              </Text>
            )}
            <LightMode>
              <Button
                isLoading={loading}
                loadingText="Logging..."
                mb={{
                  base: "4",
                  md: "0",
                }}
                w={{
                  base: "full",
                  md: "auto",
                }}
                type="submit"
                colorScheme="green"
                size="lg"
                fontSize="md"
                fontWeight="bold"
              >
                Sign in
              </Button>
            </LightMode>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
