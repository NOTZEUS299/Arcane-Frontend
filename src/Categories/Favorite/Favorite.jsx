import React, { useEffect } from "react";
import { Header } from "../../Header";
import "./favourite.css";
import {
  axiosIntance as axios,
  generatePublicUrl as imagePath,
} from "../../MyComponents/Base-Url/AxiosInstance";
import { useState } from "react";
import { Loader } from "../../MyComponents/Loader/Loader";
import { FaRupeeSign } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import {
  BsFillCaretRightFill,
  BsFillCaretLeftSquareFill,
  BsFillCaretRightSquareFill,
} from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Favorite = () => {
  const [functionCall, setFunctionCall] = useState(false);
  const [favData, setFavData] = useState();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [quanButtons, setQuanButtons] = useState({ minus: "", plus: "" });
  const [popUpId, setPopUpId] = useState("");

  const navigate = useNavigate();

  const removeFav = async (id) => {
    setLoading(true);
    await axios.delete(`/fav/delete/${id}`).then((x) => {
      setFunctionCall(!functionCall);
    });
  };

  const handleItemForCart = async (id) => {
    setQuantity(1);
    setAddToCart(true);
    await axios.get(`/product/${id}`).then((x) => {
      setCartData(x.data.product);
    });
  };

  async function removeItemAfterAddToCart(id) {
    const favId = favData?.filter((x) => {
      return x?.product?._id === id;
    });
    setLoading(true);
    await axios.delete(`/fav/delete/${favId[0]?._id}`).then((x) => {
      setFunctionCall(!functionCall);
    });
  }

  const handleMoveToCart = async (id, quan, pri) => {
    const cartData = [
      {
        product: id,
        quantity: quan,
        price: pri,
      },
    ];
    await axios
      .post("/user/cart/addtocart", { cartItems: cartData })
      .then((x) => {
        setQuantity(1);
        setPopUpId("add-to-cart-pop-up-close");
        setTimeout(() => {
          setPopUpId("");
          setAddToCart(false);
        }, 500);
        removeItemAfterAddToCart(id);
      });
  };

  useEffect(() => {
    axios
      .get("/fav/getByUser")
      .then((x) => {
        setFavData(x.data);
        setTimeout(() => {
          setLoader(true);
          setLoading(false);
        }, 1000);
      })
      .catch((x) => {
        if (window.confirm("Require Sign In... \n Redirect Sign In Page...?")) {
          navigate("/sign-In");
        }
      });
  }, [functionCall]);

  useEffect(() => {
    document.title = "Arcane | Fav";
    setFunctionCall(!functionCall);
  }, []);

  return (
    <div className="fav-page-main-container">
      {!loader && <Loader />}
      {loading && <Loader />}
      <Header />
      <div className="advrtsbar">
        <div className="topcntntsale" id="favourite-page">
          <p>20% OFF ON FRESH LAUNCH | SHOP NOW</p>
        </div>
      </div>
      {favData?.length === 0 && (
        <div className="container-when-no-items-in-fav">
          <h1>
            Favourites <FaHeartBroken className="no-favs-icons" />
          </h1>
        </div>
      )}
      <div className="fake-space-div"></div>
      <div className="favourite-page-main-container">
        {loader &&
          favData?.map((x, i) => {
            return (
              <div className="favourite-page-gridded-div">
                <div key={i} className="favourite-list-content-div">
                  <div
                    className="innerPage-image-container"
                    style={{
                      background: `url(${imagePath(
                        x?.product.productPictures[0].img
                      )})`,
                    }}
                  >
                    <div className="product-image-container-favPage">
                      <div className="img-container-favPage">
                        <img
                          src={imagePath(x?.product.productPictures[0].img)}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="innerPage-content-container">
                    <h4>{x?.product.name}</h4>
                    {/* <hr /> */}
                    <h3>
                      <FaRupeeSign className="rupeeSign" />
                      {x?.product.price}
                    </h3>
                    <button onClick={() => handleItemForCart(x?.product._id)}>
                      Move To Cart
                      <RiShoppingCartLine />
                    </button>
                    <div
                      className="remove-fav-card-favPage"
                      onClick={() => removeFav(x?._id)}
                    >
                      <div className="heart-container-one-favPage">
                        <ImCross
                          className="heart-favPage-Content"
                          id="heart-favPage-left"
                        />
                      </div>
                      <div className="favPage-actual-content">~Remove~</div>
                      <div className="heart-container-two-favPage">
                        <ImCross
                          className="heart-favPage-Content"
                          id="heart-favPage-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {addToCart && (
          <div
            className="add-to-cart-pop-up"
            style={{ overflowY: "hidden", overflowX: "visible" }}
            id={popUpId}
          >
            <BsFillCaretRightFill
              className="add-to-cart-close-button"
              onClick={() => {
                setQuantity(1);
                setPopUpId("add-to-cart-pop-up-close");
                setTimeout(() => {
                  setPopUpId("");
                  setAddToCart(false);
                }, 500);
              }}
            />
            <div>
              <div className="add-to-cart-product-image">
                <img
                  src={imagePath(cartData?.productPictures[0]?.img)}
                  alt=""
                />
              </div>
            </div>
            <div className="flex-content-add-to-cart">
              <div className="add-to-cart-name">{cartData?.name}</div>
              <hr />
              <div className="input-quantity-div">
                <div
                  className="plus-minus-button"
                  id="minus-button"
                  onClick={() => {
                    if (quantity <= 1) {
                      setQuanButtons({ ...quanButtons, minus: "#898989" });
                    } else {
                      setQuantity(quantity - 1);
                      setQuanButtons({
                        ...quanButtons,
                        minus: "#5a5a5a",
                        plus: "#5a5a5a",
                      });
                    }
                  }}
                  onMouseOut={() => {
                    if (quantity <= 1) {
                      setQuanButtons({ ...quanButtons, minus: "#898989" });
                    } else {
                      setQuanButtons({
                        ...quanButtons,
                        minus: "#5a5a5a",
                        plus: "#5a5a5a",
                      });
                    }
                  }}
                >
                  <BsFillCaretLeftSquareFill
                    style={{
                      color: quanButtons.minus,
                    }}
                  />
                </div>
                <input
                  type="number"
                  name="quantity-num"
                  id="add-to-cart-quantity"
                  value={quantity}
                  step={1}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <div
                  className="plus-minus-button"
                  id="plus-button"
                  onClick={() => {
                    if (quantity >= 10) {
                      setQuanButtons({
                        ...quanButtons,
                        plus: "#898989",
                      });
                    } else {
                      setQuantity(quantity + 1);
                      setQuanButtons({
                        ...quanButtons,
                        minus: "#5a5a5a",
                        plus: "#5a5a5a",
                      });
                    }
                  }}
                  onMouseOut={() => {
                    if (quantity >= 10) {
                      setQuanButtons({
                        ...quanButtons,
                        plus: "#898989",
                      });
                    } else {
                      setQuanButtons({
                        ...quanButtons,
                        minus: "#5a5a5a",
                        plus: "#5a5a5a",
                      });
                    }
                  }}
                >
                  <BsFillCaretRightSquareFill
                    style={{
                      color: quanButtons.plus,
                    }}
                  />
                </div>
              </div>
              <div className="add-to-cart-buttons">
                <button
                  onClick={() =>
                    handleMoveToCart(cartData?._id, quantity, cartData?.price)
                  }
                >
                  Move To Cart
                  <TiTick />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
