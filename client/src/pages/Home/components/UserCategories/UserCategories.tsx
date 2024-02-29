import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { CategoryCard } from './CatetgoryCard'
import { categories } from './_data'

export const UserCategories = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack spacing={{ base: '6', md: '8', lg: '12' }}>
      <Flex
        justify="space-between"
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: '8', lg: '16' }}>
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </SimpleGrid>
    </Stack>
  </Box>
)
