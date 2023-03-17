import React, { useEffect, useRef, useState } from "react";
import "./orders.css"
import { Header } from "../../../Header";
import { axiosIntance as axios } from "../../Base-Url/AxiosInstance"

export const Orders = () => {
    const [userOrders, setUserOrders] = useState()

    useEffect(() => {
        axios.get("/getOrders").then((x) => {
            console.log(x?.data?.orders);
            setUserOrders(x?.data?.orders)
        })
    }, [])

  return <div className="orders-main-container">
    <Header/>
    <div className="fake-space-div orders-page"></div>
    <div className="orders-content-container">
    {userOrders?.map((x,i) => {
        return <div key={i}>
            
        </div>
    })}
    </div>
  </div>;
};

export default Orders;
