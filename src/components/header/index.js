import React, { useEffect, useState } from 'react';
import { Box, Flex, Link, Button, useColorMode, Image, Text } from '@chakra-ui/react';
import logoImage from '../../assets/images/default_transparent_765x625.png';
import { faGear, faMoon, faRightFromBracket, faSun, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutConfirmation from './logout_confirmation';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const icon = colorMode === 'light' ? faMoon : faSun;
    const iconColor = colorMode === 'light' ? 'grey' : 'grey'; 
    const navigate = useNavigate();
    const location = useLocation(); // Obtenha a rota atual

    const [userInfo, setUserInfo] = useState({ name: '', profilePictureUrl: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            const user = JSON.parse(storedUser);
            setUserInfo({
                name: user.name,
                profilePictureUrl: user.profilePictureUrl
            })
        }
    }, []);
    const configIcon = location.pathname === '/edit' ? faHome : faGear;
    const handleConfigClick = () => {
        if (location.pathname === '/edit') {
            navigate('/'); // Volta para a home
        } else {
            navigate('/edit'); // Vai para a página de edição
        }
    };

    useEffect(() => {
        // Aplica o fundo de acordo com o modo de cor
        document.body.style.backgroundColor = colorMode === 'light' ? '#F0F0F0' : '#1F1717';

    }, [colorMode]);

    return (
        <Box bg='#1F1717' px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Link href="/">
                        <Image 
                            src={logoImage} 
                            alt='logo.png' 
                            boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                            borderRadius='lg'
                            objectFit='cover'
                        />
                    </Link>
                </Box>
                <Flex textAlign="center"> 
                    <Box mr="2">
                        <Image 
                            src={`${userInfo.profilePictureUrl}`} 
                            alt="Profile Image"
                            boxSize="45px" 
                            borderRadius="full" 
                            objectFit="cover" 
                        />  
                    </Box>
                    <Box color="white" display="flex">
                        <Text fontSize="3xl" fontWeight="bold">{userInfo.name}</Text>
                    </Box>
                </Flex>
                <Flex alignItems={'center'} >
                    <Button borderRadius='20px' color="white" bg="transparent" onClick={handleConfigClick} mr={2}>
                        <FontAwesomeIcon icon={configIcon} />
                    </Button>
                    <Button bg="transparent"  width="50px" borderRadius='20px' onClick={toggleColorMode} mr={4}>
                        <FontAwesomeIcon icon={icon} color={iconColor} />
                    </Button>
                    <LogoutConfirmation />
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
