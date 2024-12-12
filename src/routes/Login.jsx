import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const auth = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            username,
            email,
            password
        })
        const {access, refresh} = response.data
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/')

        console.log(response)
    }
    catch (err) {
        console.log('error', err)
        navigate('/')
    };
    
    
  };





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войдите в свой аккаунт
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Фамилия Имя"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Почта"
            name="email"
            autoComplete="email"
       
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            onClick={(e) => auth(e)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}

export default Login;