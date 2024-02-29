import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import { Category } from './_data'
import { Link } from 'react-router-dom'

interface Props {
  category: Category
  rootProps?: BoxProps
}

export const CategoryCard = (props: Props) => {
  const { category, rootProps } = props
  return (
    <Box
      position="relative"
      key={category.name}
      borderRadius="xl"
      overflow="hidden"
      minH={{ base: 'sm', lg: 'auto' }}
      {...rootProps}
    >
      <Box>
        <Image
          src={category.imageUrl}
          height="full"
          objectFit="cover"
          alt={category.name}
          fallback={<Skeleton />}
        />
        <Box
          position="absolute"
          inset="0"
          bg="linear-gradient(180deg, rgba(0, 0, 0, 0) 47.92%, #000000 100%)"
          boxSize="full"
        />
        <Flex
          color="white"
          direction="column-reverse"
          position="absolute"
          inset="0"
          boxSize="full"
          px={{ base: '4', md: '8' }}
          py={{ base: '6', md: '8', lg: '10' }}
        >
          <Stack spacing="5">
            <Stack spacing="1">
              <Heading fontSize="2xl" fontWeight="extrabold">
                {category.name}
              </Heading>
            </Stack>
            <HStack>
              <Link to={category.url}>
                <Text fontSize="lg" fontWeight="bold" textDecoration="underline">
                Login
                </Text>
              </Link>
              <Icon as={FaChevronRight} />
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </Box>
  )
}
