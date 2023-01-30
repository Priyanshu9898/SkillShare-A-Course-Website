import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import { FaLinkedin} from 'react-icons/fa';

import {TiSocialLinkedinCircular} from "react-icons/ti";
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="@Priyanshu Malaviya"
            color={'teal.400'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a href="https://www.linkedin.com/in/priyanshumalaviya/" target={'blank'}>
            <TiSocialLinkedinCircular />
          </a>
          <a href="https://www.instagram.com/priyanshu_malaviya228/" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/Priyanshu9898" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
