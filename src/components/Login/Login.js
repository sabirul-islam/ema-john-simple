import React, { useContext } from 'react';
import { useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLogInFrameWork } from './logInManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLogInFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
  
const signOut = () => {
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}
  



 
  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
    
    }
    if (!newUser && user.email && user.password) {
      
    }
    event.preventDefault();
  }

  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPassWordValid = event.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value)
      isFieldValid = isPassWordValid && isPasswordHasNumber;
    }
    if (isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : 
        <button onClick={googleSignIn}>Sign In</button>
      }
      <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignedIn && 
        <div>
        <img src={user.photo} alt=""/>
        <h2>Welcome {user.name}</h2>
        <h4>Your Email: {user.email}</h4>
        </div>
      }

      <h1>Our Own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Email: {user.password}</p> */}
      
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
      {newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Your Name' required/>}<br/>
      <input type="text" onBlur={handleBlur} placeholder='Your email' name="email" id="" required/><br/>
      <input type="password" onBlur={handleBlur} placeholder='Your Password' name="password" id="" required/><br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>{newUser ? 'User Created Successfully.' : 'User loggeded In Successfully.'}</p>}
      
    </div>
  );
}

export default Login;
