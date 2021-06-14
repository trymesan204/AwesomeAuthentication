import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';
import { useState} from 'react';
import validator from 'validator';
import {useHistory} from 'react-router-dom';
import Error from '../Error';

const Login = ({setToken}) => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [error, setError] = useState(false);

    const checkValidity = (e) => {
        e.preventDefault();
        if(!validator.isEmail(email)){
            setError(true);
            setErrorText('Invalid Email')
            return;
        }

        const storedEmail = localStorage.getItem(email);
        if(storedEmail === null){
            setError(true);
            setErrorText('User does not exist');
            return;
        }

        if (storedEmail !== password){
            setError(true);
            setErrorText('Incorrect Password');
            return;
        }

        if(storedEmail === password){
            setToken(true);
            history.push('/authenticated');
        }
    }

    return(
        <div class='whole-document'>
            <div class='content-wrapper'>
                <Card>
                    <div class='content-center'>
                        <div class='title '>OKHATI LOGIN</div>
                        <form onSubmit={checkValidity} class='input' noValidate autoComplete="off">
                            <div class='input'> <TextField value={email} onChange={ (e) => setEmail(e.target.value) } id="outlined-basic" label="Email" variant="outlined" /> </div>
                            <div class='input'> <TextField type='password' value={password} onChange={ (e) => setPassword(e.target.value) } id="outlined-basic" label="Password" variant="outlined" /> </div>
                            <div class='button'> <Button type='submit' onClick={checkValidity} variant='contained' color='primary' >Login</Button></div>
                            <Error errorText={errorText} error={error} />
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login;