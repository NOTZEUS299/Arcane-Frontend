import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { orderData, ProductData } from "../../helper/Jotai";
import "./order.css";
import mainLogo from "../../images/mainlogo.png";
import {
  axiosIntance as axios,
  generatePublicUrl,
} from "../../MyComponents/Base-Url/AxiosInstance";
import visaLogo from "../../images/card background/visaLogo.png";
import cheapSticker from "../../images/card background/cheapSticker.jpg";
import { BiRupee } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import emailjs from "emailjs-com";

const userData = JSON.parse(localStorage.getItem("userData"));

const Order = () => {
  const [order] = useAtom(orderData);
  const [productData] = useAtom(ProductData);
  const [address, setAddress] = useState();
  const [card, setCard] = useState(false);
  const [shipping, setShipping] = useState();
  const [payment, setPayment] = useState();
  const [summary, setSummary] = useState({ show: false, exit: false });
  const [mailSent, setMailSent] = useState(false);

  // /^\d+$/

  const total = order[2]?.total;

  function sendInvoice(response) {
    console.log("sending invoice...", response);
    emailjs
      .send(
        "service_pq6xzfn",
        "template_409i3qh",
        {
          to_name: `${userData?.firstName}`,
          order: `${response?._id}`,
          invoice: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                crossorigin="anonymous"
              />
            </head>
            <body style="background-color: #fff">
              <div class="container -bs-body-color">
                <img
                  src="https://i.ibb.co/jrj5WYy/mainlogo.png"
                  style="width: 50%; margin: 2.5% 25%"
                  class="img-fluid"
                  alt="..."
                />
                <div
                  class="container-sm"
                  style="
                    background-color: #353535;
                    height: 7rem;
                    color: #fff;
                    padding: 2% 0 0 5%;
                  "
                >
                  <h1>Thank you for your order</h1>
                </div>
                <div
                  class="container-sm"
                  style="
                    background-color: #fff;
                    color: #353535;
                    padding: 2% 0 2% 5%;
                    margin-bottom: 5%;
                  "
                >
                  <p>Hi ${address[shipping]?.name}</p>
                  <p>
                    Just to let you know — we've received your order #${
                      response?._id
                    }, and it is now
                    being processed:
                  </p>
                  ${
                    response?.paymentType === "cod" &&
                    `<p>Pay with cash upon delivery.</p>`
                  }
                  <h3>[Order #${response?._id}] (${response?.createdAt})</h3>
                  <div
                    class="container-sm"
                    style="
                      background-color: #fff;
                      color: #353535;
                      padding: 1% 5% 1% 0;
                    "
                  >
                    <table style="width: 100%; color: #e0e0e0; border-collapse: collapse;">
                      <thead style="background: #353535;border:1px solid #353535">
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </thead>
                      <tbody>
                        ${order[0]?.itemArray?.map((x, i) => {
                          const summaryData = productData?.filter((j) => {
                            return x?.productId === j?._id;
                          });
                          return `<tr key={i}>
                              <td
                                style="
                    color: #353535;
                    border: 0.5px solid #353535;
                    background: #fff;
                  "
                              >${summaryData[0]?.name}</td>
                              <td
                                style="
                    color: #353535;
                    border: 0.5px solid #353535;
                    background: #fff;
                  "
                              >
                              ${x?.purchasedQty}
                              </td>
                              <td
                                style="
                    color: #353535;
                    border: 0.5px solid #353535;
                    background: #fff;
                  "
                              >
                              ${x?.payablePrice}
                              </td>
                            </tr>`
                        })}
                        <tr>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                            colspan="2"
                          >
                          Subtotal:
                          </td>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                          >
                          ${total}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                            colspan="2"
                          >
                          Charges:
                          </td>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                          >
                          40
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                            colspan="2"
                          >
                          Offers(Applied):
                          </td>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                          >
                          -40
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                            colspan="2"
                          >
                          Payment method:
                          </td>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                          >
                          ${response?.paymentType}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              color: #353535;
                              border: 0.5px solid #353535;
                              background: #fff;
                            "
                            colspan="2"
                          >
                          Total:
                          </td>
                          <td
                            style="
                              color: #000;
                              border: 0.5px solid #353535;
                              background: #fff;
                              border-top: 1px solid #353535;
                              font-weight: 700;
                            "
                          >
                          ${total}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 style="margin-top: 4%">Billing address</h3>
                    <div
                      class="container"
                      style="margin-top: 2%; border: 1px solid #353535"
                    >
                    <section>${address[shipping]?.name}</section>
                              <section>
                                <span>${address[shipping]?.address},</span>
                                <span>${address[shipping]?.locality}</span>
                              </section>
                              <section>
                                <span>${
                                  address[shipping]?.cityDistrictTown
                                } ,</span>
                                <span>${address[shipping]?.state} </span>
                                <span>${address[shipping]?.pinCode}</span>
                              </section>
                              India
                              <section>
                                Phone :<span>${
                                  address[shipping]?.mobileNumber
                                },</span>
                                <span> ${
                                  address[shipping]?.alternatePhone
                                }</span>
                              </section>
                              <section>${
                                address[shipping]?.addressType
                              }</section>
                    </div>
                    <p style="margin-top: 2%">Thanks for using (Arcane link)</p>
                  </div>
                </div>
              </div>
            </body>
          </html>`,
          email: `${userData?.email}`,
        },
        "iJqkn25W7jqG6XimK"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMailSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const handleAddOrder = () => {
    const payload = {
      totalAmount: total,
      items: order[0]?.itemArray,
      paymentStatus: "completed",
      paymentType: payment,
      addressId: address[shipping]?._id,
    };
    axios.post("/addOrder", payload).then((x) => {
      console.log(x);
      sendInvoice(x?.data?.order);
    });
  };

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
        <div className="checkout-process-range">
          <div
            className="squares-for-process-validation"
            id="square-one-for-address"
          >
            <h3 className="h3-for-processing-square">
              {shipping !== undefined ? <BsFillPatchCheckFill /> : "1"}
            </h3>
          </div>
          <div
            className="div-showing-range-between-squares"
            id="range-from-add-to-payment"
          >
            <div
              id={shipping !== undefined ? "connect-squares-with-range" : ""}
            ></div>
          </div>
          <div
            className="squares-for-process-validation"
            id="square-two-for-payment"
          >
            <h3 className="h3-for-processing-square">
              {payment !== undefined ? <BsFillPatchCheckFill /> : "2"}
            </h3>
          </div>
          <div
            className="div-showing-range-between-squares"
            id="range-from-payment-to-confirmation"
          >
            <div
              id={payment !== undefined ? "connect-squares-with-range" : ""}
            ></div>
          </div>
          <div
            className="squares-for-process-validation"
            id="square-three-for-confirmation"
          >
            <h3 className="h3-for-processing-square">
              {mailSent ? <BsFillPatchCheckFill /> : "3"}
            </h3>
          </div>
        </div>
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
                              onChange={(e) => {
                                setShipping(i);
                              }}
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
                  setPayment("card");
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
                  setPayment("cod");
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
                        <input type="text" defaultValue={"darshan patel"} />
                      </div>
                      <div className="card-expiry-cardFront">
                        <h6>EXPIRES</h6>
                        <div className="exp-input-field">
                          <input type="text" defaultValue={"12"} />/
                          <input type="text" defaultValue={"25"} />
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
                <div className="card-payment-intructions">
                  (*This is jus for showcase.)
                </div>
              </div>
            )}
          </div>
          <div className="checkout-order-status">
            <div className="order-status-div-heading">
              <h3>3 Items and delivery</h3>
            </div>
            <div className="order-status-view-div">
              <p style={{ padding: "0 9rem" }}>
                Your order is expected to delivered within in 7 days, place your
                order to confirm.
              </p>
              {shipping !== undefined && (
                <p>
                  shipping to {address[shipping]?.name},{" "}
                  {address[shipping]?.address},{" "}
                  {address[shipping]?.cityDistrictTown},{" "}
                  {address[shipping]?.state}.
                </p>
              )}
              <p>Stay tuned with our latest collections and discounts.</p>
            </div>
          </div>
        </div>
        <div className="checkout-order-summary">
          <div className="order-summary-heading">
            <h2>Bill:</h2>
          </div>
          <div className="items-summary">
            <p>
              <span
                onClick={() => {
                  summary?.show
                    ? setSummary({ ...summary, exit: true, show: true }) ||
                      setTimeout(() => {
                        setSummary({ ...summary, show: false, exit: false });
                      }, 1000)
                    : setSummary({ ...summary, exit: false, show: true });
                }}
                className={`summary-div-active-${summary?.show}`}
              >
                order ({order[0]?.itemArray?.length} item):
              </span>
              <span className="left-side-of-order-summary">
                <BiRupee className="rupee-symbol-order-page" />
                {total}
              </span>
            </p>
          </div>
          {summary?.show && (
            <div
              className="summary-product-main-container"
              id={`summary-exit-${summary?.exit}`}
              style={
                order[0].itemArray.length < 3
                  ? { height: `${order[0].itemArray.length * 10}rem` }
                  : { height: "20rem", overflowY: "scroll" }
              }
            >
              {summary?.show &&
                order[0]?.itemArray?.map((x, i) => {
                  const summaryData = productData?.filter((j) => {
                    return x?.productId === j?._id;
                  });
                  console.log(summaryData);
                  return (
                    <div className="summary-product-container" key={i}>
                      <div className="summary-product-image-container">
                        <img
                          src={generatePublicUrl(
                            summaryData[0]?.productPictures[0]?.img
                          )}
                          alt=""
                          className="summary-product-image"
                        />
                      </div>
                      <div className="summary-product-content">
                        <h5 className="summary-product-name">
                          {summaryData[0]?.name}
                        </h5>
                        <p className="summary-product-quantity">
                          quantity: {x?.purchasedQty}
                        </p>
                        <p className="summary-product-totalAmount">
                          payable:{" "}
                          <BiRupee className="rupee-symbol-for-summary-product" />
                          <span className="product-price-for-summary-product">
                            {x?.payablePrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="order-bill">
            <p>
              <span>charges:</span>
              <span className="left-side-of-order-summary">
                <BiRupee className="rupee-symbol-order-page" />
                40
              </span>
            </p>
            <p>
              <span>offers (applicable):</span>
              <span className="left-side-of-order-summary">
                <BiRupee className="rupee-symbol-order-page" />
                -40
              </span>
            </p>
            <p>
              <span>to pay:</span>
              <span className="left-side-of-order-summary" id="total-to-pay">
                <BiRupee className="rupee-symbol-order-page" />
                {total}
              </span>
            </p>
          </div>
          <div className="place-order-btn-checkoutPage">
            <button onClick={() => handleAddOrder()}>Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
