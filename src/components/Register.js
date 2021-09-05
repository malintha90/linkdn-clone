import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import '../styles/login.css'
import { register } from '../actions/userAction';
import Home from './Home';

const Register = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const registerUser = (e) => {
        e.preventDefault();
        dispatch(register(email,password,name));
    }

    return (
        
        <div className="login">
            {
                !Object.keys(user).length ? (<Redirect to="/register"/>):(<Redirect to="/"/>)
            }
        <form >
            <input placeholder="Full name" type="text" value={name} onChange={e => setName(e.target.value)}/>
            <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit" onClick={registerUser}>Register</button>
        </form>
        <Link to="/" className="login__register">SignIn</Link>
      </div>
    )
}

export default Register
