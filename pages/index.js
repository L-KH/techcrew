import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
  useToast,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import axios from 'axios';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import {
    CircularProgress,
    CircularProgressLabel,
    Badge,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Grid,
    GridItem,
  } from '@chakra-ui/react';


export default function Home() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState({
    river: [],
    plastic: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const canvasRef = useRef(null);
  const toast = useToast();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      setImage(reader.result);
      setPredictions({ river: [], plastic: [] });
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  });
const [riskScore, setRiskScore] = useState(0);

const getRiskLevel = (score) => {
    if (score === -1) return { label: 'Clean Area', color: 'green', message: 'No plastic detected in this image!' };
    if (score < 30) return { label: 'Low Risk', color: 'green', message: 'Minor plastic presence detected' };
    if (score < 60) return { label: 'Medium Risk', color: 'yellow', message: 'Moderate plastic pollution detected' };
    return { label: 'High Risk', color: 'red', message: 'Significant plastic pollution detected!' };
  };

  const detectPlastic = async () => {
    if (!image) return;
  
    setIsLoading(true);
    try {
      const response = await axios.post('/api/detect', { 
        image,
        confidenceThreshold
      });
      
      if (response.data.predictions) {
        setPredictions({
          ...predictions,
          plastic: response.data.predictions
        });
        setRiskScore(response.data.riskScore);
        drawDetections(response.data.predictions);
      } else {
        toast({
          title: 'No detections',
          description: 'No plastic detected in this image',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Detection error:', error);
      toast({
        title: 'Error',
        description: 'Failed to detect plastic',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
  


  const drawDetections = (predictions) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
  
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
  
      // Draw predictions if they exist
      if (predictions && predictions.length > 0) {
        predictions.forEach(pred => {
          // Draw rectangle
          ctx.strokeStyle = '#FF0000';
          ctx.lineWidth = 3;
          ctx.strokeRect(
            pred.x - pred.width/2,
            pred.y - pred.height/2,
            pred.width,
            pred.height
          );
  
          // Draw label
          ctx.fillStyle = '#FF0000';
          ctx.font = '16px Arial';
          const label = `${pred.class} (${Math.round(pred.confidence * 100)}%)`;
          ctx.fillText(
            label,
            pred.x - pred.width/2,
            pred.y - pred.height/2 - 5
          );
        });
      }
    };
  
    img.src = image;
  };
  

  return (
    <>
    <Head>
      <title>Plastic Detection System</title>
      <link rel="icon" href="/logo.png" />
    </Head>
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
      <Box 
  w={{ base: "150px", md: "200px" }}
  h={{ base: "75px", md: "100px" }}
  position="relative"
  mb={4}
  mx="auto"
  transition="all 0.3s"
  style={{
    animation: 'float 3s ease-in-out infinite'
  }}
  _hover={{
    transform: 'scale(1.1)',
    filter: 'drop-shadow(0 0 20px rgba(49, 151, 149, 0.4))',
  }}
  cursor="pointer"
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




        <Heading color="teal.500">Plastic Detection System</Heading>
  
        <Box
  {...getRootProps()}
  p={10}
  border="2px dashed"
  borderColor="teal.300"
  borderRadius="md"
  w="full"
  textAlign="center"
  cursor="pointer"
  bg="white"
  transition="all 0.3s ease"
  _hover={{
    bg: 'gray.50',
    transform: 'translateY(-2px)',
    boxShadow: 'lg',
    borderColor: 'teal.500',
  }}
>
  <input {...getInputProps()} />
  <Text>Drag & drop an image here, or click to select</Text>
</Box>
  
        {image && (
          <Box position="relative" w="full">
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
        )}
  
        {isLoading && <Progress size="xs" isIndeterminate w="full" />}
        <Box w="full" maxW="md">
  <HStack spacing={4} mb={2}>
    <Text>Confidence Threshold:</Text>
    <Text fontWeight="bold">{(confidenceThreshold * 100).toFixed(0)}%</Text>
  </HStack>
  <Slider
    aria-label="confidence-threshold"
    defaultValue={0.5}
    min={0.1}
    max={1}
    step={0.1}
    onChange={(val) => setConfidenceThreshold(val)}
  >
    <SliderTrack>
      <SliderFilledTrack bg="teal.500" />
    </SliderTrack>
    <SliderThumb boxSize={6} />
  </Slider>
  <Text fontSize="sm" color="gray.500" mt={2}>
    Adjust the confidence threshold to control detection sensitivity
  </Text>
</Box>
        <Button
  as={motion.button}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  colorScheme="teal"
  onClick={detectPlastic}
  isLoading={isLoading}
  isDisabled={!image}
  size="lg"
  boxShadow="md"
  _hover={{
    boxShadow: 'xl',
    transform: 'translateY(-2px)',
  }}
>
  Analyze Image
</Button>
  
        {/* Grid section for statistics */}
      {image && (
        <Grid 
          templateColumns={{ 
            base: "1fr", 
            md: "repeat(3, 1fr)" 
          }} 
          gap={6} 
          w="full"
        >
          {/* Detection Count */}
          <GridItem>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Stat
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="sm"
                position="relative"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  shadow: 'xl',
                  transform: 'translateY(-2px)',
                }}
              >
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                w="4px" 
                h="full" 
                bg="blue.400" 
              />
              <StatLabel fontSize="lg">Detected Items</StatLabel>
              <StatNumber fontSize="3xl" color="blue.600">
                {predictions.plastic?.length || 0}
              </StatNumber>
              <StatHelpText>
                <HStack>
                  <Icon as={predictions.plastic?.length > 0 ? FiAlertTriangle : FiCheck} />
                  <Text>Plastic objects identified</Text>
                </HStack>
              </StatHelpText>
            </Stat>
            </motion.div>
          </GridItem>

          {/* Risk Score */}
          <GridItem>
            <Box 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              shadow="sm" 
              textAlign="center"
              position="relative"
            >
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                w="4px" 
                h="full" 
                bg={getRiskLevel(riskScore).color} 
              />
              <Text fontSize="lg" mb={3}>Risk Level</Text>
              <CircularProgress
                value={riskScore === -1 ? 0 : riskScore}
                size="120px"
                color={getRiskLevel(riskScore).color}
                thickness="8px"
              >
                <CircularProgressLabel>
                  {riskScore === -1 ? (
                    <Icon as={FiCheck} color="green.500" boxSize="40px" />
                  ) : (
                    <Text fontSize="xl" fontWeight="bold">
                      {riskScore}%
                    </Text>
                  )}
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
          </GridItem>

          {/* Assessment Result */}
          <GridItem>
            <Stat 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              shadow="sm"
              position="relative"
            >
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                w="4px" 
                h="full" 
                bg={getRiskLevel(riskScore).color} 
              />
              <StatLabel fontSize="lg">Assessment Result</StatLabel>
              <Box my={2}>
                <Badge
                  colorScheme={getRiskLevel(riskScore).color.split('.')[0]}
                  fontSize="md"
                  p={2}
                  borderRadius="md"
                >
                  {getRiskLevel(riskScore).label}
                </Badge>
              </Box>
              <StatHelpText fontSize="sm">
                {getRiskLevel(riskScore).message}
              </StatHelpText>
            </Stat>
          </GridItem>
        </Grid>
      )}
    </VStack>
  </Container>
  </>
  );
  
}
