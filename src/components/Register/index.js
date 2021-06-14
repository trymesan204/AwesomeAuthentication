import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import './Register.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import {useHistory } from 'react-router-dom';
import Error from '../Error';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Register = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errText, setErrText] = useState('');
    const [err, setErr] = useState(false);
    const [open, setOpen] = useState(false);

    const checkEmailValidity = () => {
        if (validator.isEmail(email)){
            return true;
        }else{
            return false;
        }
    }

    const checkUserExist = () => {
        if (localStorage.getItem(email)){
            return false;
        }else{
            return true;
        }
    }

    const checkPasswordValidity = () => {
        if (/\d/.test(password) && password.match(/[a-z]/i) && password.length >= 8){
            return true;
        }else{
            return false;
        }
    }

    const checkConfirmPasswordValidity = () => {
        if (password === confirmPassword ){
            return true;
        }else{
            return false;
        }
    }

    const CheckValidity = (e) => {
        e.preventDefault();

        if( checkEmailValidity() && checkUserExist() && checkPasswordValidity() && checkConfirmPasswordValidity() ){
            localStorage.setItem(email, password);
            setTimeout( () => {
                history.push('./login');
            }, 2000);
            setOpen(true);
        }else{
            if( ! checkEmailValidity() ){
                setErrText('invalid email');
                setErr(true);
            }else if ( ! checkPasswordValidity() ){
                setErrText('Password must contain at least one number and one alphabet');
                setErr(true);
            }else if (! checkConfirmPasswordValidity()){
                setErr(true);
                setErrText('password not matched');    
            }else if (! checkUserExist()){
                setErrText('user already exist');
                setErr(true);
            }
        }
    }

    const hideSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    return(
        <div class='whole-document'>
            <div class='content-wrapper'>
                <Card>
                    <div class='title '>OKHATI Register</div>
                    <form onSubmit={CheckValidity} class='input' noValidate autoComplete="off">
                        <div class='input'> <TextField value={email} onChange={ (e) => setEmail(e.target.value) } id="outlined-basic" label="Email" variant="outlined" /> </div>
                        <div class='input'> <TextField type='password' value={password} onChange={ (e) => setPassword(e.target.value) } id="outlined-basic" label="Password" variant="outlined" /> </div>
                        <div class='input'> <TextField type='password' value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) } id="outlined-basic" label="Confirm Password" variant="outlined" /> </div>
                        <div class='button2'> <Button type='submit' onClick={CheckValidity} variant='contained' color='primary' >Register</Button></div>
                        <Error errorText={errText} error={err}/>
                    </form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={hideSnackbar} >
                        <Alert severity="success" onClose={hideSnackbar}>
                            User Registered Successfully
                        </Alert>
                    </Snackbar>
                </Card>
            </div>
        </div>
    )
}

export default Register;