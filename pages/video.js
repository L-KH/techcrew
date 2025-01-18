import Head from 'next/head';
import {
  Box,
  Container,
  VStack,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function Video() {
  return (
    <>
      <Head>
        <title>نظام كشف البلاستيك - الفيديو</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* Navigation Bar */}
      <Box bg="teal.500" py={4} position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <NextLink href="/" passHref legacyBehavior>
              <Link color="white" fontSize="lg" fontWeight="bold" _hover={{ color: 'teal.200' }}>
                العودة إلى الرئيسية
              </Link>
            </NextLink>
          </VStack>
        </Container>
      </Box>

      {/* Video Content */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="center">
          <Box 
            w="full" 
            maxW="1000px" 
            h={{ base: "300px", md: "600px" }}
            bg="black" 
            borderRadius="lg" 
            overflow="hidden"
          >
            <ReactPlayer
              url="/video.mp4"
              width="100%"
              height="100%"
              controls={true}
              playing={false}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
}