import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../../../Header";
import {
  axiosIntance as axios,
  generatePublicUrl as imagePath,
} from "../../Base-Url/AxiosInstance";
import { orderData, ProductData } from "../../../helper/Jotai";
import { Loader } from "../../Loader/Loader";
import { BiRupee } from "react-icons/bi";
import { GiBulletImpacts } from "react-icons/gi";
import "./cart.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsFillCaretRightFill } from "react-icons/bs";
import { TbShoppingCartOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const [loader, setLoader] = useState();
  const [productData] = useAtom(ProductData);
  const [cartDetails, setCartDetails] = useState([]);
  const [billDetails, setBillDetails] = useState(false);
  const [functionCall, setfunctionCall] = useState(false);
  const [total, setTotal] = useState(0);
  const [orderArray] = useState([]);
  const [, setOrder] = useAtom(orderData);

  const navigate = useNavigate();

  const removeCartItem = async (id) => {
    const payload = {
      productId: id,
    };
    await axios.post("/user/cart/removeItem", { payload }).then((x) => {
      setfunctionCall(!functionCall);
    });
  };

  const priceTotal = [];

  const handleTotal = async (price, qty) => {
    priceTotal?.push(JSON.parse(price * qty));
    const sum = await priceTotal?.reduce((ttl, num) => {
      return ttl + num;
    });
    setTimeout(() => {
      setTotal(sum);
    }, 1);
  };

  function generateId() {
    const digits = "0123456789";
    let id = "";

    // Generate 10 random digits
    while (id.length < 10) {
      const randomDigit = digits[Math.floor(Math.random() * digits.length)];
      if (id.indexOf(randomDigit) === -1) {
        // Add the digit to the ID if it's not already there
        id += randomDigit;
      }
    }

    return id;
  }

  const handleOrders = async (x) => {
    const navigationId = generateId();

    setLoader(true);

    for (let index = 0; index < cartDetails?.length; index++) {
      const element = cartDetails[index];
      console.log(element);
      orderArray?.push({
        productId: element?._id,
        payablePrice: element?.price * element?.qty,
        purchasedQty: element?.qty,
      });
    }

    setOrder([{ itemArray: orderArray }, { id: navigationId }]);
    navigate(`/pay-select/${navigationId}`);
  };

  const handleOrder = (x) => {
    const navigationId = generateId();

    setLoader(true);

    const itemArray = [
      {
        productId: x?._id,
        payablePrice: x?.price * x?.qty,
        purchasedQty: x?.qty,
      },
    ];
    setOrder([{ itemArray: itemArray }, { id: navigationId }]);
    navigate(`/pay-select/${navigationId}`);
  };

  useEffect(() => {
    setLoader(true);
    axios.get("/user/getCartItems").then((x) => {
      const data = Object.values(x.data.cartItems);
      setCartDetails(data);
    });
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [functionCall]);

  useEffect(() => {
    setLoader(true);
    axios.get("/user/getCartItems").then((x) => {
      const data = Object.values(x.data.cartItems);
      setCartDetails(data);
    });
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <div style={{ background: "#e0e0e0" }}>
      {loader && <Loader />}
      {}
      <Header />
      {cartDetails?.length === 0 && (
        <div className="cart-container-if-data-is-null">
          <h1>
            Empty <TbShoppingCartOff className="empty-cart-icon" />
          </h1>
        </div>
      )}
      <div className="fake-space-div" id="cart-fake-div"></div>
      <div className="cart-main-container">
        <div className="added-products-cards-container">
          <div className="card-header">
            <h1>
              <GiBulletImpacts />
              <GiBulletImpacts />
            </h1>
            <h1>Products</h1>
            <h1>Price</h1>
          </div>
          {!loader &&
            cartDetails?.map((x, i) => {
              const productDetails = productData.filter((p) => {
                return p._id === x._id;
              });
              return (
                <div
                  key={i}
                  className="cart-product-card"
                  onLoad={() => handleTotal(x?.price, x?.qty)}
                >
                  <div>
                    <fieldset className="card-cart-image">
                      <img
                        src={imagePath(
                          productDetails[0]?.productPictures[0]?.img
                        )}
                        alt=""
                      />
                    </fieldset>
                  </div>
                  <div className="cart-card-content">
                    <div className="cart-content-head">
                      <h1>{x.name}</h1>
                      <h1 style={{ position: "relative", fontSize: "1.3rem" }}>
                        <BiRupee className="rupee-symbol-for-price" />
                        {x.price * x.qty}
                      </h1>
                    </div>
                    <h2> Description</h2>
                    <div className="description-content">
                      {productDetails[0]?.description?.description}
                    </div>
                    <div className="stock-left-content">
                      Only <span>{productDetails[0]?.quantity}</span> Pieces
                      Left
                    </div>
                    <h2> Quantity</h2>
                    <select
                      name="product-qauntity"
                      id="cart-card-quantity"
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    >
                      <option value="intial">{x.qty}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <div className="cart-content-buttons">
                      <button onClick={() => handleOrder(x)}> Buy</button>
                      <button onClick={() => removeCartItem(x._id)}>
                        {" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="all-products-subtotal-div">
            <h1>Subtotal</h1>
            <h1>
              <BiRupee id="subtotal-rupee-symbol" />
              {total}
            </h1>
          </div>
        </div>
        <div className="side-subtotal-div">
          <h2>
            Cart{" "}
            <RiShoppingCartLine style={{ transform: "translateY(0.3rem)" }} />
          </h2>
          <h3>
            {billDetails ? (
              <BsFillCaretRightFill
                style={{
                  transform: "translateY(0.2rem)rotate(90deg)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setBillDetails(false);
                }}
              />
            ) : (
              <BsFillCaretRightFill
                style={{ transform: "translateY(0.2rem)", cursor: "pointer" }}
                onClick={() => {
                  setBillDetails(true);
                }}
              />
            )}
            total ( {cartDetails?.length} item ) :{" "}
            {billDetails ? (
              cartDetails?.map((x) => {
                return (
                  <tr className="bill-table-row">
                    <td>
                      {x.name} x {x.qty}.
                    </td>
                    <td>
                      <BiRupee
                        style={{
                          transform: "translateY(0.15rem)",
                        }}
                      />
                      {x.price * x.qty}
                    </td>
                  </tr>
                );
              })
            ) : (
              <span> </span>
            )}
            <span style={{ position: "relative" }}>
              <span
                style={{ position: "absolute", zIndex: "1" }}
                className="bill-tag-cart"
                id={`${billDetails}-show-bill`}
              >
                Bill-------------------
              </span>
              <BiRupee
                style={{ transform: "translateY(0.2rem)" }}
                className={`${billDetails}-price-spacing`}
              />
            </span>
            {billDetails ? (
              <span style={{ borderTop: "1px solid black" }}>{total}</span>
            ) : (
              <span>{total}</span>
            )}
          </h3>
          <button onClick={() => handleOrders()}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};
