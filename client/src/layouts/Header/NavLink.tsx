import {
  Box,
  Button,
  Flex,
  HTMLChakraProps,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

interface DesktopNavLinkProps extends HTMLChakraProps<'button'> {
  active?: boolean,
  href: string
}

const DesktopNavLink = (props: DesktopNavLinkProps) => {
  const { active, href, ...rest } = props
  return (
    <Button
      as={RouterLink}
      to={href}
      fontWeight="semibold"
      color={mode('gray.600', 'gray.300')}
      background= "transparent"
      {...rest}
      _activeLink={{
        color: mode('blue.600', 'blue.300'),
        fontWeight: 'bold',
      }}
    />
  )
}

interface MobileNavLinkProps {
  icon: React.ElementType
  children: React.ReactNode
  href: string
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  const { icon, children, href } = props
  return (
    <Flex
      as={RouterLink}
      to={href}
      m="-3"
      p="3"
      align="center"
      rounded="md"
      cursor="pointer"
      _hover={{ bg: mode('gray.50', 'gray.600') }}
      _activeLink={{
        color: mode('blue.600', 'blue.300'),
        fontWeight: 'bold',
      }}
    >
      <Icon as={icon} color={mode('blue.600', 'blue.400')} fontSize="xl" />
      <Box marginStart="3" fontWeight="medium">
        {children}
      </Box>
    </Flex>
  )
}

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
}
