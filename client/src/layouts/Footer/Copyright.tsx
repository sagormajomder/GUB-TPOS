import { Text, TextProps } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} Green University, Inc. All rights reserved.
  </Text>
)
