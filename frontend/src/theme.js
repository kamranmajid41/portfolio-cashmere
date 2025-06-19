import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colorScheme: 'dark', 

  colors: {
     dark: [
      '#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40',
      '#282A2E',
      '#202225', 
      '#181A1D',
      '#101113', 
      '#000', 
    ],
  },

  primaryColor: 'blue', 

  components: {
    Text: {
      defaultProps: {
        size: 'xl',
        c: '#fff',
        style: {
          fontWeight: 200,
        },
      },
    },

    Button: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.dark[6],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.dark[4],
          },
        },
      }),
    },
  },
});
