import {
  Avatar,
  Box,
  Flex,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../store'
import { history } from '../../../helpers';

export const AccountMenu = () => {
  const {user} = useAppSelector(x => x.account);
  return (
    <Box as="header" pos="relative">
      <Box maxW="7xl" px={{ base: '4', md: '6', lg: '8' }} py="6">
        <HStack
          as="button"
          fontWeight="semibold"
          color={mode('gray.600', 'gray.400')}
          spacing={"4"}
          onClick={() => history.navigate('/account/profile')}
        >
          <Avatar name={`${user!.name}`} src={"https://ca.slack-edge.com/T024F7F15-UJVQ359SP-81fc55875723-512"} size="sm" />
          <Flex flexDirection={"column"} alignItems={"flex-start"} justifyContent={"center"}>
            <span>{user!.name}</span>
            {user!.role === "Student"?user?.idNumber: user?.role}
          </Flex>
        </HStack>
      </Box>
    </Box>
  )
}
