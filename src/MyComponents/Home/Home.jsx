import React, { useEffect } from "react";
import "./home.css";
import { Header } from "../../Header";
import { FaRupeeSign } from "react-icons/fa";
import { TbCrown } from "react-icons/tb";
import { WiStars } from "react-icons/wi";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useAtom } from "jotai";
import { ProductData } from "../../helper/Jotai";
import { generatePublicUrl as imagePath } from "../Base-Url/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [Productdata] = useAtom(ProductData);

  const navigate = useNavigate();

  const limitedDeals = Productdata.filter((x) => {
    return x.description.secion == "01";
  });

  const newArrivals = Productdata.filter((x) => {
    return x.description.secion == "03";
  });

  const dailyWear = Productdata.filter((x) => {
    return x.description.secion == "04";
  });

  const viewProduct = (id) => {
    navigate({
      pathname: `/product/${id}`,
    });
  };

  useEffect(() => {
    document.title = "Arcane | Home";
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="homebody">
        <div className="advrtsbar">
          <div className="topcntntsale">
            <p>20% OFF ON FRESH LAUNCH | SHOP NOW</p>
          </div>
        </div>
        <div className="imageslider">
          <div className="imgesbg">
            {" "}
            <Swiper
              loop={true}
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              navigation
              autoplay={{ delay: 3000 }}
            >
              <SwiperSlide>
                <div className="imgclss" id="imgbgone">
                  <div className="mainimgesdiv" id="imgone">
                    <div className="mainslideone">
                      <h1>CHECK OUT OUR COMFORTING</h1>
                      <h1>
                        <span
                          style={{
                            background:
                              "url(https://image.shutterstock.com/image-photo/blue-jean-background-260nw-137545088.jpg)",
                            color: "black",
                          }}
                          id="stylingone"
                        >
                          CASUAL WEAR
                        </span>{" "}
                        | STARTING FROM{" "}
                        <span id="stylingtwo">
                          <FaRupeeSign style={{ fontSize: "75%" }} />
                          3999
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgtwo">
                  <div className="mainimgesdiv" id="imgseven">
                    <div className="mainslidetwo">
                      <div>
                        <h1>GET 10% OFF ON DAILY ACCESSORRIES</h1>
                        <h1>ALSO GET YOUR FRESH COLLECTON OF WATCHES </h1>
                      </div>
                      <h1 style={{ background: "red" }}>TODAY</h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgthree">
                  <div className="mainimgesdiv" id="imgtwo">
                    <div className="mainslidethree">
                      <h1 className="slidethreeanione">STAY TRENDY WITH OUR</h1>
                      <h1 className="slidethreeanitwo">
                        <span className="stylingthree">MONSOON</span> COLLECTION{" "}
                      </h1>
                      <h1 className="slidethreeanione">
                        STARTING FROM{" "}
                        <span className="stylingfour">
                          <FaRupeeSign
                            style={{
                              fontSize: "75%",
                            }}
                          />
                          1999
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgfour">
                  <div className="mainimgesdiv" id="imgthree">
                    <div className="mainslidefour">
                      <h1>
                        DISCOVER OUR{" "}
                        <span className="stylingfive">LIMITED EDITIONS</span>{" "}
                        FROM
                      </h1>
                      <h1>
                        <span className="stylingsix">DESIGNERS</span> WARDROBES
                        STARTING FROM |{" "}
                        <span className="stylingseven">
                          <FaRupeeSign style={{ fontSize: "75%" }} />
                          4999
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgfive">
                  <div className="mainimgesdiv" id="imgsix"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgsix">
                  <div className="mainimgesdiv" id="imgfour"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgseven">
                  <div className="mainimgesdiv" id="imgeight"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgeight">
                  <div className="mainimgesdiv" id="imgfive"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgnine">
                  <div className="mainimgesdiv" id="imgnine"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgclss" id="imgbgten">
                  <div className="mainimgesdiv" id="imgten"></div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div className="slidesCntnt">
        <div id="Limited-Edition"></div>
        <div className="slidecntntOne">
          <fieldset className="fieldOne">
            <legend className="legendOne">
              {" "}
              <div className="lediv">
                Limited Deals
                <TbCrown className="lecrown" />
              </div>
            </legend>
            <div className="SlideShowOne">
              <Swiper
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 3.1,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 6,
                  },
                  2560: {
                    slidesPerView: 9,
                  },
                }}
                loop={true}
                navigation
                autoplay={{ delay: 4000 }}
              >
                {limitedDeals.map((x, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="TrendingCards" id={x._id}>
                        <div className="image-container-card">
                          <img
                            src={imagePath(x?.productPictures[0]?.img)}
                            alt=""
                            onClick={() => {
                              console.log("clicked");
                            }}
                          />
                        </div>
                        <div className="this-Content-card-hover">
                          <h1 onClick={() => viewProduct(x?._id)}>
                            View Product
                          </h1>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </fieldset>
        </div>{" "}
        {/* <div id="Hottest-Deals"></div>
        <div className="slidecntntTwo" style={{ marginTop: "45px" }}>
          <fieldset className="fieldFour">
            <legend className="legendFour">
              <span style={{ marginRight: "20px" }}>H</span>
              <MdOutlineLocalFireDepartment
                className="firefordeals"
                style={{ color: "white", margin: "0", padding: "0" }}
              />
              ttest Deals
            </legend>
            <div className="SlideShowTwo">
              <Swiper
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 3.1,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 6,
                  },
                  2560: {
                    slidesPerView: 9,
                  },
                }}
                loop={true}
                navigation
                autoplay={{
                  delay: 3000,
                }}
              >
                <SwiperSlide>
                  <div className="TrendingCards">
                    <div className="image-container-card">
                      <img
                        src=""
                        alt=""
                        onClick={() => {
                          console.log("clicked");
                        }}
                      />
                    </div>
                    <div className="this-Content-card-hover">
                      <h1>View Product</h1>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </fieldset>
        </div> */}
        <div id="New-Arrivals"></div>
        <div className="slidecntntTwo" style={{ marginTop: "45px" }}>
          <fieldset className="fieldThree">
            <legend className="legendThree">
              New Arrivals
              <WiStars className="starsNewArr" style={{ color: "white" }} />
            </legend>
            <div className="SlideShowTwo">
              <Swiper
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 3.1,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 6,
                  },
                  2560: {
                    slidesPerView: 9,
                  },
                }}
                loop={true}
                navigation
                autoplay={{
                  delay: 3000,
                  reverseDirection: true,
                }}
              >
                {newArrivals.map((x, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="TrendingCards">
                        <div className="image-container-card">
                          <img
                            src={imagePath(x?.productPictures[0]?.img)}
                            alt=""
                            onClick={() => {
                              console.log("clicked");
                            }}
                          />
                        </div>
                        <div className="this-Content-card-hover">
                          <h1 onClick={() => viewProduct(x?._id)}>
                            View Product
                          </h1>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </fieldset>
        </div>
        <div id="Daily-Wear"></div>
        <div className="slidecntntTwo" style={{ marginTop: "45px" }}>
          <fieldset className="fieldTwo">
            <legend className="legendTwo">Daily Wear</legend>
            <div className="SlideShowTwo">
              <Swiper
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 3.1,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 6,
                  },
                  2560: {
                    slidesPerView: 9,
                  },
                }}
                loop={true}
                navigation
                autoplay={{
                  delay: 3000,
                  reverseDirection: true,
                }}
              >
                {dailyWear.map((x, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="TrendingCards">
                        <div className="image-container-card">
                          <img
                            src={imagePath(x?.productPictures[0]?.img)}
                            alt=""
                            onClick={() => {
                              console.log("clicked");
                            }}
                          />
                        </div>
                        <div className="this-Content-card-hover">
                          <h1 onClick={() => viewProduct(x?._id)}>
                            View Product
                          </h1>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
