import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Header";
import "./men.css";

export const Men = () => {
  const [activeClass, setActiveClass] = useState({});
  const [switchHover, setSwitchHover] = useState("intialHover");

  useEffect(() => {
    document.title = "Arcane | Men";
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
                classOne: "active-class",
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
                <img src="outfit-mockup.jpg" alt="" />
              </div>
            </div>
            <div className="content-container-one">
              <h1>Outfits</h1>
              <img
                src="outfit-mockup.jpg"
                alt=""
                className="background-image"
              />
              <div className="glass-slate-one">
                <h1>Men Outfits</h1>
                <p>
                  "Remind yourself. Nobody built like you, you design
                  yourself.", Checkout some fresh outfits now
                </p>
                <Link to={"/men-outfits"}>
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
                classTwo: "active-class",
                classThree: "",
                classFour: "",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-two">
              <div className="image-content-two">
                <img src="top-mockups.jpg" alt="" />
              </div>
            </div>
            <div className="content-container-two">
              <h1>Top</h1>
              <img
                src="top-mockups.jpg"
                className="background-image-one"
                // id="bg-image-two"
                alt=""
              />
              <div className="glass-slate-two">
                <h1>Men Tops</h1>
                <p>
                  “Fashion is what you’re offered four times a year by
                  designers. And style is what you choose.” So style your way as
                  you like...
                </p>
                <Link to={"/men-tops"}>
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
                classThree: "active-class",
                classFour: "",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-three">
              <div className="image-content-three">
                <img src="pant-mockup.jpg" alt="" />
              </div>
            </div>
            <div className="content-container-three">
              <h1>Bottom</h1>
              <img
                src="pant-mockup.jpg"
                className="background-image-two"
                alt=""
              />
              <div className="glass-slate-three">
                <h1>Men Trousers</h1>
                <p>
                  “To be noticed without striving to be noticed, this is what
                  elegance is about.”, Try our trousers to thrive your way...
                </p>
                <Link to={"/men-bottoms"}>
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
                classFour: "active-class",
                classFive: "",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-four">
              <div className="image-content-four">
                <img src="shoe-mockup.jpg" alt="" />
              </div>
            </div>
            <div className="content-container-four">
              <h1>Footwear</h1>
              <img
                src="shoe-mockup.jpg"
                alt=""
                className="background-image-three"
              />
              <div className="glass-slate-four">
                <h1>Men Footwears</h1>
                <p>
                  “Shoes transform your body language and attitude. They lift
                  you physically and emotionally.”, Build your confidence with
                  our men shoes collection...
                </p>
                <Link to={"/men-footwears"}>
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
                classFive: "active-class",
              });
              setSwitchHover("stateTwohover");
            }}
          >
            <div className="image-container-five">
              <div className="image-content-five">
                <img src="accessories-mockup.jpg" alt="" />
              </div>
            </div>
            <div className="content-container-five">
              <h1>Accessories</h1>
              <img
                src="accessories-mockup.jpg"
                alt=""
                className="background-image-four"
              />
              <div className="glass-slate-five">
                <h1>Men Footwears</h1>
                <p>
                  “Create your own visual style… Let it be unique for yourself
                  and yet identifiable for others.”, Find your unique
                  accessories only on Arcane...
                </p>
                <Link to={"/men-accessories"}>
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
