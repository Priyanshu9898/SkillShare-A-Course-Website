import React from 'react'
import { Stack, HStack, VStack , Text, Heading, Button, Image, Box } from '@chakra-ui/react';
import {Link} from "react-router-dom";
import "./Home.css";
import bg from "../../assets/images/bg.png";
import {CgGoogle, CgYoutube} from "react-icons/cg";
import {VscGithubInverted} from "react-icons/vsc";
import {SiCoursera, SiUdemy} from "react-icons/si";
import {FaAws} from "react-icons/fa";

// import {TbBrandYoutube} from 'react-icons/tb';

const Home = () => {
  return (
    <>
    <div className="container">

      <Stack direction={["column", "row"]} spacing={["16"]} justifyContent={["center", "space-around"]} alignItems={['center', 'center']}>
        <VStack alignItems={["center", "flex-end"]} padding={["20px", "20px"]} justifyContent={["center", "center"]}  >
          <Heading className="text">LEARN FROM THE INDUSTRY EXPERTS</Heading>
          <Text className="text">Learn Industry Ready Skills At The Most Reasonable Prices</Text>
          <Link to="/courses" >
            <Button colorScheme='teal' variant='solid' className='btn'>
              Explore Courses
            </Button>
          </Link>
        </VStack>

        <Box alignItems="center">

        <Image
          boxSize='sm'
          objectFit='contain'
          src={bg}
          alt='Industry Ready'
          alignItems={['center', 'flex-start']}
          className="bgImage"
        
        />

        </Box>
        
      </Stack>
    </div>

    <Box className="container2" bg="blackAlpha.800" >

      <Heading className='heading' color={"#319795"}>
        Our Brands
      </Heading>
      <HStack width={"100%"}  height={["100px", "200px"]} justifyContent={"space-around"}>
        
        <CgGoogle className='icon'/>
        <CgYoutube className='icon'/>
        <VscGithubInverted className='icon'/>
        <SiCoursera className='icon'/>
        <SiUdemy className='icon'/>
        <FaAws className='icon'/>
      </HStack>
    </Box>
    </>
  )
}

export default Home