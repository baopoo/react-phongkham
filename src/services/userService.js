import axios from '../axios'

const handleLogin = (userEmail, usePassword) =>{
    return axios.post('/api/login', {email: userEmail, password:usePassword});
}

export {handleLogin}