import "./header.css";
import { RiHeartFill, RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { RiHeartLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "./MyComponents/Navigation/Navigation";
import { useEffect } from "react";
import mainlogo from "./images/mainlogo.png";
import Search from "./MyComponents/Search/Search";
import {axiosIntance as axios} from "./MyComponents/Base-Url/AxiosInstance"

export const Header = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [user, setUser] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [mhCustonIcon, setMhCustomIcon] = useState(false);
  const [mhHomeNav, setMhHomeNav] = useState(false);
  const [mhMenNav, setMhMenNav] = useState(false);
  const [mhWomenNav, setMhWomenNav] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [searchData, setSearchData] = useState({ exit: false, string: "" });
  const [favCount, setFavCount] = useState()
  const [cartCount, setCartCount] = useState()

  const path = useLocation().pathname;

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      setSearchShow(true);
      setSearchData({ ...searchData, exit: false, string: e.target.value });
    } else {
      setSearchData({ ...searchData, exit: true });
      setTimeout(() => {
        setSearchShow(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (
      path === "/men" ||
      path === "/men-outfits" ||
      path === "/men-tops" ||
      path === "/men-bottoms" ||
      path === "/men-footwears" ||
      path === "/men-accessories" ||
      path === "/women" ||
      path === "/women-outfits" ||
      path === "/women-tops" ||
      path === "/women-bottoms" ||
      path === "/women-footwears" ||
      path === "/women-accessories"
    ) {
      setShowNavigation(true);
    } else {
      setShowNavigation(false);
    }

    if (path === "/sign-up") {
      setSignUp(true);
      setSignIn(false);
    }

    if (path === "/sign-in") {
      setSignIn(true);
      setSignUp(false);
    }

    if (path === "/profile") {
      setUser(true);
      setSignIn(false);
      setSignUp(false);
    }

    if (path === "/home") {
      setMhHomeNav(true);
      setMhMenNav(false);
      setMhWomenNav(false);
    }

    if (path === "/men") {
      setMhHomeNav(false);
      setMhMenNav(true);
      setMhWomenNav(false);
    }

    if (path === "/women") {
      setMhHomeNav(false);
      setMhMenNav(false);
      setMhWomenNav(true);
    }
  }, [path]);

  useEffect(() => {
    if (localStorage.getItem("token")?.length > 0) {
      setUser(true);
      setSignIn(false);
      setSignUp(false);
    }
  }, []);
  
  useEffect(() => {
    axios.get("/user/getCartItems").then((x) => {
      const data = Object.values(x.data.cartItems);
      setCartCount(data?.length)
    });
      }, [])

  useEffect(() => {
    axios
    .get("/fav/getByUser")
    .then((x) => {
      setFavCount(x?.data?.length)
    })
  }, [])

  return (
    <div className="mainhdr">
      <div className="hdrlglst">
        <div className="lstnvbr">
          <div className="lstnav">
            <li>
              <NavLink
                to={"/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Home
              </NavLink>
            </li>
            <div className="navigation">
              <div className="navigationLinks">
                <li className="subnavlst">
                  <a href="/home#Limited-Edition">Limited Edition</a>
                </li>
                <li className="subnavlst">
                  <a href="/home#New-Arrivals">New Arrivals</a>
                </li>
                <li className="subnavlst">
                  <a href="/home#Hottest-Deals">Hottest Deals</a>
                </li>
                <li className="subnavlst">
                  <a href="/home#Daily-Wear">Daily Wear</a>
                </li>
              </div>
            </div>
          </div>
          <div className="lstnav">
            <li>
              <NavLink
                to="/men"
                style={{ textDecoration: "none", color: "black" }}
              >
                Men
              </NavLink>
            </li>
            <div className="navigation">
              <div className="navigationLinks" style={{ width: "75%" }}>
                <li className="subnavlst">
                  <NavLink
                    to={"/men-outfits"}
                    className="navLinks-for-sub-categories"
                  >
                    Outfits
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/men-tops"}
                    className="navLinks-for-sub-categories"
                  >
                    Top
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/men-bottoms"}
                    className="navLinks-for-sub-categories"
                  >
                    Bottom
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/men-footwears"}
                    className="navLinks-for-sub-categories"
                  >
                    Footwear
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/men-accessories"}
                    className="navLinks-for-sub-categories"
                  >
                    Accessories
                  </NavLink>
                </li>
              </div>
            </div>
          </div>
          <div className="lstnav">
            <li>
              <NavLink
                to="/women"
                style={{ textDecoration: "none", color: "black" }}
              >
                Women
              </NavLink>
            </li>
            <div className="navigation">
              <div className="navigationLinks" style={{ width: "56%" }}>
                <li className="subnavlst">
                  <NavLink
                    to={"/women-outfits"}
                    className="navLinks-for-sub-categories"
                  >
                    Outfits
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/women-tops"}
                    className="navLinks-for-sub-categories"
                  >
                    Top
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/women-bottoms"}
                    className="navLinks-for-sub-categories"
                  >
                    Bottom
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/women-footwears"}
                    className="navLinks-for-sub-categories"
                  >
                    Footwear
                  </NavLink>
                </li>
                <li className="subnavlst">
                  <NavLink
                    to={"/women-accessories"}
                    className="navLinks-for-sub-categories"
                  >
                    Accessories
                  </NavLink>
                </li>
              </div>
            </div>
          </div>
          <div className="lstnav">
            <li>
              <NavLink
                to="/favorite"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div style={{ position: "relative" }}>
                  <span style={{ marginRight: "12px" }}>Fav</span>
                  {path === "/favorite" ? (
                    <RiHeartFill className="favheart" />
                  ) : (
                    <RiHeartLine className="favheart" />
                  )}
                  <span id="fav-link-on-header">
                    rite {favCount !== undefined ? <div>{favCount}</div>:""}
                  </span>
                </div>
              </NavLink>
            </li>
          </div>
        </div>
        <div className="mainlogo">
          <img src={mainlogo} alt="" />
        </div>
        <div className="lstnvbrrght">
          <div className="searchbar">
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e)}
            />
            <MdOutlineSearch className="searchbaricon" />
          </div>
          {signUp && (
            <li>
              <NavLink
                to={"/sign-up"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign up
              </NavLink>
            </li>
          )}
          {signIn && (
            <li>
              <NavLink
                to={"/sign-in"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign in
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to={"/profile"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Profile
              </NavLink>
            </li>
          )}
          <li style={{ marginLeft: "0px", marginRight: "24px" }}>
            <NavLink
              to={"/cart"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span id="cart-link-on-header">
                Cart {cartCount !== undefined ? <div>{cartCount}</div> : ""}
              </span>
              <span className="spntwomain">
                <RiShoppingCartLine className="spntwo" />
              </span>
            </NavLink>
          </li>
        </div>
      </div>
      {showNavigation && <Navigation />}
      <div className="header-for-mobile">
        <div
          className="custom-list-icon-mobile-header"
          id={mhCustonIcon ? "custom-arrow-icon" : ""}
          onClick={() => {
            setMhCustomIcon(!mhCustonIcon);
          }}
        >
          <div className="bar-for-custom-list-mh"></div>
          <div></div>
          <div className="bar-for-custom-list-mh"></div>
        </div>
        <div className="mainLogo-for-mobile-header">
          <img src={mainlogo} alt="" />
        </div>
        <div className="main-navigations-for-mobile-header">
          <div className="user-navigations-mh">
            <img src="profile.jpg" alt="" />
          </div>
          <div className="user-cart-mh">
            <RiShoppingCartLine />
          </div>
        </div>
        <div
          className="navigation-list-for-mh"
          id={mhCustonIcon ? "show-navigation-list-mh" : ""}
          onPointerOut={() => {
            setMhCustomIcon(false);
          }}
        >
          <div className="navigation-sub-list-mh">
            <NavLink to={"/home"} className="navTags-Of-Sublist">
              <li className={mhHomeNav ? "sub-nav-active-class-mh" : ""}>
                Home
              </li>
            </NavLink>
            <NavLink to={"/men"} className="navTags-Of-Sublist">
              <li className={mhMenNav ? "sub-nav-active-class-mh" : ""}>Men</li>
            </NavLink>
            <NavLink to={"/women"} className="navTags-Of-Sublist">
              <li className={mhWomenNav ? "sub-nav-active-class-mh" : ""}>
                Wonem
              </li>
            </NavLink>
          </div>
          <div className="nav-all-sub-list">
            {mhCustonIcon && (
              <div>
                {mhHomeNav && (
                  <div>
                    <li className="subnavlst">
                      <a href="/home#Limited-Edition">Limited Edition</a>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.1s",
                      }}
                    >
                      <a href="/home#New-Arrivals">New Arrivals</a>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.2s",
                      }}
                    >
                      <a href="/home#Hottest-Deals">Hottest Deals</a>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.3s",
                      }}
                    >
                      <a href="/home#Daily-Wear">Daily Wear</a>
                    </li>
                  </div>
                )}
              </div>
            )}
            {mhCustonIcon && (
              <div>
                {mhMenNav && (
                  <div>
                    <li className="subnavlst">
                      <NavLink to={"/men-outfits"}>Men Outfits</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.1s",
                      }}
                    >
                      <NavLink to={"/men-top"}>Men Tops</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.2s",
                      }}
                    >
                      <NavLink to={"/men-bottom"}>Men Bottoms</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.3s",
                      }}
                    >
                      <NavLink to={"/men-footwear"}>Men Footwears</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.4s",
                      }}
                    >
                      <NavLink to={"/men-accessories"}>Men Accessories</NavLink>
                    </li>
                  </div>
                )}
              </div>
            )}
            {mhCustonIcon && (
              <div>
                {mhWomenNav && (
                  <div>
                    <li className="subnavlst">
                      <NavLink to={"/women-outfits"}>Women Outfits</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.1s",
                      }}
                    >
                      <NavLink to={"/women-top"}>Women Tops</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.2s",
                      }}
                    >
                      <NavLink to={"/women-bottom"}>Women Bottoms</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.3s",
                      }}
                    >
                      <NavLink to={"/women-footwear"}>Women Footwears</NavLink>
                    </li>
                    <li
                      className="subnavlst"
                      style={{
                        animationDelay: "0.4s",
                      }}
                    >
                      <NavLink to={"/women-accessories"}>
                        Women Accessories
                      </NavLink>
                    </li>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {searchShow && (
        <div className="search-container">
          <Search prop={searchData} />
        </div>
      )}
    </div>
  );
};
