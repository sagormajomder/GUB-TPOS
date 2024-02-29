import {Box, CircularProgress} from "@chakra-ui/react";
import {motion} from "framer-motion";
import React from "react";
import {Sidebar} from "./Sidebar";
import {useColorModeValue as mode} from "@chakra-ui/color-mode";

interface AccountLayoutProps {
    children: React.ReactNode;
    loading: boolean;
}

export const AccountLayout = ({children, loading}: AccountLayoutProps) => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Box display={{base: 'block', md: 'flex'}}>
                <Sidebar/>
                <Box as="section" width={"100%"} bg={mode('gray.50', 'gray.800')} py={{base: '10', sm: '10'}}>
                    {loading && <Box
                        height={"90vh"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}>
                        <CircularProgress isIndeterminate color='green.300'/>
                    </Box>
                    }
                    {children}
                </Box>
            </Box>
        </motion.div>
    )
}
