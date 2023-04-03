import React, { useEffect, useState } from "react";
import "./search.css";
import {
  axiosIntance as axios,
  generatePublicUrl,
} from "../Base-Url/AxiosInstance";
import { FaRupeeSign, FaHeart, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartFill, RiShoppingCartLine } from "react-icons/ri";
import {
  BsFillCaretRightFill,
  BsFillCaretLeftSquareFill,
  BsFillCaretRightSquareFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const Search = ({ prop }) => {
  const [searchData, setSearchData] = useState([]);
  const [favData, setFavData] = useState();
  const [removeFav, setRemoveFav] = useState();
  const [functionCall, setFunctionCall] = useState(false);
  const [load, setLoad] = useState(false);
  const [suggested] = useState();
  const [addToCart, setAddToCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [quanButtons, setQuanButtons] = useState({ minus: "", plus: "" });
  const [popUpId, setPopUpId] = useState("");

  const navigate = useNavigate();

  function handlefavData(x) {
    setRemoveFav(x);
    const favArray = [];
    x.map((y) => {
      favArray.push(y.product._id);
    });
    setFavData(favArray);
  }

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
    await axios.post("/fav/create", favId).then((x) => {
      setFunctionCall(!functionCall);
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

  const handleItemForCart = async (id) => {
    setQuantity(1);
    setAddToCart(true);
    await axios.get(`/product/${id}`).then((x) => {
      setCartData(x.data.product);
    });
  };

  const handleView = (id) => {
    navigate({
      pathname: `/product/${id}`,
    });
    window.location.reload(true);
  };

  useEffect(() => {
    axios.get("/fav/getByUser").then((x) => {
      handlefavData(x.data);
      setLoad(false);
    });
  }, [functionCall]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1);
  }, [suggested]);

  useEffect(() => {
    axios.get(`/product/search?search=${prop?.string}`).then((x) => {
      setSearchData(x?.data?.products);
    });
  }, [prop]);

  console.log(searchData);
  return (
    <div className="search-page-main-container" id={`page-exit-${prop?.exit}`}>
      {load && <Loader />}
      {searchData?.length === 0 && (
        <div className="div-for-zero-item">
          <p>Your search - {prop?.string} - did not match any product </p>{" "}
          <img src="search.gif" alt="" />
        </div>
      )}
      <div className="searched-product">
        {searchData?.map((x, i) => {
          return (
            <div className="view-product-card" key={i}>
              <img src={generatePublicUrl(x.productPictures[0].img)} alt="" />
              <div className="mens-card-content">
                <h4>{x.name}</h4>
                <h5>Stock Left: {x.quantity} Pieces</h5>
                <h5>
                  Price: <FaRupeeSign />
                  {x.price} only
                </h5>
                <p>
                  {favData?.includes(x._id) ? (
                    <FaHeart onClick={() => removeFavOnClick(x?._id)} />
                  ) : (
                    <FaRegHeart onClick={() => handleFavOnClick(x?._id)} />
                  )}
                </p>
                <p id="add-to-cart-button">
                  {false ? (
                    <RiShoppingCartFill />
                  ) : (
                    <RiShoppingCartLine
                      onClick={() => handleItemForCart(x?._id)}
                    />
                  )}
                </p>
                <div className="content-buttons">
                  <button id="buyNow-button">Buy Now</button>
                  <button
                    id="viewProduct-button"
                    onClick={() => handleView(x?._id)}
                  >
                    View Product
                  </button>
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
                <img
                  src={generatePublicUrl(cartData?.productPictures[0]?.img)}
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
    </div>
  );
};

export default Search;
