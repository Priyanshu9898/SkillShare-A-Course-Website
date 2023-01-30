import { VStack } from '@chakra-ui/react';
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import IconBox from './IconBox';
import { useLocation } from 'react-router-dom';



const Sidebar = () => {


    const location = useLocation();


  return (

        <VStack spacing={"8"} p="16px" boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"} alignItems={"flex-start"} >
            
            <IconBox title="dashboard" Icon = {RiDashboardFill} url={"dashboard"} active={location.pathname === "/admin/dashboard"} />

            <IconBox title="Create Courses" Icon = {RiAddCircleFill} url={"createcourses"} active={location.pathname === "/admin/createcourses"}  />

            <IconBox title="Courses" Icon = {RiEyeFill} url={"admincourses"} active={location.pathname === "/admin/admincourses"} />

            <IconBox title="Users" Icon = {RiUser3Fill} url={"users"} active={location.pathname === "/admin/users"} />
        </VStack>
  )
}

export default Sidebar
