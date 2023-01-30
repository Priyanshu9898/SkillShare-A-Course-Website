import React from 'react'
import {Container, Box, VStack, Text, Heading, Button} from "@chakra-ui/react";
import {RiCheckboxCircleFill} from "react-icons/ri";
import {Link, useSearchParams} from "react-router-dom";

const PaymentSuccess = () => {

    const reference = useSearchParams()[0].get('reference');
  return (
    <>
        <Container h={"95vh"}>
            <VStack h={"full"} alignItems="center" justifyContent="center" borderRadius={6} boxShadow={"lg"} spacing={6}>

                
                <Heading textAlign="center">Pro Pack Developer</Heading>
                <Box  bg={"#319795"} boxShadow={"lg"} p={"16px 30px"} borderRadius={6} width={"80%"}>
                    <Text textAlign="center" color="white">Payment Successful</Text>
                </Box>
                <Box my={4}  p={"16px 30px"}  width={"80%"}>
                    <Text textAlign="center" >Congratulations! You are now a pro pack developer. You now have a lifetime access to all our premium content.</Text>
                    
                </Box>
                
                
                <Heading size="4xl" textAlign="center">
                        <RiCheckboxCircleFill />
                    </Heading>
                
                <Link to="/" width={"100%"}>
                    <Button colorScheme='teal' p="12px" >
                            Go to Profile
                    </Button>
                </Link>
                <Box my={4}  p={"16px 30px"} boxShadow={"lg"} borderRadius={6} width={"80%"} alignItems="center" justifyContent="center">
                    
                    

                    <Text my="12px" textAlign="center" >Reference: {reference}</Text>
                </Box>
            </VStack>
        </Container>
    
    </>
  )
}

export default PaymentSuccess