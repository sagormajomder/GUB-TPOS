import { Box, Button, Flex, Heading, HStack, Img, Stack, Text } from '@chakra-ui/react'
import { HiChevronRight } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import bannerImage from '../assets/images/banner_all.jpg';

export const Banner = () => {
  return (
    <Box bg="gray.800" as="section" minH="140px" position="relative">
      <Box py="32" position="relative" zIndex={1}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }} color="white">
          <Box maxW="xl">

            <Stack direction={{ base: 'column', md: 'row' }} mt="10" spacing="4">
              <HStack
                as={NavLink}
                transition="background 0.2s"
                justify={{ base: 'center', md: 'flex-start' }}
                to={"/contact-us"}
                color="white"
                rounded="full"
                fontWeight="bold"
                px="6"
                py="3"
                _hover={{ bg: 'whiteAlpha.300' }}
              >
                <span>Contact Us</span>
                <HiChevronRight />
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Flex
        id="image-wrapper"
        position="absolute"
        top={0}
        bottom={0}
        w="full"
        height={"100vh"}
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full" style={{backgroundImage: `url(${bannerImage})`, backgroundRepeat:"no-repeat"}}>
        </Box>
      </Flex>
    </Box>
  )
}
