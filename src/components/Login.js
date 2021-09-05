import React, { useState } from 'react'
import '../styles/login.css'
import {signInAPI, signIn} from '../actions/userAction';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const loginApp = (e) => {
        e.preventDefault();
        dispatch(signInAPI())
        
    }
    const loginManually = (e) => {
        e.preventDefault()
        dispatch(signIn(email,password))
    }

    return (
        <div className="login">
            <form >
                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit" onClick={loginManually}>SignIn</button>
            </form>
            <Link to="/register" className="login__register">Not Member <span>Register Now</span></Link>
            <button type="submit" onClick={loginApp} className="logingoogle"><span className='googleText'>SignIn With Google</span></button>
        </div>
    )
}

export default Login
