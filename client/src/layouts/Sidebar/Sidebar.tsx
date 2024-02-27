import {
    Box,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex, IconButton,
    Img,
    Stack,
    useColorModeValue as mode
} from '@chakra-ui/react'
import * as React from 'react'
import {
    FaArrowLeft,
} from 'react-icons/fa'
import {NavLink} from './NavLink'
import {HiOutlineMenu} from "react-icons/hi";
import {useState} from "react";
import {thesisCommitteeLinks, supervisorLinks, Link, studentLinks, boardMemberLinks} from "./sidebar-links-data";
import { useAppSelector } from '../../store';
import logo from "../../assets/images/Logo.png"

export const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAppSelector(x => x.account);
    const userLinks: {[key: string]: Link[]} = {
        Student: studentLinks,
        ThesisCommittee: thesisCommitteeLinks,
        Supervisor: supervisorLinks,
        BoardMember: boardMemberLinks
    }
    const userRole = user!.role as string;
    return (
        <>
            <Flex
                as="button"
                type="button"
                p="1"
                fontSize="2xl"
                color="gray.600"
                onClick={() => setIsOpen(!isOpen)}
                display={{base: 'block', md: 'block', lg: 'block', xl: 'none'}}
            >
                <Box padding={"5"}>
                    <HiOutlineMenu/>
                </Box>
                <Drawer placement={"left"}
                        onClose={() => console.log("closed")}
                        isOpen={isOpen}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Img src={logo}/>
                                <IconButton aria-label={""} icon={<FaArrowLeft/>} onClick={() => setIsOpen(!isOpen)}/>
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody bg={mode("green.400", "")}>
                            <Flex
                                width={{base: 'full', sm: 'xs'}}
                                direction="column"
                                color="white"
                            >
                                <Stack spacing={6}>
                                    <Stack>
                                        {userLinks[userRole].map((link, idx) => (
                                            <NavLink key={idx} label={link.title} icon={link.icon} href={link.href}/>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Flex
                height="100vh"
                width={{base: 'full', sm: 'xs'}}
                display={{base: 'none', lg: 'none', xl: 'flex'}}
                direction="column"
                bg="green.400"
                color="white"
                px={6}
                py={8}
            >
                <Stack spacing={6}>
                    <Stack>
                        {userLinks[userRole].map((link, idx) => (
                            <NavLink key={idx} label={link.title} icon={link.icon} href={link.href}/>
                        ))}
                    </Stack>
                </Stack>
            </Flex>
        </>
    )
}
