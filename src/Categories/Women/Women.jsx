import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Header";
import "./women.css";

export const Women = () => {
  const [activeClass, setActiveClass] = useState({});
  const [switchHover, setSwitchHover] = useState("intialHover");

  useEffect(() => {
    document.title = "Arcane | Women";
  }, []);
  return (
    <div>
      <Header />
      <div className="fake-space-div"></div>
      <div className="men-page-main-container">
        <div className="mens-category-card-container" id={switchHover}>
          <div
            className="mens-outfit-category-card"
            id={activeClass.classOne}
            onClick={() => {
              setActiveClass({
                ...activeClass,
                classOne: "active-class-women",
                classTwo: "",
                classThree: "",
                classFour: "",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-one">
              <div className="image-content-one">
                <img src="wOutfit.jfif" alt="" />
              </div>
            </div>
            <div className="content-container-one">
              <h1>Outfits</h1>
              <img src="wOutfit.jfif" alt="" className="background-image" />
              <div className="glass-slate-one">
                <h1>Women Outfits</h1>
                <p>
                  "Remind yourself. Nobody built like you, you design
                  yourself.", Checkout some fresh outfits now
                </p>
                <Link to={"/women-outfits"}>
                  <button>View Products</button>
                </Link>
              </div>
            </div>
            <div className="design-container-one"></div>
          </div>
          <div
            className="mens-top-category-card"
            id={activeClass.classTwo}
            onClick={() => {
              setActiveClass({
                ...activeClass,
                classOne: "",
                classTwo: "active-class-women",
                classThree: "",
                classFour: "",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-two">
              <div className="image-content-two">
                <img src="wTop3.jfif" alt="" />
              </div>
            </div>
            <div className="content-container-two">
              <h1>Top</h1>
              <img
                src="wTop3.jfif"
                className="background-image-one"
                // id="bg-image-two"
                alt=""
              />
              <div className="glass-slate-two">
                <h1>Women Tops</h1>
                <p>
                  “Fashion is what you’re offered four times a year by
                  designers. And style is what you choose.” So style your way as
                  you like...
                </p>
                <Link to={"/women-tops"}>
                  <button>View Products</button>
                </Link>
              </div>
            </div>
            <div className="design-container-two"></div>
          </div>
          <div
            className="mens-bottom-category-card"
            id={activeClass.classThree}
            onClick={() => {
              setActiveClass({
                ...activeClass,
                classOne: "",
                classTwo: "",
                classThree: "active-class-women",
                classFour: "",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-three">
              <div className="image-content-three">
                <img src="wBottom.jfif" alt="" />
              </div>
            </div>
            <div className="content-container-three">
              <h1>Bottom</h1>
              <img src="wBottom.jfif" className="background-image-two" alt="" />
              <div className="glass-slate-three">
                <h1>Women Trousers</h1>
                <p>
                  “To be noticed without striving to be noticed, this is what
                  elegance is about.”, Try our trousers to thrive your way...
                </p>
                <Link to={"/women-bottoms"}>
                  <button>View Products</button>
                </Link>
              </div>
            </div>
            <div className="design-container-three"></div>
          </div>
          <div
            className="mens-footwear-category-card"
            id={activeClass.classFour}
            onClick={() => {
              setActiveClass({
                ...activeClass,
                classOne: "",
                classTwo: "",
                classThree: "",
                classFour: "active-class-women",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-four">
              <div className="image-content-four">
                <img src="wFoot2.jfif" alt="" />
              </div>
            </div>
            <div className="content-container-four">
              <h1>Footwear</h1>
              <img
                src="wFoot2.jfif"
                alt=""
                className="background-image-three"
              />
              <div className="glass-slate-four">
                <h1>Women Footwears</h1>
                <p>
                  “Shoes transform your body language and attitude. They lift
                  you physically and emotionally.”, Build your confidence with
                  our women shoes collection...
                </p>
                <Link to={"/women-footwears"}>
                  <button>View Products</button>
                </Link>
              </div>
            </div>
            <div className="design-container-four"></div>
          </div>
          <div
            className="mens-accessories-category-card"
            id={activeClass.classFive}
            onClick={() => {
              setActiveClass({
                ...activeClass,
                classOne: "",
                classTwo: "",
                classThree: "",
                classFour: "",
                classFive: "active-class-women",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-five">
              <div className="image-content-five">
                <img src="wAcces2.png" alt="" />
              </div>
            </div>
            <div className="content-container-five">
              <h1>Accessories</h1>
              <img
                src="wAcces2.png"
                alt=""
                className="background-image-four"
                style={{ top: "-96%" }}
              />
              <div className="glass-slate-five">
                <h1>Women Accessories</h1>
                <p>
                  “Create your own visual style… Let it be unique for yourself
                  and yet identifiable for others.”, Find your unique
                  accessories only on Arcane...
                </p>
                <Link to={"/women-accessories"}>
                  <button>View Products</button>
                </Link>
              </div>
            </div>
            <div className="design-container-five"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
