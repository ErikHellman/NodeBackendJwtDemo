import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const Chat = (props) => {
    const [messages, setMessages] = React.useState([])
    const [outMessage, setOutMessage] = React.useState('');
    const onReload = props.onReload;
    const onSend = props.onSend;

    const sendMessage = async (text) => {
        if (await onSend(text)) {
            console.log('Successfully sent message!')
            const messages = await onReload();
            console.log('Got messages:', messages);
            setMessages(messages);
        }
    }

    React.useEffect(() => {
        let cancelled = false;
        props.onReload().then((messages) => { if (!cancelled) { setMessages(messages); } });
        const refresh = setInterval(() => props.onReload().then((messages) => { if (!cancelled) { setMessages(messages); } }), 5000); 
        return () => { cancelled = true; clearInterval(refresh); }
    }, [props]);

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
                <Button variant="outlined" onClick={props.onReload}>Reload messages</Button>
                <List>
                    {
                        messages.map((message) => {
                            return <ListItemText key={message._id} primary={message.content} secondary={message.author}/>
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
                    <TextField id="outlined-basic" value={outMessage} label="Write message" variant="outlined" onChange={(e) => setOutMessage(e.target.value)} />
                    <Button style={{marginLeft: 1 + 'em', padding: 1 + 'em'}} variant="contained" onClick={() => sendMessage(outMessage)}>Send</Button>
                </Container>
            </Box>
        </Box>
    );

}

export default Chat