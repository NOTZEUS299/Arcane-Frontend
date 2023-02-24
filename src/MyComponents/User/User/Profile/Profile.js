import React from "react";
import { Header } from "../../../../Header";
import { BsBoxSeam } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosIntance as axios } from "../../../Base-Url/AxiosInstance";
import Address from "../../../../utilities/address/Address";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [userDetails] = useState(JSON.parse(localStorage.getItem("userData")));
  const [address, setAddress] = useState(false);

  const navigate = useNavigate();

  const handleUserInfo = () => {
    setUserInfo(true);
    axios
      .get("/user/getaddress")
      .then((x) => {
        console.log(x, "fgfg");
      })
      .catch((x) => {
        console.log(x);
      });
  };

  const handleOrders = () => {
    alert("Under Development");
  };

  const handleFavs = () => {
    navigate("/favorite");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleAddress = () => {
    setAddress(true);
  };

  const handleSignOut = async () => {
    await axios.post("/signout").then((x) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/sign-in");
    });
  };

  return (
    <div>
      <div className="fake-space-div-for-profile">
        <Header />
      </div>
      <div className="profile-navbar">
        <p>
          Check Out Our Winter Collection With Crazy Discounts | 20-30% Off...
        </p>
      </div>
      <div className="profile-page-main-container">
        <div className="profile-inner-container">
          <div
            className="profile-user-account"
            onClick={() => handleUserInfo()}
          >
            <div className="profile-user-profile-pic">
              <img src="profile.jpg" alt="" />
            </div>
            <h1>Your Info</h1>
          </div>
          <div className="profile-user-orders" onClick={() => handleOrders()}>
            <div className="profile-user-profile-pic">
              <h1>
                <BsBoxSeam />
              </h1>
            </div>
            <h1>Your Orders</h1>
          </div>
          <div className="profile-user-favs" onClick={() => handleFavs()}>
            <div className="profile-user-profile-pic">
              <h1>
                <FaHeart />
              </h1>
            </div>
            <h1>Your Favorites</h1>
          </div>
          <div className="profile-user-cart" onClick={() => handleCart()}>
            <div className="profile-user-profile-pic">
              <h1>
                <RiShoppingCartFill />
              </h1>
            </div>
            <h1>Your Cart</h1>
          </div>
        </div>
      </div>
      {address && <Address />}
      {userInfo && (
        <div className="user-info-pop-up">
          <div className="shape-one" id="userPopUpShapeOne"></div>
          <div
            className="shape-two"
            id="userPopUpShapeOne"
            style={{ animationDelay: "0.6s" }}
          ></div>
          <div className="shape-three" id="userPopUpShapeOne">
            <div></div>
          </div>
          <div className="shape-four" id="userPopUpShapeOne">
            <div></div>
          </div>
          <div className="user-content-inner-pop-up">
            <h1>
              <MdOutlineClose
                onClick={() => {
                  setUserInfo(false);
                }}
              />
            </h1>
            <div className="user-content-details">
              <label htmlFor="user-field">User :</label>
              <input
                type="text"
                name=""
                id="user-field"
                value={userDetails?.firstName}
              />
            </div>
            <div
              className="user-content-details"
              style={{ animationDelay: "1.7s" }}
            >
              <label htmlFor="mail-field">Email :</label>
              <input
                type="text"
                name=""
                id="mail-field"
                value={userDetails?.email}
              />
            </div>
            <div
              className="user-content-details"
              style={{ animationDelay: "1.9s" }}
            >
              <label htmlFor="pass-field">Number :</label>
              <input
                type="text"
                name=""
                id="pass-field"
                value={userDetails?.lastName}
              />
            </div>
            <div
              className="user-content-details"
              style={{ animationDelay: "2.1s" }}
              onClick={() => handleAddress()}
            >
              <label htmlFor="address-field" id="label-for-address-field">
                Address :
              </label>
              <input type="text" name="" value={" "} id="address-field" />
            </div>
            <div
              className="user-content-details"
              style={{ animationDelay: "2.3s" }}
              id="buttons-for-user-details-pop-up"
            >
              {/* <button>Edit</button> */}
              <button onClick={() => handleSignOut()}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
