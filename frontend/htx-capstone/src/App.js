import logo from './logo.svg';
import './App.css';
import Message from './components/Message'
import KeyboardInput from './components/KeyboardInput'
import OperatorView from './pages/OperatorView/OperatorView';

function App() {
  return (
    <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <OperatorView />
        <Message />
        <KeyboardInput />
    </div>
  );
}

export default App;
