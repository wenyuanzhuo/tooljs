import * as React from 'react';
import './App.css';
import Hello, { NameEnum } from './components/Hello'
import logo from './logo.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello name={NameEnum.Guuka} enthusiasmLevel={10}/>
      </div>
    );
  }
}

export default App;
