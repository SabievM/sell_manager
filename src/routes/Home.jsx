import React, { useEffect } from "react"
import { makeStyles } from "@mui/styles"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import CalculateIcon from "@mui/icons-material/Calculate"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import Divider from "@mui/material/Divider"
import { Link } from "react-router-dom"
import NotRegister from "../components/NotRegister"
import AdminPage from "../components/AdminPage"
import axios from "axios"
import { useState } from "react"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        margin: "auto",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    center: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        height: "100vh",
    },
}))

const Home = () => {
    const classes = useStyles()

    const access_token = localStorage.getItem("access_token")

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem("access_token")
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/status/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setIsAdmin(response.data.status)
            } catch (err) {
                console.log("error", err)
            }
        }
        getUsers() 
    }, [])
   
    return (
        <div>
            {isAdmin ? (
                <AdminPage />
            ) : (
                <div className={classes.center}>
                    {!access_token ? (
                        <NotRegister />
                    ) : (
                        <List className={classes.root}>
                            <Link
                                to="cardlist"
                                className={classes.link}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CalendarMonthIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText primary="Показать за последний месяц" />
                                </ListItem>
                            </Link>

                            <Divider
                                variant="inset"
                                component="li"
                            />

                            <Link className={classes.link}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CalculateIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Расчитать за последний месяц" />
                                </ListItem>
                            </Link>

                            <Divider
                                variant="inset"
                                component="li"
                            />

                            <Link className={classes.link}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <TrendingUpIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Динамика продаж по месяцам" />
                                </ListItem>
                            </Link>
                        </List>
                    )}

                </div>
            )}
        </div>
    )
}

export default Home
