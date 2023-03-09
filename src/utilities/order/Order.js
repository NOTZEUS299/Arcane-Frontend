import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { orderData } from "../../helper/Jotai";
import "./order.css";
import mainLogo from "../../images/mainlogo.png";
import { axiosIntance as axios } from "../../MyComponents/Base-Url/AxiosInstance";

const Order = () => {
  const [order] = useAtom(orderData);
  const [address, setAddress] = useState();

  useEffect(() => {
    axios.get("/user/getaddress").then((x) => {
      setAddress(x?.data?.userAddress?.address);
    });
  }, []);

  console.log(address);

  return (
    <div className="order-page-main-container">
      <div className="checkout-header">
        <h1>{JSON.parse(localStorage?.getItem("userData")).firstName}</h1>
        <img src={mainLogo} alt="" />
        <h1>
          Checkout
          <div className="checkout-order-hover-div">
            {order[0]?.itemArray?.length < 2 ? (
              <div>{`${order[0]?.itemArray?.length} item`}</div>
            ) : (
              <div>{`${order[0]?.itemArray?.length} items`}</div>
            )}
          </div>
        </h1>
      </div>
      <div className="checkout-page-container">
        <div className="checkout-process-range">df</div>
        <div className="checkout-process-panel">
          <div className="checkout-address-container">
            <div className="address-select-div-heading">
              <h3>1 Delivery address</h3>
            </div>
            <div className="addresses-list-select-div">
              {address === undefined ? (
                <div></div>
              ) : (
                <div>
                  {address.length > 0 &&
                    address.map((x, i) => {
                      return (
                        <div className="address-field-addresses" key={i}>
                          <div className="address-check-button">
                            <input
                              type={"radio"}
                              name="select-Address"
                              className="select-address-input-field-radio"
                              id={`${x?._id}`}
                            />
                          </div>
                          <div className="address-content-div">
                            <label htmlFor={`${x?._id}`}>
                              <section>{x?.name}</section>
                              <section>
                                <span>{x?.address},</span>
                                <span>{x?.locality}</span>
                              </section>
                              <section>
                                <span>{x?.cityDistrictTown} ,</span>
                                <span>{x?.state} </span>
                                <span>{x?.pinCode}</span>
                              </section>
                              India
                              <section>
                                Phone :<span>{x?.mobileNumber},</span>
                                <span> {x?.alternatePhone}</span>
                              </section>
                              <section>{x?.addressType}</section>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div className="checkout-payment-method-container">
            <div className="payment-select-div-heading">
              <h3>2 Select payment method</h3>
            </div>
            <div className="payment-type-select-div">
              <div>
                <button className="select-payment-hover-effect">CARD</button>
              </div>
              <div>
                <button className="select-payment-hover-effect">COD</button>
              </div>
            </div>
          </div>
          <div className="checkout-order-status">
            <div className="order-status-div-heading">
              <h3>3 Items and delivery</h3>
            </div>
            <div className="order-status-view-div"></div>
          </div>
        </div>
        <div className="checkout-order-summary">cv</div>
      </div>
    </div>
  );
};

export default Order;
