import {
    Box,
    Heading,
    useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store';
import { Banner } from '../../components/Banner';
import { UserCategories } from './components/UserCategories';

const Home = () => {
    const { user } = useAppSelector(x => x.account);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Banner />
            <Box as="section" bg={mode('gray.50', 'gray.800')} py={{ base: '10', sm: '24' }}>
                {/* <Features /> */}
                {!user && (
                    <UserCategories />
                )}
            </Box>
        </motion.div>
    )
}

export default Home;
