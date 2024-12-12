import './App.css';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './routes/Home';

import Header from './components/Header'
import CardList from './routes/CardList';
import AddCard from './routes/AddCard';
import UserDetail from "./routes/UserDetail"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Register />} />
          
          <Route path='cardlist/' element={<CardList />} />

          <Route path='cardlist/:username?' element={<CardList />} />
          
          <Route path='addcard/' element={<AddCard />} />
          <Route path='userdetail/:username/' element={<UserDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
      

    
  );
}

export default App;
