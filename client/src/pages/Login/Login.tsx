import { Box, Flex, useColorModeValue as mode, Img, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import LoginForm from '../../features/account/components/LoginForm'
import logo from "../../assets/images/Logo.png"
import { useLocation } from 'react-router-dom';

const roleTitles: { [key: string]: string; } = {
    Supervisor: 'Supervisor Login',
    Student: 'Student Login',
    ThesisCommittee: 'Thesis Committee Login',
    BoardMember: 'Board Member'
}

const Login = () => {

      // take the role from the query string
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'Student';
  
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Flex
                minH="80vh"
                direction={{
                    base: 'column',
                    md: 'row',
                }}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Box maxW="xl">
                    <Box
                        minW={{
                            md: '420px',
                        }}
                        mt="10"
                        rounded="xl"
                        bg={{
                            md: mode('white', 'gray.700'),
                        }}
                        shadow={{
                            md: 'lg',
                        }}
                        px={{
                            md: '10',
                        }}
                        pt={{
                            base: '8',
                            md: '12',
                        }}
                        pb="8"
                    >
                        <Box
                            mb="5"
                        >
                            <Img src={logo} />
                        </Box>
                        <Box
                            mb="16"
                        >
                            <Heading fontWeight="semibold" fontSize={'2xl'} textAlign={'center'}>{roleTitles[role]}</Heading>
                        </Box>
                        <LoginForm />
                    </Box>
                </Box>
            </Flex>
        </motion.div>
    )
}

export default Login;
