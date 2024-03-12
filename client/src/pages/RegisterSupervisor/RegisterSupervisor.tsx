import {
    Box,
    Heading,
    Img,
    SimpleGrid,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { motion } from 'framer-motion';
import * as React from 'react'
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png"
import { RegisterSupervisorForm } from '../../features/account/components/RegisterSupervisorForm';

const RegisterSupervisor: React.FC = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box minH="100vh">
                <Box maxW="6xl" mx="auto" py={{ base: '10', md: '20' }} px={{ base: '4', md: '10' }}>
                    <SimpleGrid columns={{ base: 1, lg: 1 }} spacing="14">
                        <Box w="full" maxW="xl" mx="auto">
                            <Box
                                bg={{ md: mode('white', 'gray.700') }}
                                rounded={{ md: '2xl' }}
                                p={{ base: '4', md: '12' }}
                                borderWidth={{ md: '1px' }}
                                borderColor={mode('gray.200', 'transparent')}
                                shadow={{ md: 'lg' }}
                            >
                                <Box
                                    mb="16"
                                >
                                    <Img src={logo} />
                                </Box>
                                <Box mb="8" textAlign={{base: 'center', md: 'start'}}>
                                    <Heading size="lg" mb="2" fontWeight="extrabold">
                                        Supervisor Register
                                    </Heading>
                                    <Text fontSize="lg" color={mode('gray.600', 'gray.400')} fontWeight="medium">
                                        Enter your info to get started
                                    </Text>
                                </Box>
                                <RegisterSupervisorForm />
                            </Box>

                            <Text mt="8" align="center" fontWeight="medium">
                                Already have an account?{' '}
                                <Box
                                    as={Link}
                                    to="/"
                                    color={mode('green.600', 'green.200')}
                                    display={{ base: 'block', md: 'inline-block' }}
                                >
                                    Log in to Green University
                                </Box>
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </motion.div>
    )
}

export default RegisterSupervisor;