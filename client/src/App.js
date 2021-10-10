import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './SignIn';
import Chat from './Chat';
import Api from './api';

const theme = createTheme();
const api = new Api();

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(api.authToken != null);

  const login = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get('email');
    const password = data.get('password');

    const result = await api.login(userName, password);
    setLoggedIn(result);
  };

  const loadMessages = async () => {
    const response = await api.fetchMessages();
    if (response.error) {
      console.log('Error loading messages:', response);
      setLoggedIn(false);
      return [];
    } else {
      console.log('Successfully loaded messages:', response);
      return response;
    }
  }

  const sendMessage = async (message) => {
    const status = await api.sendMessage(message);
    console.log('Message sent:', status);
    if (status >= 400 && status < 500) {
      setLoggedIn(false);
    }
    return status === 200;
  }

  let content = <SignIn onLogin={login} />
  if (loggedIn) {
    content = <Chat onReload={loadMessages} onSend={sendMessage} />
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {content}
      </Container>
    </ThemeProvider>
  );
}