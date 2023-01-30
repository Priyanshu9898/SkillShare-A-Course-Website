import React from 'react'
import {Grid, Box, Text, Heading, Stack} from "@chakra-ui/react";
import Sidebar from "../Sidebar.js";
import DataBox from './DataBox.js';
import cursor from "../../../assets/images/cursor.png";
import Bar from "./Bar.js";
import { LineChart } from './Chart.js';


const Dashboard = () => {
  return (
    
    <>
    <Grid css={{cursor: `url(${cursor}) default`}} minH={"100vh"}  templateColumns={["1fr", "5fr 1fr"]}>


      <Box boxSizing='border-box'  px={["4", "0"]}>
        <Text textAlign="center" opacity={0.5} >{`Last Changes done on ${new Date().toString().split('G')[0]}`}</Text>
        <Heading textAlign={['center', 'left']} ml={["0", "32"]} mb="16">Dashboard</Heading>

        <Stack direction={['column', 'row']} minH="24" justifyContent={"space-evenly"}>

          <DataBox title="Views" qty={123} qtyPercent={30} profit={true} />

          <DataBox title="Users" qty={23} qtyPercent={78} profit={true} />

          <DataBox title="Subscription" qty={22} qtyPercent={12} profit={false} />

        </Stack>


        <Box m={["0", "16"]} borderRadius="lg" p={["0", "16"]} boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"} mt={["4", "16"]} mb={["4", "16"]}>
          <Heading size={"md"} textAlign={['center', 'left']} pt={["8", "0"]}  ml={["0", "16"]} >Views Graphs</Heading>

          {/* Line Graph Here */}
          <LineChart />
        </Box>

        <Grid templateColumns={["1fr", "2fr 1fr"]}>
          <Box p="4">
            <Heading size={"md"} textAlign={['center', 'left']} my="8" ml={["0", "16"]}>Progress Bar</Heading>
            <Box>
              <Bar title="Views" value={30} profit={true}/>
              <Bar title="Users" value={78} profit={true}/>
              <Bar title="Subscription" value={20} profit={false}/>
            </Box>
          </Box>

          <Box p="4">
            <Heading size={"md"} textAlign={['center', 'left']} my="8" ml={["0", "16"]}>Users</Heading>
          </Box>
        </Grid>

        
      </Box>

      {/* Sidebar Here */}
      <Sidebar />
    </Grid>
    </>
  )
}

export default Dashboard