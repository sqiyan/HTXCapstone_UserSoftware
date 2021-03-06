import logo from './logo.svg';
import './App.css';
import Message from './components/Message'
import KeyboardInput from './components/KeyboardInput'
import OperatorView from './pages/OperatorView/OperatorView';
import { Button, Toolbar, Typography, AppBar, Box } from '@mui/material';
import { fontWeight } from '@mui/system';

function App() {
  return (
    <div className="App">
        <AppBar position="fixed">
          <Toolbar variant="dense" sx={{backgroundColor:"#060028", height: "100%"}}>
            <Typography fontWeight={800}> 
              LISA ROBOT
            </Typography>
            <Button color="inherit" sx={{marginLeft:"auto", fontWeight:"800"}}>
              Settings
            </Button>
          </Toolbar>
        </AppBar>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <OperatorView />
        <Message />
    </div>
  );
}

export default App;
