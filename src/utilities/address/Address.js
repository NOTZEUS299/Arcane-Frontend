import { useEffect, useState } from "react";
import "./address.css";
import { axiosIntance as axios } from "../../MyComponents/Base-Url/AxiosInstance";

const Address = () => {
  const [addressData, setAddressData] = useState();
  const [address, setAddress] = useState(false);

  const closeAddField = () => {
    setAddressData(!undefined);
    setAddress(!address);
  };

  const createAddress = () => {
    const add = {
      address: {
        name: "asdf",
        mobileNumber: "1234",
        pinCode: "1234",
        locality: "1234",
        address: "1234",
        cityDistrictTown: "1234",
        state: "2314",
        landmark: "1234",
        alternatePhone: "1234",
        addressType: "home",
      },
    };

    axios.post("/user/address/create", add).then((x) => {
      console.log(x);
    });
  };

  useEffect(() => {
    axios.get("/user/getaddress").then((x) => {
      setAddressData(x);
    });
  }, [address]);

  useEffect(() => {
    axios.get("/user/getaddress").then((x) => {
      setAddressData(x);
    });
  }, []);

  if (addressData === undefined) {
    return (
      <div className="address-field-container">
        <div className="address-field-tab">
          <div
            className="address-field-close-btn"
            onClick={() => closeAddField()}
          ></div>
          <div onClick={() => createAddress()}>sfsfs</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Address;
