import React from "react";
import { Header } from "../../../../Header";
import { BsBoxSeam } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosIntance as axios } from "../../../Base-Url/AxiosInstance";
import Address from "../../../../utilities/address/Address";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [userDetails] = useState(JSON.parse(localStorage.getItem("userData")));
  const [addressFieldId, setAddressFieldId] = useState("");
  const [addressData, setAddressData] = useState();
  const [addAddress, setAddAddress] = useState(false);

  const navigate = useNavigate();

  const handleUserInfo = () => {
    setUserInfo(true);
    axios.get("/user/getaddress").then((x) => {
      setAddressData(x.data.userAddress.address);
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
      {addAddress && (
        <div className="addAddress-container">
          <div className="address-field-close-btn-container">
            <div
              className="address-field-close-btn"
              onClick={() => {
                setAddAddress(false);
              }}
            ></div>
          </div>
          <Address />
        </div>
      )}
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
              className="user-address-details"
              style={{ animationDelay: "2.1s" }}
              id="address-field-container"
              onBlur={() => {
                setAddressFieldId("");
              }}
            >
              <div
                className="address-field-box"
                id={addressFieldId}
                onClick={() => {
                  setAddressFieldId("address-field-id");
                }}
              >
                {addressData === undefined ? (
                  <div
                    className="add-Address-container"
                    onClick={() => {
                      setAddAddress(true);
                    }}
                  >
                    <section className="plus-symbol">
                      <AiOutlinePlusSquare />
                    </section>
                    <section className="Address-text">Address</section>
                  </div>
                ) : (
                  <div className="address-field-users-address">
                    <label htmlFor="mail-field">Address :</label>
                    <div
                      style={
                        addressData?.length > 1
                          ? { overflowY: "scroll", height: "20vh" }
                          : {}
                      }
                    >
                      {addressData.length > 0 &&
                        addressData.map((x) => {
                          return (
                            <div className="address-field-addresses">
                              <input
                                type="radio"
                                name="address"
                                id={x?._id}
                                onChange={(e) => {
                                  console.log(e.target.id);
                                }}
                              />
                              <div>
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
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
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
