import './container/CustomerList';
import Login from './container/Login';
import CustomerList from './container/CustomerList';
import './App.css'
import { useState } from 'react';
function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const handleToken = (token) => {
    setToken(token);
  }
  const deleteToken = () => {
    setToken(null);
  }
  return (
    <div>
      <header className="app-header">
        <h1>Banco Autofin</h1>
      </header>
      <div className="content"> 
        {token === null ? (<Login handleToken={handleToken}/>) : (<CustomerList deleteToken={deleteToken} token={token}/>)}
      </div>
      
    </div>
  );
}

export default App;
