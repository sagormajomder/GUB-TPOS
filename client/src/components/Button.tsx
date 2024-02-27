// Button.tsx
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { withTheme } from "@emotion/react";

interface Props extends ButtonProps {}

const StyledButton = styled(motion(ChakraButton))`
  background-color: ${(props) => props.theme.colors.custom[800]} !important; // Access the custom color from the theme
  color: white !important;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.custom[400]} !important; // Change background color on hover
  }
`;

const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
      {...props}
    />
  );
};

export default withTheme(Button);
