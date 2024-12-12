import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "8px"
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
  },
  back: {
     backgroundColor: '#d5e3f7'
  }
});

const CardList = () => {
  const classes = useStyles();
  const { username } = useParams();
  const [cardArray, setCardArray] = useState([])

  console.log(username)
  useEffect(() => {
    const getCards = async () => {
      const token_access = localStorage.getItem('access_token')
      try {
        if (username) {
          const response = await axios.get(`http://127.0.0.1:8000/api/sales/${username}`, {
            headers: {
              Authorization: `Bearer ${token_access}`,
            },
          });
          console.log(response.data)
          
          setCardArray(response.data)
        } else {
          const response = await axios.get('http://127.0.0.1:8000/api/sales/', {
            headers: {
              Authorization: `Bearer ${token_access}`,
            },
          });
          console.log(response.data)
          setCardArray(response.data)
        }
        
      } catch(err) {
        console.log('error' ,err)
      }
      
    }
    getCards();
  }, [])
  

  return (
    <>
    {cardArray.map((card) => (
      <Card key={card.id} className={classes.root} variant="outlined">
        <CardContent className={classes.back}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            План за {card.date}
          </Typography>
          <Typography>
            Принято - {card.amount}
          </Typography>
          <Divider style={{ backgroundColor: 'gray', margin: '8px 0' }} />
          <Typography>
            Продано - {card.sold}
          </Typography>
          <Divider style={{ backgroundColor: 'gray', margin: '8px 0' }} />
          <Typography>
            Обмен - {card.exchange}
          </Typography>
          <Divider style={{ backgroundColor: 'gray', margin: '8px 0' }} />
          <Typography>
            Остаток - {card.remainder}
          </Typography>
        </CardContent>
      </Card>
    ))}
    
    </>
  );
};

export default CardList;
