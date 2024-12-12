import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import SalesInDays from "../components/Modal/SalesInDays";
import axios from "axios";
import { Link, useParams } from "react-router-dom";




const UserDetail = () => {

    const token = localStorage.getItem('access_token')
    const { username } = useParams()
    const [open, setOpen] = React.useState(false);
    const [productQuantity, setProductQuantity] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const getSales = async() => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${username}/sales/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProductQuantity(response.data)
                console.log(response.data)
            } catch(err) {
                console.log('error', err)
            }
            
            
        };
        getSales();
    }, [username]);
    

    useEffect(() => {
        const sum = productQuantity.reduce((accumulator, item) => {
            return accumulator + (item.amount || 0); // Убедитесь, что amount существует и является числом
        }, 0);
          
        setTotalAmount(sum);
    }, [productQuantity]);

    return (
        <>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Детальная информация {username}</h2>
            <Link to={`/cardlist/${username}`}>
                <Button  variant="contained" color="primary" sx={{marginTop: "10px", width: "95%"}}>
                    Показать продажи за последние 30 дней
                </Button>
            </Link>
            
           
            
        
            
            <Button onClick={() => setOpen(true)} variant="contained" color="primary" sx={{marginTop: "10px", width: "95%"}}>
                Расчитать количество всех проданных коржиков
            </Button>
            <SalesInDays totalAmount={totalAmount} username={username} open={open} close={() => setOpen(false)}/>
            <Button variant="contained" color="primary" sx={{marginTop: "10px", width: "95%"}}>
                Расчитать общее количество всего обмена
            </Button>
            <Button variant="contained" color="primary" sx={{marginTop: "10px", width: "95%"}}>
                Расчитать общее количество всего остатка
            </Button>
        </div>
            
        </>
    );
};

export default UserDetail;