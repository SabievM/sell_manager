import axios from "axios"

import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { makeStyles } from "@mui/styles"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 15
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
        
    },
    pos: {
        marginBottom: 12,
    },
})

const AdminPage = () => {
    
    const token = localStorage.getItem("access_token")

    const classes = useStyles();
    
    const [usersList, setUsersList] = useState([]);


    const [data, setData] = useState({})
    const [selectedButton, setSelectedButton] = useState(null);


    const getfullPayment = async() => {
        const response = await axios.get('http://127.0.0.1:8000/api/allsales/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        })
        setData(response.data)
    };


    const handleButtonClick = (button) => {
        if (selectedButton === button) {
            setSelectedButton(null); 
        } else {
            setSelectedButton(button); 
        }
    };

    useEffect(() => {
        getfullPayment(); 
    }, [token]);
  

   

    const getUsers = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/user/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setUsersList(response.data)
        } catch (err) {
            console.log("error", err)
        }
    }

    const hiddenUserList = () => {
        setUsersList([])
    }

    return (
        <div>

            {usersList.map((user) => 
                <Card key={user.id} className={classes.root}>
                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Водитель
                        </Typography>
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            {user.username}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/userdetail/${user.username}`}><Button size="small">Показать всю информацию</Button></Link>
                    </CardActions>
                </Card>
            )}
            {usersList.length === 0 ? (
                <Button onClick={getUsers} variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                    Показать всех пользователей
                </Button>
            ) : (
                <Button onClick={hiddenUserList} variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                    Скрыть всех пользователей
                </Button>
            )}

            {usersList.length > 0 ? '' : (
                <>
             
                    <Button onClick={() => handleButtonClick('totalAmount')} variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать общее колчиство произведенных коржиков 
                    </Button> 
                    {selectedButton === 'totalAmount' && (
                        <div>Кол-во: {data.total_amount}</div>
                    )}                  
                    
                    <Button onClick={() => handleButtonClick('totalRemainder')} variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать общее колчиство остатка
                    </Button>
                    {selectedButton === 'totalRemainder' && (
                        <div>Кол-во: {data.total_remainder}</div>
                    )}
                    
                    <Button onClick={() => handleButtonClick('totalRevenue')} variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать сумму всех продаж
                    </Button>
                    {selectedButton === 'totalRevenue' && (
                        <div>Сумма: {data.total_revenue}</div>
                    )}

                    <Button variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать сумму всего остатка
                    </Button>

                    <Button variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать сумму всего обмена
                    </Button>

                    <Button variant="contained" color="primary" sx={{marginTop: "10px", width: "100%"}}>
                        Расчитать чистую прибыль
                    </Button>
                </>
            )}
            
            
            
        </div>
    )
}

export default AdminPage;
