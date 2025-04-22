import { Button, Container, Flex, HStack, Text, useColorMode, } from '@chakra-ui/react' //importing chakra-ui components
import React from 'react'
import { Link } from 'react-router-dom' //importing react-router-dom for routing
import { MoonIcon, PlusSquareIcon, SunIcon } from '@chakra-ui/icons' //importing icons from chakra-ui
import { IoMoon } from 'react-icons/io5' //importing moon icon from react-icons
import { LuSun } from 'react-icons/lu' //importing sun icon from react-icons

function Navbar() {
    const { colorMode, toggleColorMode} = useColorMode() //using color mode from chakra-ui
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
        h ={16}
        alignItems={"center"}
        justifyContent={"space-between"} //pushes parts to the sides
        flexDir={{
            base: "column", 
            sm: "row"
        }} //column on small screens, row on medium and up
        >
            <Text
            fontSize={{base: "22", sm: "28"}} //font size for small and medium screens
            fontWeight={"bold"} //bold text
            textTransform={"uppercase"} //uppercase text
            textAlign={"center"} //centered text
            bgGradient={"linear(to-r, cyan.400, blue.500)"} //gradient text
            bgClip={"text"} //clip the text to the gradient
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}> 
                <Link to={"/create"}>
                <Button>
                    <PlusSquareIcon fontSize={20} />
                </Button>
                </Link>
                <Button onClick ={toggleColorMode}>
                {colorMode === "light" ? <IoMoon/> : <LuSun size="20" />}  {/*if light mode, show moon icon, else show sun icon*/}
                </Button>
            </HStack>
            
        </Flex>

    </Container>
  )
}

export default Navbar