import {
    Box,
    BoxProps
  } from "@chakra-ui/react";
  import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

type Merge<P, T> = Omit<P, keyof T> & T;
export const MotionBox = motion(Box);
