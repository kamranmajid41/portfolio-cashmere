import { Text, Button, Stack, Box, useMantineTheme, UnstyledButton, Group } from '@mantine/core';
import { IconEdit, IconEye} from '@tabler/icons-react';
import Lottie from 'lottie-react';
import animation from './assets/lottie.json';

function Home({ setGoToContent, setGoToView }) {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 60px)',
        position: 'relative',   
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing.xl,
        overflow: 'hidden',  
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 800,
          height: 800,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',  
          filter: 'brightness(0.1)', 
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        <Lottie
          animationData={animation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Stack
        align="center"
        spacing="xl"
        style={{
          position: 'relative',
          zIndex: 1,
          color: theme.colorScheme === 'dark' ? 'white' : 'black',
        }}
      >
        <Text
          variant="gradient"
          gradient={{ from: '#212ca6', to: '#c457ff', deg: 45 }}
          style={{
            fontWeight: 500,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.2,
          }}
        >
          Welcome to your personalized portfolio creator.
        </Text>

        <Text
          size="lg"
          c="dimmed"
          style={{ maxWidth: '600px' }}
        >
          Effortlessly build, manage, and showcase your creative work.
        </Text>

        <Group>
          <UnstyledButton
            onClick={() => { setGoToContent(true); }}
          >
            <Group gap={4}> 
              <Text>edit portfolio</Text>
              <IconEdit size={20}/>
            </Group>
          </UnstyledButton>
            or
          <UnstyledButton
            onClick={() => { setGoToView(true); }}
          >
            <Group gap={5}> 
              <Text>view saved</Text>
              <IconEye size={20}/>
            </Group>
          </UnstyledButton>
        </Group>
        
      </Stack>
    </Box>
  );
}

export default Home;
