import React, { useEffect, useState } from "react";
import "./orders.css";
import { Header } from "../../../Header";
import {
  axiosIntance as axios,
  generatePublicUrl,
} from "../../Base-Url/AxiosInstance";
import { BsCardChecklist, BsBagCheck, BsTruck } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [userOrders, setUserOrders] = useState();
  const [orderData, setOrderData] = useState({
    setShow: false,
    datesToShow: "",
  });
  const [productData, setProductData] = useState({
    setShow: false,
    data: "",
  });

  const navigate = useNavigate();

  const handleOnHover = (orderStatus) => {
    setOrderData({ ...orderData, setShow: true, datesToShow: orderStatus });
  };

  const handleProductHover = (pData) => {
    setProductData({ ...productData, setShow: true, data: pData });
  };

  const handleOnPointerOut = () => {
    setOrderData({
      setShow: false,
      datesToShow: "",
    });
    setProductData({
      setShow: false,
      data: "",
    });
  };

  const viewProduct = (id) => {
    navigate({
      pathname: `/product/${id}`,
    });
  };

  useEffect(() => {
    axios.get("/getOrders").then((x) => {
      setUserOrders(x?.data?.orders);
    });
  }, []);

  console.log(productData);

  return (
    <div className="orders-main-container">
      <Header />
      <div className="fake-space-div orders-page"></div>
      <div className="orders-content-container">
        <div>
          <h1 className="order-page-heading">Orders</h1>
          {userOrders?.map((x, i) => {
            const iconOne = x?.orderStatus[0]?.isCompleted;
            const statusOne = x?.orderStatus[1]?.isCompleted;
            const iconTwo = x?.orderStatus[1]?.isCompleted;
            const statusTwo = x?.orderStatus[2]?.isCompleted;
            const iconThree = x?.orderStatus[2]?.isCompleted;
            const statusThree = x?.orderStatus[3]?.isCompleted;
            const iconFour = x?.orderStatus[3]?.isCompleted;
            const iconColour = "green";
            return (
              <div
                key={i}
                className="orders-card-container"
                onMouseOver={() => handleOnHover(x?.orderStatus)}
                onMouseOut={() => handleOnPointerOut()}
              >
                <div className="order-card-heading">
                  <div>
                    <h3>Order ID:</h3>
                    <p>{x?._id}</p>
                  </div>
                  <div>
                    <div className="Tracker">
                      <div className="ordered">
                        <BsCardChecklist
                          style={{
                            transition: "all 0.3s",
                            opacity: 1,
                            color: iconOne ? iconColour : "",
                          }}
                        />
                      </div>
                      <div className="order-status-bar">
                        <div className="status-line"></div>
                        {statusOne && <div className="Green-status-line"></div>}
                      </div>
                      <div className="packed">
                        <BsBagCheck
                          style={{
                            transition: "all 0.3s",
                            opacity: 1,
                            color: iconTwo ? iconColour : "",
                          }}
                        />
                      </div>
                      <div className="order-status-bar">
                        <div className="status-line"></div>
                        {statusTwo && (
                          <div
                            className="Green-status-line"
                            style={{ animationDelay: "0.3s" }}
                          ></div>
                        )}
                      </div>
                      <div className="shipped">
                        <BsTruck
                          style={{
                            transition: "all 0.3s",
                            opacity: 1,
                            color: iconThree ? iconColour : "",
                          }}
                        />
                      </div>
                      <div className="order-status-bar">
                        <div className="status-line"></div>
                        {statusThree && (
                          <div
                            className="Green-status-line"
                            style={{ animationDelay: "0.6s" }}
                          ></div>
                        )}
                      </div>
                      <div className="delivered">
                        <GoPackage
                          style={{
                            transition: "all 0.3s",
                            opacity: 1,
                            color: iconFour ? iconColour : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3>Ordered on:</h3>
                    <p>
                      {moment(x?.orderStatus[0]?.date).format(
                        "Do MMMM YY, h:mm a"
                      )}
                    </p>
                  </div>
                </div>
                <div className="order-card-image-main-container">
                  {x?.items.map((j, k) => {
                    return (
                      <div
                        key={k}
                        className="images-container"
                        style={{ left: `${11 * k}rem` }}
                        onMouseOver={() => handleProductHover(j)}
                        onClick={() => viewProduct(j?.productId?._id)}
                      >
                        <img
                          src={generatePublicUrl(
                            j?.productId?.productPictures[0]?.img
                          )}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="side-div-for-details">
          <h1 className="order-details-heading">Order details</h1>
          {orderData?.setShow && (
            <div className="side-div-for-details-content">
              <div className="range-to-show-updated-data">
                <div className="flex-container-to-show-check-and-date">
                  <BsCardChecklist />
                  <h5>
                    {moment(orderData?.datesToShow[0]?.date)?.format(
                      "Do MMMM YY, h:mm a"
                    )}
                  </h5>
                </div>
                <div className="range-container-to-connect-icons">
                  {false && (
                    <div className="green-status-line-for-sub-container"></div>
                  )}
                </div>
                <div className="flex-container-to-show-check-and-date">
                  <BsBagCheck />
                  <h5>
                    {orderData?.datesToShow[1]?.isCompleted
                      ? moment(orderData?.datesToShow[1]?.date)?.format(
                          "Do MMMM YY, h:mm a"
                        )
                      : "Not yet"}
                  </h5>
                </div>
                <div className="range-container-to-connect-icons">
                  {false && (
                    <div className="green-status-line-for-sub-container"></div>
                  )}
                </div>
                <div className="flex-container-to-show-check-and-date">
                  <BsTruck />
                  <h5>
                    {orderData?.datesToShow[2]?.isCompleted
                      ? moment(orderData?.datesToShow[2]?.date)?.format(
                          "Do MMMM YY, h:mm a"
                        )
                      : "Not yet"}
                  </h5>
                </div>
                <div className="range-container-to-connect-icons">
                  {false && (
                    <div className="green-status-line-for-sub-container"></div>
                  )}
                </div>
                <div className="flex-container-to-show-check-and-date">
                  <GoPackage />
                  <h5>
                    {orderData?.datesToShow[3]?.isCompleted
                      ? moment(orderData?.datesToShow[3]?.date)?.format(
                          "Do MMMM YY, h:mm a"
                        )
                      : "Not yet"}
                  </h5>
                </div>
              </div>
              {productData?.setShow && (
                <div className="hovering-product-containers-to-show-details">
                  <h3>Product details</h3>
                  <div className="product-details-image-container">
                    <img
                      src={generatePublicUrl(
                        productData?.data?.productId?.productPictures[0]?.img
                      )}
                      alt=""
                    />
                  </div>
                  <div className="product-details-containers">
                    <p>Price: {productData?.data?.payablePrice}</p>
                    {productData?.data?.productId?.name}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
