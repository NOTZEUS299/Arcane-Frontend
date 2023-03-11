import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { orderData } from "../../helper/Jotai";
import "./order.css";
import mainLogo from "../../images/mainlogo.png";
import { axiosIntance as axios } from "../../MyComponents/Base-Url/AxiosInstance";
import visaLogo from "../../images/card background/visaLogo.png";
import cheapSticker from "../../images/card background/cheapSticker.jpg";

const Order = () => {
  const [order] = useAtom(orderData);
  const [address, setAddress] = useState();
  const [card, setCard] = useState(false);

  // /^\d+$/

  useEffect(() => {
    axios.get("/user/getaddress").then((x) => {
      setAddress(x?.data?.userAddress?.address);
    });
  }, []);

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
              <div
                id={`card-button-${card}`}
                onClick={() => {
                  setCard(true);
                }}
              >
                <button
                  className="select-payment-hover-effect"
                  id={`disabling-hover-effect-${card}`}
                >
                  CARD
                </button>
              </div>
              <div
                onClick={() => {
                  setCard(false);
                }}
              >
                <button className="select-payment-hover-effect">COD</button>
              </div>
            </div>
            {card && (
              <div className="card-payment-div-container">
                <div className="card-showcase-div">
                  <div className="card-front-showcase">
                    <div className="visa-logo-for-frontCard">
                      <div className="chip-sticker-cardFront">
                        <img src={cheapSticker} alt="" />
                      </div>
                      <div className="visa-logo-cardFront">
                        <img src={visaLogo} alt="" />
                      </div>
                      <div className="card-number-cardFront">
                        <input type="text" defaultValue={"4029"} />
                        <input type="text" defaultValue={"8511"} />
                        <input type="text" defaultValue={"0786"} />
                        <input type="text" defaultValue={"9591"} />
                      </div>
                      <div className="card-holder-cardFront">
                        <h6>CARD HOLDER</h6>
                        <input type="text"  defaultValue={"darshan patel"}  />
                      </div>
                      <div className="card-expiry-cardFront">
                        <h6>EXPIRES</h6>
                        <div className="exp-input-field">
                          <input type="text" defaultValue={"12"} />/<input type="text" defaultValue={"25"} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-back-showcase">
                    <div className="card-magneticLine-cardBack"></div>
                    <div className="card__secret">
                      <p className="card__secret--last" contentEditable={false}>
                        420
                      </p>
                    </div>
                    <div className="chip-sticker-cardBack">
                      <img src={cheapSticker} alt="" />
                    </div>
                    <div className="visa-logo-cardBack">
                      <img src={visaLogo} alt="" />
                    </div>
                  </div>
                </div>
                <div className="card-payment-intructions">(*This is jus for showcase.)</div>
              </div>
            )}
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
