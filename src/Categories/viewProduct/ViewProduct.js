import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Header";
import "./viewProduct.css";
import {
  axiosIntance as axios,
  generatePublicUrl as imagePath,
} from "../../MyComponents/Base-Url/AxiosInstance";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaRupeeSign } from "react-icons/fa";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import {
  BsThreeDotsVertical,
  BsFillCaretLeftSquareFill,
  BsFillCaretRightSquareFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import { Loader } from "../../MyComponents/Loader/Loader";
import {
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from "react-image-magnifiers";
import { useAtom } from "jotai";
import { ProductData } from "../../helper/Jotai";

export const ViewProduct = () => {
  const [product, setProduct] = useState();
  const [description, setDescription] = useState();
  const [favData, setFavData] = useState();
  const [removeFav, setRemoveFav] = useState();
  const [functionCall, setFunctionCall] = useState(false);
  const [load, setLoad] = useState(false);
  const [imgShow, setImgShow] = useState(false);
  const [suggested, setSuggested] = useState();
  const [prductData] = useAtom(ProductData);
  const [loading, setLoading] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [quanButtons, setQuanButtons] = useState({ minus: "", plus: "" });
  const [popUpId, setPopUpId] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  function handlefavData(x) {
    setRemoveFav(x);
    const favArray = [];
    x.map((y) => {
      favArray.push(y.product._id);
    });
    setFavData(favArray);
  }

  console.log(favData);

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
    setLoad(true);
    axios.get(`/product/${id}`).then((x) => {
      setProduct(x.data.product);
    });
    setFunctionCall(!functionCall);
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    axios.get("/fav/getByUser").then((x) => {
      handlefavData(x.data);
      setLoad(false);
    });
  }, [functionCall]);

  useEffect(() => {
    setTimeout(() => {
      setDescription(JSON.parse(product?.description)?.description);
      setImgShow(true);
    }, 1);
    setSuggested(
      prductData
        .filter((x) => {
          return x?.category?._id === product?.category;
        })
        .filter((x) => {
          return x?._id !== product?._id;
        })
    );
  }, [product]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1);
  }, [suggested]);

  // setTimeout(() => {
  //   setLoading(true);
  // }, 10000);

  return (
    <div>
      {load && <Loader />}
      <Header />
      <div className="fake-space-div" style={{ background: "#e0e0e0" }}></div>
      <div className="topcntntsale" id="viewCart-page">
        <p>20% OFF ON FRESH LAUNCH | SHOP NOW</p>
      </div>
      <div className="view-product-main-container">
        <div className="viewed-product-div">
          <div className="image-div-container">
            <fieldset>
              <legend>{product?.name}</legend>
              {/* <img src={imagePath(product?.productPictures[0].img)} alt="" /> */}
              {imgShow && (
                <MagnifierContainer>
                  <div className="magnifier-image-div-vp">
                    <MagnifierPreview
                      imageSrc={imagePath(product?.productPictures[0].img)}
                    />
                  </div>
                  <MagnifierZoom
                    style={{
                      height: "94%",
                      width: "92%",
                      position: "absolute",
                      top: "3%",
                      right: "4%",
                      borderRadius: "10px",
                    }}
                    imageSrc={imagePath(product?.productPictures[0].img)}
                  />
                </MagnifierContainer>
              )}
            </fieldset>
          </div>
          <div className="product-content-container-viewProduct">
            <div className="product-content-viewProduct">
              <h2>{description}</h2>
              <h3>
                M.R.P.: <FaRupeeSign />
                {product?.price} only
              </h3>
              <h4>
                Only{" "}
                <span style={{ textDecoration: "underline" }}>
                  {product?.quantity}
                </span>{" "}
                left
              </h4>
              <div className="viewCart-product-buttons">
                <button>Buy Now</button>
                <button onClick={() => handleItemForCart(product?._id)}>
                  Add To Cart <RiShoppingCartLine />
                </button>
              </div>
              <div className="add-to-favourite-button">
                {/* <FaHeart /> */}
                {favData?.includes(product?._id) ? (
                  <FaHeart
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFavOnClick(product?._id)}
                  />
                ) : (
                  <FaRegHeart
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFavOnClick(product?._id)}
                  />
                )}
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
        </div>
        <div className="suggested-products-containers">
          <fieldset style={{ border: "2px solid white", borderRadius: "20px" }}>
            <legend
              style={{
                marginLeft: "2.5rem",
                color: "white",
                padding: "0 1rem",
              }}
            >
              <h2>You might also like...</h2>
            </legend>
            <div className="suggested-products">
              {loading &&
                suggested?.map((x, i) => {
                  return (
                    <div className="view-product-card" key={i}>
                      <img src={imagePath(x.productPictures[0].img)} alt="" />
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
                            <FaRegHeart
                              onClick={() => handleFavOnClick(x?._id)}
                            />
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
            </div>
          </fieldset>
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
