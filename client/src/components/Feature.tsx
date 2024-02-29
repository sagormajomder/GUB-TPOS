import { Center, IconButton, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface FeatureProps {
  icon: React.ReactElement
  title: string
  children: React.ReactNode
}

export const Feature = (props: FeatureProps) => {
  const { title, children, icon } = props
  return (
    <Stack direction="row" w="100%" spacing="6">
      <Center aria-hidden flexShrink={0} w="12" h="12" rounded="md" color="white" bg="blue.500">
        {icon}
      </Center>
      <Stack>
        <Text as="h3" fontSize="xl" fontWeight="extrabold">
          {title}
        </Text>
        <Text pr="6" color={mode('gray.600', 'gray.400')} lineHeight="tall">
          {children}
        </Text>
      </Stack>
      <Center aria-hidden flexShrink={0} w="12" h="12" rounded="md" color="blue.500">
        <IconButton
          as={Link}
          to="/account/notifications"
          isRound
          size="sm"
          fontSize="xl"
          aria-label="Show notification"
          variant="ghost"
          color="current"
          icon={<FaArrowRight />} />
      </Center>
    </Stack>
  )
}
