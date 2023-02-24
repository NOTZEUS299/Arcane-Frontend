import React from "react";
import { Header } from "../../../../Header";
import { useAtom } from "jotai";
import { ProductData } from "../../../../helper/Jotai";
import {
  axiosIntance as axios,
  generatePublicUrl as imagePath,
} from "../../../../MyComponents/Base-Url/AxiosInstance";
import { FaRupeeSign } from "react-icons/fa";
import { RiShoppingCartFill, RiShoppingCartLine } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../Outfit/menSub.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../MyComponents/Loader/Loader";
import {
  BsFillCaretLeftSquareFill,
  BsFillCaretRightSquareFill,
  BsFillCaretRightFill,
} from "react-icons/bs";

export const MenAccessories = () => {
  const [productData] = useAtom(ProductData);
  const [loader, setLoader] = useState(false);
  const [fvData, setFvData] = useState();
  const [removeFav, setRemoveFav] = useState();
  const [functionCall, setFunctionCall] = useState(false);
  const [load, setLoad] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [quanButtons, setQuanButtons] = useState({ minus: "", plus: "" });
  const [popUpId, setPopUpId] = useState("");

  // Male Outfit - 63060f03ae6bab6c3fa7a478
  // Male Top - 63060f6aae6bab6c3fa7a47f
  // Male Bottom - 63060f72ae6bab6c3fa7a481
  // Male Footwear - 63060f91ae6bab6c3fa7a487
  // Male Asseccories - 63060f9cae6bab6c3fa7a489
  // Female Outfit - 63060f17ae6bab6c3fa7a47a
  // Female Top - 63060f56ae6bab6c3fa7a47d
  // Female Bottom - 63060f79ae6bab6c3fa7a483
  // Female Footwear - 63060f82ae6bab6c3fa7a485
  // Female Asseccories - 63060fa6ae6bab6c3fa7a48b

  const navigate = useNavigate();

  // console.log(productData);

  const outfitDataMen = productData.filter((x) => {
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    return x.category._id === "63060f9cae6bab6c3fa7a489";
  });

  function handlefavData(x) {
    setRemoveFav(x);
    const favArray = [];
    if (x.length >= 0) {
      x.map((y) => {
        favArray.push(y.product?._id);
      });
    }
    setFvData(favArray);
    setTimeout(() => {
      setLoad(false);
    }, 1);
  }
  // console.log(removeFav);

  const removeFavOnClick = (id) => {
    setLoad(true);
    const favId = removeFav.filter((x) => {
      return x.product._id === id;
    });
    axios.delete(`/fav/delete/${favId[0]._id}`).then((x) => {
      setFunctionCall(!functionCall);
    });
  };

  const handleFavOnClick = async (id) => {
    setLoad(true);
    const favId = {
      product: id,
    };
    await axios
      .post("/fav/create", favId)
      .then((x) => {
        setFunctionCall(!functionCall);
      })
      .catch((x) => {
        if (x.name === "AxiosError") {
          if (
            window.confirm("Sign In Required... \n Redirect To Sign In Page?")
          ) {
            navigate("/sign-in");
          } else {
            setLoad(false);
          }
        }
      });
  };

  const viewProduct = (id) => {
    navigate({
      pathname: `/product/${id}`,
    });
  };

  const handleItemForCart = async (id) => {
    setQuantity(1);
    setAddToCart(true);
    await axios.get(`/product/${id}`).then((x) => {
      setCartData(x.data.product);
    });
  };

  const createCartItemOnClick = async (id, quan, pri) => {
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
      });
  };

  useEffect(() => {
    axios
      .get("/fav/getByUser")
      .then((x) => {
        handlefavData(x.data);
      })
      .catch((x) => {
        if (x.name === "AxiosError") {
          setFvData([]);
        }
      });
  }, [functionCall]);

  useEffect(() => {
    setFunctionCall(!functionCall);
    axios.get("/user/getCartItems").then((x) => {
      console.log(x);
    });
  }, []);

  return (
    <div>
      {!loader && <Loader />}
      {load && <Loader />}
      <Header />
      <div className="fake-div-for-space"></div>
      <div className="men-outfit-page-bg-container"></div>
      <div className="mens-outfit-page-main-container">
        <div className="mens-outfit-product-cards-container">
          {loader &&
            outfitDataMen.map((x, i) => {
              return (
                <div className="mens-outfit-product-card" key={i}>
                  <img src={imagePath(x.productPictures[0].img)} alt="" />
                  <div className="mens-card-content">
                    <h4>{x.name}</h4>
                    <h5>Stock Left: {x.quantity} Pieces</h5>
                    <h5>
                      Price: <FaRupeeSign />
                      {x.price} only
                    </h5>
                    <p>
                      {fvData?.includes(x?._id) ? (
                        <FaHeart onClick={() => removeFavOnClick(x._id)} />
                      ) : (
                        <FaRegHeart onClick={() => handleFavOnClick(x._id)} />
                      )}
                    </p>
                    <p id="add-to-cart-button">
                      {false ? (
                        <RiShoppingCartFill />
                      ) : (
                        <RiShoppingCartLine
                          onClick={() => handleItemForCart(x._id)}
                        />
                      )}
                    </p>
                    <div className="content-buttons">
                      <button id="buyNow-button">Buy Now</button>
                      <button
                        id="viewProduct-button"
                        onClick={() => viewProduct(x._id)}
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {addToCart && (
        <div
          className="add-to-cart-pop-up"
          style={{ overflowY: "hidden", overflowX: "visible" }}
          id={popUpId}
        >
          <BsFillCaretRightFill
            className="add-to-cart-close-button"
            onClick={() => {
              // setAddToCart(false);
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
              <img src={imagePath(cartData?.productPictures[0]?.img)} alt="" />
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
                    transform: "rotate(-90deg)",
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
                    transform: "rotate(-90deg)",
                  }}
                />
              </div>
            </div>
            <div className="add-to-cart-buttons">
              <button
                onClick={() =>
                  createCartItemOnClick(
                    cartData?._id,
                    quantity,
                    cartData?.price
                  )
                }
              >
                Add To Cart <RiShoppingCartLine />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
