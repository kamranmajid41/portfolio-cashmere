import { Group, Box, Image, Text } from '@mantine/core';

function Header({ setGoToContent, setGoToView }) {

  return (
    <Group h="100%" px="md" justify="flex-start" align="center" wrap="nowrap">
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                marginRight: '-10px',
                marginLeft: '62px',
                flexShrink: 0,
                cursor: 'pointer', 
            }}
            onClick={() => {setGoToContent(false); setGoToView(false)}} 
        >
        <Image
            src="frontend/public/cashmere.png"
            alt="Cashmere Icon"
            height={20}
            width={20}
            fit="contain"
        />
        </Box>
        <Text
            style={{ cursor: 'pointer' }} 
            onClick={() => {setGoToContent(false); setGoToView(false)}} 
        >
            Portfolio
        </Text>
    </Group>
  );
}

export default Header;