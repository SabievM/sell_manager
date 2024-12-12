import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'; // Обратите внимание на изменение импорта
import Container from '@mui/material/Container';
import axios from 'axios'


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        "username": username,
        "email": email,
        "password": password
      })
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/login')
    } catch(err) {
      console.log("error", err)
    }
    };
    



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField

                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Фамилия Имя"
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField

                onChange={(e) => setEmail(e.target.value)}
                value={email}

                variant="outlined"
                required
                fullWidth
                id="email"
                label="Почта"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField

                onChange={(e) => setPassword(e.target.value)}
                value={password}


                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
                <div style={{ marginBottom: '10px' }} /> {/* Здесь добавляем отступ */}
            </Grid>
          </Grid>
          <Button

            onClick={(e) => submit(e)}


            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" style={{textDecoration: "none", color: "black", marginTop: "10px"}}>
                Если у вас есть аккаунт, войдите
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;