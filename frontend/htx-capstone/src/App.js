import logo from './logo.svg';
import './App.css';
import Message from './components/Message'
import KeyboardInput from './components/KeyboardInput'
import OperatorView from './pages/OperatorView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <OperatorView />
        <Message />
        <KeyboardInput />
      </header>
    </div>
  );
}

export default App;
