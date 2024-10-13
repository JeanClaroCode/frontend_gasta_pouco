import { useState, useEffect } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const SwitchButton = () => {
const navigate = useNavigate();
const location = useLocation();

const [isLoginActive, setIsLoginActive] = useState(location.pathname === '/login');

useEffect(() => {
    if (location.pathname === '/login') {
      setIsLoginActive(true);
    } else if (location.pathname === '/register') {
      setIsLoginActive(false);
    }
  }, [location]);

  const handleLoginClick = () => {
    setIsLoginActive(true);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setIsLoginActive(false);
    navigate('/register');
  };

  return (
    <Stack direction='row' spacing={0}>
      <Button
        backgroundColor={isLoginActive ? '#5AED83' : 'gray.200'}
        color={isLoginActive ? 'white' : 'black'}
        onClick={handleLoginClick}
        borderRightRadius={0}
        _hover={{ backgroundColor: isLoginActive ? '#4EC672' : 'gray.300' }}
      >
        Login
      </Button>
      <Button
        backgroundColor={!isLoginActive ? '#5AED83' : 'gray.200'}
        color={!isLoginActive ? 'white' : 'black'}
        onClick={handleRegisterClick}
        borderLeftRadius={0}
        _hover={{ backgroundColor: !isLoginActive ? '#4EC672' : 'gray.300' }}
      >
        Register
      </Button>
    </Stack>
  );
};

export default SwitchButton;
