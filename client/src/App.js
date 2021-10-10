import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './SignIn'
import Chat from './Chat'

const theme = createTheme();

export default function App() {
  const [user, setUser] = React.useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(userData);
    setUser(userData.email);
  };

  let content = <SignIn handleSubmit={handleSubmit} />
  if (user) {
    content = <Chat />
/*     content = (
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Typography component="h1" variant="h5">
          Welcome {user}
        </Typography>
      </Box>
    );
 */  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {content}
      </Container>
    </ThemeProvider>
  );
}