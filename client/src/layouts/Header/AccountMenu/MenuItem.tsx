import { Box, chakra, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  href: string
  title: string
  isNew?: boolean
  children?: React.ReactNode,
  icon?: React.ReactNode
}

export const MenuItem = (props: MenuItemProps) => {
  const { title, href, icon } = props
  return (
    <chakra.a
      as={NavLink}
      display="block"
      px="5"
      py="3"
      to={href}
      rounded="lg"
      transition="0.2s background"
      _hover={{ bg: mode('gray.50', 'gray.600') }}
      _activeLink={{
        bg: 'blue.700',
        color: 'white',
      }}
    >
      <Box display={"flex"} alignItems="center" gap={"3"}>
        {icon && (
          <Text as="dt" fontSize="md" color={mode('gray.600', 'gray.400')}>
            {icon}
          </Text>
        )}
        <Text
          as="dt"
          fontWeight="semibold"
          transition="0.2s all"
          _groupHover={{ color: 'blue.500' }}
        >
          {title}
        </Text>
      </Box>
    </chakra.a>
  )
}
