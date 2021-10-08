import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const buildMessageList = (messages) => {
    return messages.map((message) => {
        return <ListItemText key={message._id} primary={message.content} />
    });
}


export default (props) => {
    const [messages, setMessages] = React.useState([])
    const [outMessage, setOutMessage] = React.useState('');

    const fetchMessages = async () => {
        const response = await fetch('http://localhost:3000/chat/');
        setMessages(await response.json());
    }

    const sendMessage = async (text) => {
        const message = {
            content: text,
            author: 'Erik'
        }
        const response = await fetch('http://localhost:3000/chat/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }
        );
        console.log('New message:', await response.json());
        setOutMessage('');
        await fetchMessages();
    }

    React.useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Button variant="container" onClick={fetchMessages}>Reload</Button>
                <List>
                    {
                        messages.map((message) => {
                            return <ListItemText key={message._id} primary={message.content} />
                        })
                    }
                </List>
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <TextField id="outlined-basic" value={outMessage} label="Outlined" variant="outlined" onChange={(e) => setOutMessage(e.target.value)} />
                    <Button variant="contained" onClick={() => sendMessage(outMessage)}>Send</Button>
                </Container>
            </Box>
        </Box>
    );

}