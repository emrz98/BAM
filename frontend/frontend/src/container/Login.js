import react from 'react';
import { useState } from 'react';
import './Login.css';
import Database from '../API';

function Login(props){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUser = (event)=> {
        setUser(event.target.value);
    }
    
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleAuthentication = (token) => {
        sessionStorage.setItem('token', token);
        props.handleToken(token);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Database.authenticate(user, password, handleAuthentication);
    }
    return(
        <div className = "login">
            <form onSubmit={handleSubmit}>
                <div className="item-login">
                    <h2>Log in</h2>
                </div>
                <div className="item-login">
                    <p>User</p>
                    <input type="text" value = {user} onChange = {onChangeUser}/>
                </div>
                <div className="item-login">
                    <p>Password</p>
                    <input type="password" value = {password} onChange = {onChangePassword}/>
                </div>
                <div className="item-login">
                    <input type="submit" value={"Login"}/>
                </div>
            </form>
        </div>

    );
}

export default Login;