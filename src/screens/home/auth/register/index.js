import { Box,Container, Flex, Image, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import logoImage from '../../../../assets/images/logo.png'
import '../../../../styles/login.scss'
import SwitchButton from "../../../../components/auth/home_button";
import RegisterForm from "../../../../components/auth/register_form";

const RegisterScreen = () =>  {
    return (
    <Fragment>
    <Flex justify="center" align="center" height="100vh" className="home">
        <Container centerContent>
            <VStack align="center" spacing={0}>
                <Box position="fixed" top="10px" left="50%" transform="translateX(-50%)">
                    <SwitchButton />
                </Box>
                <Box 
                    width="100%" 
                    paddingTop="1rem"
                    color="white"
                    maxW={{ base: "400px", md: "500px" }} 
                >
                    <Image 
                        src={logoImage} 
                        objectFit="cover" 
                        margin="0" 
                        width="100%" 
                        maxW={{ base: "300px", md: "400px" }}
                    />
                </Box>
                <Box 
                    margin="0" 
                    fontSize='md'
                    width="50%"
                    borderRadius="md" 
                    color="white" 
                    maxW={{ base: "300px", md: "400px" }} 
                    padding="0"
                >
                    <RegisterForm/>
                </Box>
            </VStack>
        </Container>
    </Flex>
</Fragment>

);
}

export default RegisterScreen;
