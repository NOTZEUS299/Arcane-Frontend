import "./app.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./MyComponents/Home/Home";
import { Men } from "./Categories/Men/Men";
import { Women } from "./Categories/Women/Women";
import { Favorite } from "./Categories/Favorite/Favorite";
import { Cart } from "./MyComponents/User/Cart/Cart";
import { SignUp } from "./MyComponents/User/User/Sign-Up/SignUp";
import { Login } from "./MyComponents/User/User/Login/Login";
import { axiosIntance as axios } from "./MyComponents/Base-Url/AxiosInstance";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { ProductData } from "./helper/Jotai";
import { Loader } from "./MyComponents/Loader/Loader";
import { MenOutfit } from "./Categories/Men/Sub Categories/Outfit/MenOutfit";
import { Profile } from "./MyComponents/User/User/Profile/Profile";
import { Protected } from "./MyComponents/User/User/Profile/Protected/Protected";
import { ViewProduct } from "./Categories/viewProduct/ViewProduct";
import { MenTop } from "./Categories/Men/Sub Categories/Top/MenTop";
import { MenBottom } from "./Categories/Men/Sub Categories/Bottom/MenBottom";
import { MenFootwear } from "./Categories/Men/Sub Categories/Footwear/MenFootwear";
import { MenAccessories } from "./Categories/Men/Sub Categories/Accessories/MenAccessories";
import { WomenOutfit } from "./Categories/Women/Sub Categories/Outfit/WomenOutfit";
import { WomenTop } from "./Categories/Women/Sub Categories/Top/WomenTop";
import { WomenBottom } from "./Categories/Women/Sub Categories/Bottom/WomenBottom";
import { WomenFootwear } from "./Categories/Women/Sub Categories/Footwear/WomenFootwear";
import { WomenAccessories } from "./Categories/Women/Sub Categories/Accessories/WomenAccessories";
import Order from "./utilities/order/Order";
import ProtectOrders from "./utilities/order/protected/ProtectOrders";
import Orders from "./MyComponents/User/userOrders/Orders";

function App() {
  const [, setData] = useAtom(ProductData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.post("product/getProducts").then((productObject) => {
      let ProductArray = [];
      productObject.data.products.map((data) => {
        const parsedData = {
          ...data,
          description: JSON.parse(data.description),
        };
        ProductArray = [...ProductArray, parsedData];
        setData(ProductArray);
        setLoading(false);
      });
    });
  }, []);

  // console.log(fvData);
  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/developing" element={<Loader />} />
        <Route path="/home" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="*" element={<Navigate to={"/home"} />} />
        <Route path="/men-outfits" element={<MenOutfit />} />
        <Route path="/men-tops" element={<MenTop />} />
        <Route path="/men-bottoms" element={<MenBottom />} />
        <Route path="/men-footwears" element={<MenFootwear />} />
        <Route path="/men-accessories" element={<MenAccessories />} />
        <Route path="/women-outfits" element={<WomenOutfit />} />
        <Route path="/women-tops" element={<WomenTop />} />
        <Route path="/women-bottoms" element={<WomenBottom />} />
        <Route path="/women-footwears" element={<WomenFootwear />} />
        <Route path="/women-accessories" element={<WomenAccessories />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route
          path="/pay-select/:id"
          element={
            <ProtectOrders>
              <Order />
            </ProtectOrders>
          }
        />
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </>
  );
}

export default App;
