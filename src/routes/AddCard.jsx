import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ru } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';



const useStyles = makeStyles({
    root: {
      marginTop: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    },
    input: {
        minWidth: "40px",
        width: "100%",
    }
  });

const AddCard = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  const [amount, setAmount] = useState();
  const [sold, setSold] = useState();
  const [exchange, setExchange] = useState();
  const [remainder, setRemainder] = useState();
  const token_access = localStorage.getItem('access_token')

  

  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const submit = async() => {
    const saleData = {
      "name": "Коржики",
      "date": "2024-10-12",
      "amount": amount, 
      "sold": sold, 
      "exchange": exchange,
      "remainder": remainder
    }
    console.log(saleData)
    try {
      await axios.post('http://127.0.0.1:8000/api/sales/create/', saleData, {
        headers: {
          Authorization: `Bearer ${token_access}`,
        }
      })
      setAmount();
      setSold();
      setExchange();
      setRemainder();
      navigate('/cardlist')
    } catch(err) {
      console.log('Ошибка при добавлении продажи:', err.response ? err.response.data : err.message);
    } 
  } 


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
        <Box sx={{marginBottom:"10px", display:"flex", justifyContent:"center"}}>
          <DatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="yyy-mm-dd"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Box>
        
      </LocalizationProvider>
      
      <TextField onChange={(e) => setAmount(e.target.value)} value={amount} id="standard-basic" label="Принято*" className={classes.input} sx={{ marginBottom: "10px" }}/>
      <TextField onChange={(e) => setSold(e.target.value)} value={sold} id="standard-basic" label="Продано*" className={classes.input} sx={{ marginBottom: "10px" }}/>
      <TextField onChange={(e) => setExchange(e.target.value)} value={exchange} id="standard-basic" label="Обмен*" className={classes.input} sx={{ marginBottom: "10px" }}/>
      <TextField onChange={(e) => setRemainder(e.target.value)} value={remainder} id="standard-basic" label="Остаток*" className={classes.input} sx={{ marginBottom: "10px" }}/>
      <Button onClick={() => submit()} sx={{width:"100%"}} variant="contained">Добавить</Button>
    </form>
  );
};

export default AddCard;