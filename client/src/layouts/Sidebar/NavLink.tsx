import { HStack, HTMLChakraProps, Icon, Link, Text } from '@chakra-ui/react'
import * as React from 'react'
import { NavLink as RouterLink } from "react-router-dom";

interface NavLinkProps extends HTMLChakraProps<'a'> {
  label: string
  icon: any,
  href: string
}

export const NavLink = (props: NavLinkProps) => {
  const { icon, label, href, ...rest } = props
  return (
    <Link
      as={RouterLink}
      to={href}
      display="block"
      py={2}
      px={3}
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      lineHeight="1.5rem"
      color="whiteAlpha.900"
      _hover={{
        bg: 'green.500',
        color: 'white',
      }}
      _activeLink={{
        bg: 'green.700',
        color: 'white',
      }}
      {...rest}
    >
      <HStack spacing={4}>
        <Icon as={icon} boxSize="20px" />
        <Text as="span">{label}</Text>
      </HStack>
    </Link>
  )
}
