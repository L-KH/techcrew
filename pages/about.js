import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Grid,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>نظام كشف البلاستيك</title>
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


      {/* Main Content */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8}>
          {/* Logo */}
          <Box 
            w={{ base: "150px", md: "200px" }}
            h={{ base: "75px", md: "100px" }}
            position="relative"
            mb={4}
            mx="auto"
            transition="all 0.3s"
            _hover={{
              transform: 'scale(1.1)',
              filter: 'drop-shadow(0 0 20px rgba(49, 151, 149, 0.4))',
            }}
          >
            <Box
              as="img"
              src="/logo.png"
              alt="Logo"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>

          {/* About Section */}
          <Box w="full" position="relative">
            <Box
              position="relative"
              h={{ base: "400px", md: "600px" }}
              overflow="hidden"
              borderRadius="lg"
              mb={8}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bgImage="url('/team.jpg')"
                bgSize="cover"
                bgPosition="center"
                filter="brightness(0.7)"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bg="rgba(0, 0, 0, 0.75)"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                color="white"
                p={8}
                textAlign="center"
              >
 {/* School Name with Special Styling */}
 <Box
    mb={8}
    position="relative"
    _before={{
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "-10px",
      right: "-10px",
      bottom: "-10px",
      border: "2px solid",
      borderColor: "teal.400",
      borderRadius: "lg",
      opacity: 0.6,
      animation: "pulse 2s infinite"
    }}
  >
    <Heading
      fontSize={{ base: "2xl", md: "4xl" }}
      fontWeight="bold"
      color="teal.300"
      textTransform="uppercase"
      letterSpacing="wider"
      mb={2}
    >
      الثانوية الاعدادية الشهيد المدني شفيق
    </Heading>
    <Text
      fontSize={{ base: "md", md: "lg" }}
      color="gray.300"
      fontStyle="italic"
    >
      Achahid El Madani Chafik
    </Text>
  </Box>

  {/* Team Heading with Animation */}
  <Heading
    mb={6}
    fontSize={{ base: "xl", md: "3xl" }}
    position="relative"
    _after={{
      content: '""',
      position: "absolute",
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      bg: "teal.400",
      borderRadius: "full"
    }}
  >
    فريقنا
  </Heading>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                  w="full"
                  maxW="800px"
                >
                  <VStack align="flex-start" spacing={2}>
                    <Text fontSize="xl" fontWeight="bold">أعضاء الفريق:</Text>
                    <UnorderedList 
                        spacing={1} 
                        styleType="none" // This removes the bullets
                        ml={0} // Removes default left margin
                    >
                      <ListItem>محمد ناصر إفري</ListItem>
                      <ListItem>آية أبو مالك</ListItem>
                      <ListItem>لامياء اليوسفي</ListItem>
                      <ListItem>يوسف وعزيز</ListItem>
                      <ListItem>خديجة الحيان</ListItem>
                      <ListItem>هدى أبرام</ListItem>
                      <ListItem>منى الحماوي</ListItem>
                      <ListItem>ياسمينة أجبور</ListItem>
                      <ListItem>مريم أيت منصور</ListItem>
                      <ListItem>هبة الرداوي</ListItem>
                    </UnorderedList>
                  </VStack>
                  <VStack align="flex-start" spacing={2}>
                    <Text fontSize="xl" fontWeight="bold"  ml={150}>شكر خاص إلى:</Text>
                    <UnorderedList 
                        spacing={1} 
                        styleType="none" // This removes the bullets
                        ml={150} // Removes default left margin
                    >
                      <ListItem>إسحاق مفمان</ListItem>
                      <ListItem>عبد العالي</ListItem>
                      <ListItem>يونس بونيت</ListItem>
                      <ListItem>حفصة أيت منصور</ListItem>
                      <ListItem>يوسف</ListItem>
                    </UnorderedList>
                  </VStack>
                </Grid>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
