import React, { useContext } from 'react';

import {
  Box,
  Flex,
  SlideFade,
  IconButton,
  useTheme,
  useBreakpointValue,
  Center,
  Heading,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import { LayoutContext } from '@/app/layout';
import { Logo } from '@/components';

import { NavDrawer } from '../NavDrawer';

const MenuButton = (props) => {
  const { navOnOpen } = useContext(LayoutContext);
  return (
    <IconButton
      aria-label="Navigation"
      icon={<FiMenu size="1.5em" />}
      onClick={navOnOpen}
      bg="transparent"
      _active={{ bg: 'gray.700' }}
      _hover={{ bg: 'gray.900' }}
      {...props}
    />
  );
};

export const TopBar = () => {
  const theme = useTheme();
  const showDrawer = useBreakpointValue({
    base: true,
    [theme.layout.breakpoints.desktop]: false,
  });

  return (
    <>
      <SlideFade in offsetY={-40} style={{ zIndex: 2 }}>
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bg="gray.800"
          color="gray.50"
          align="center"
          pt="safe-top"
          px="4"
          alignItems="center"
          justifyContent="center"
          h={theme.layout.topBar.height}
        >
          <Heading as={RouterLink} to="/" size="md">
            ISS Location
          </Heading>
        </Flex>
      </SlideFade>
      <Box h={theme.layout.topBar.height} />
      {showDrawer && <NavDrawer />}
    </>
  );
};
