import React, { useEffect, useState } from "react";
import "./address.css";
import { axiosIntance as axios } from "../../MyComponents/Base-Url/AxiosInstance";

const Address = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    locality: "",
    address: "",
    cityDistrictTown: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });
  const [fieldSetOne, setFieldSetOne] = useState({
    fullname: false,
    fullnameFilled: false,
    phoneNumber: false,
    phoneNumberFilled: false,
  });
  const [fieldSetTwo, setFieldSetTwo] = useState({
    pincode: false,
    pincodeFilled: false,
    address: false,
    addressFilled: false,
    locality: false,
    localityFilled: false,
    landmark: false,
    landmarkFilled: false,
  });
  const [fieldSetThree, setFieldSetThree] = useState({
    city: false,
    cityFilled: false,
    state: false,
    stateFilled: false,
  });
  const [fieldSetFour, setFieldSetFour] = useState({
    alternate: false,
    alternateFilled: false,
    type: false,
    typeFilled: false,
  });

  const handleName = (e) => {
    if (e.target.value !== "") {
      setFieldSetOne({ ...fieldSetOne, fullnameFilled: true });
      setUserDetails({ ...userDetails, name: e.target.value });
    } else {
      setFieldSetOne({ ...fieldSetOne, fullnameFilled: false });
    }
  };

  const handlePhone = (e) => {
    if (e.target.value !== "") {
      setFieldSetOne({ ...fieldSetOne, phoneNumberFilled: true });
      setUserDetails({ ...userDetails, mobileNumber: e.target.value });
    } else {
      setFieldSetOne({ ...fieldSetOne, phoneNumberFilled: false });
    }
  };

  const handlePincode = (e) => {
    if (e.target.value !== "") {
      setFieldSetTwo({ ...fieldSetTwo, pincodeFilled: true });
      setUserDetails({ ...userDetails, pinCode: e.target.value });
    } else {
      setFieldSetTwo({ ...fieldSetTwo, pincodeFilled: false });
    }
  };

  const handleLocality = (e) => {
    if (e.target.value !== "") {
      setFieldSetTwo({ ...fieldSetTwo, localityFilled: true });
      setUserDetails({ ...userDetails, locality: e.target.value });
    } else {
      setFieldSetTwo({ ...fieldSetTwo, localityFilled: false });
    }
  };

  const handleAddress = (e) => {
    if (e.target.value !== "") {
      setFieldSetTwo({ ...fieldSetTwo, addressFilled: true });
      setUserDetails({ ...userDetails, address: e.target.value });
    } else {
      setFieldSetTwo({ ...fieldSetTwo, addressFilled: false });
    }
  };

  const handleCity = (e) => {
    if (e.target.value !== "") {
      setFieldSetThree({ ...fieldSetThree, cityFilled: true });
      setUserDetails({ ...userDetails, cityDistrictTown: e.target.value });
    } else {
      setFieldSetThree({ ...fieldSetThree, cityFilled: false });
    }
  };

  const handleState = (e) => {
    if (e.target.value !== "") {
      setFieldSetThree({ ...fieldSetThree, stateFilled: true });
      setUserDetails({ ...userDetails, state: e.target.value });
    } else {
      setFieldSetThree({ ...fieldSetThree, stateFilled: false });
    }
  };

  const handleLandmark = (e) => {
    if (e.target.value !== "") {
      setFieldSetTwo({ ...fieldSetTwo, landmarkFilled: true });
      setUserDetails({ ...userDetails, landmark: e.target.value });
    } else {
      setFieldSetTwo({ ...fieldSetTwo, landmarkFilled: false });
    }
  };

  const handleAlternate = (e) => {
    if (e.target.value !== "") {
      setFieldSetFour({ ...fieldSetFour, alternateFilled: true });
      setUserDetails({ ...userDetails, alternatePhone: e.target.value });
    } else {
      setFieldSetFour({ ...fieldSetFour, alternateFilled: false });
    }
  };

  const handleType = (e) => {
    if (e.target.value !== "") {
      setFieldSetFour({ ...fieldSetFour, typeFilled: true });
      setUserDetails({ ...userDetails, addressType: e.target.value });
    } else {
      setFieldSetFour({ ...fieldSetFour, typeFilled: false });
    }
  };

  const handleOnAddAddress = () => {
    const rectObj = {
      name: "",
      mobileNumber: "",
      pinCode: "",
      locality: "",
      address: "",
      cityDistrictTown: "",
      state: "",
      landmark: "",
      alternatePhone: "",
      addressType: "",
    };

    if (JSON.stringify(userDetails) !== JSON.stringify(rectObj)) {
      axios
        .post("/user/address/create", { payload: { address: userDetails } })
        .then((x) => {
          window.location.reload(true);
        });
    }
  };

  const handleOnEditAddress = () => {
    setUserDetails({ ...userDetails, _id: props?.address[0]?._id });
    const rectObj = {
      name: "",
      mobileNumber: "",
      pinCode: "",
      locality: "",
      address: "",
      cityDistrictTown: "",
      state: "",
      landmark: "",
      alternatePhone: "",
      addressType: "",
      _id: undefined,
    };

    if (JSON.stringify(userDetails) !== JSON.stringify(rectObj)) {
      axios
        .post("/user/address/create", { payload: { address: userDetails } })
        .then((x) => {
          window.location.reload(true);
        });
    }
  };

  useEffect(() => {
    if (props?.boolean) {
      setFieldSetOne({
        fullname: false,
        fullnameFilled: true,
        phoneNumber: false,
        phoneNumberFilled: true,
      });
      setFieldSetTwo({
        pincode: false,
        pincodeFilled: true,
        address: false,
        addressFilled: true,
        locality: false,
        localityFilled: true,
        landmark: false,
        landmarkFilled: true,
      });
      setFieldSetThree({
        city: false,
        cityFilled: true,
        state: false,
        stateFilled: true,
      });
      setFieldSetFour({
        alternate: false,
        alternateFilled: true,
        type: false,
        typeFilled: true,
      });
    }
  }, [props]);

  return (
    <div className="add-address-slate-container">
      {props?.boolean ? <h2>Edit address</h2> : <h2>Add a new address</h2>}
      <div className="field-set-one">
        <div
          className="field-container"
          onFocus={() => {
            setFieldSetOne({ ...fieldSetOne, fullname: true });
          }}
          onBlur={() => {
            setFieldSetOne({ ...fieldSetOne, fullname: false });
          }}
        >
          <label
            htmlFor="fullname"
            className="field-label"
            id={
              fieldSetOne.fullnameFilled
                ? `${fieldSetOne.fullnameFilled}`
                : `${fieldSetOne.fullname}`
            }
          >
            Name
          </label>
          <input
            type="text"
            name="fullname"
            className="field-inp"
            id="fullname"
            onChange={(e) => handleName(e)}
            defaultValue={props?.boolean ? props?.address[0]?.name : ""}
          />
        </div>
        <div
          className="field-container"
          onFocus={() => {
            setFieldSetOne({ ...fieldSetOne, phoneNumber: true });
          }}
          onBlur={() => {
            setFieldSetOne({ ...fieldSetOne, phoneNumber: false });
          }}
        >
          <label
            htmlFor="phone-number"
            className="field-label"
            id={
              fieldSetOne.phoneNumberFilled
                ? `${fieldSetOne.phoneNumberFilled}`
                : `${fieldSetOne.phoneNumber}`
            }
          >
            Phone number
          </label>
          <input
            type="text"
            name="phonenumber"
            className="field-inp"
            id="phone-number"
            onChange={(e) => handlePhone(e)}
            defaultValue={props?.boolean ? props?.address[0]?.mobileNumber : ""}
          />
        </div>
      </div>
      <div className="field-set-two">
        <div
          className="field-two-container"
          onFocus={() => {
            setFieldSetTwo({ ...fieldSetTwo, pincode: true });
          }}
          onBlur={() => {
            setFieldSetTwo({ ...fieldSetTwo, pincode: false });
          }}
        >
          <label
            htmlFor="pincode"
            className="field-two-label"
            id={
              fieldSetTwo.pincodeFilled
                ? `${fieldSetTwo.pincodeFilled}`
                : `${fieldSetTwo.pincode}`
            }
          >
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            className="field-inp"
            id="pincode"
            onChange={(e) => handlePincode(e)}
            defaultValue={props?.boolean ? props?.address[0]?.pinCode : ""}
          />
        </div>
        <div
          className="field-two-container"
          onFocus={() => {
            setFieldSetTwo({ ...fieldSetTwo, address: true });
          }}
          onBlur={() => {
            setFieldSetTwo({ ...fieldSetTwo, address: false });
          }}
        >
          <label
            htmlFor="address"
            className="field-two-label"
            id={
              fieldSetTwo.addressFilled
                ? `${fieldSetTwo.addressFilled}`
                : `${fieldSetTwo.address}`
            }
          >
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            name="address"
            className="field-two-inp"
            id="address"
            onChange={(e) => handleAddress(e)}
            defaultValue={props?.boolean ? props?.address[0]?.address : ""}
          />
        </div>
        <div
          className="field-two-container"
          onFocus={() => {
            setFieldSetTwo({ ...fieldSetTwo, locality: true });
          }}
          onBlur={() => {
            setFieldSetTwo({ ...fieldSetTwo, locality: false });
          }}
        >
          <label
            htmlFor="locality"
            className="field-two-label"
            id={
              fieldSetTwo.localityFilled
                ? `${fieldSetTwo.localityFilled}`
                : `${fieldSetTwo.locality}`
            }
          >
            Area, Street, Sector, Village
          </label>
          <input
            type="text"
            name="locality"
            className="field-inp"
            id="locality"
            onChange={(e) => handleLocality(e)}
            defaultValue={props?.boolean ? props?.address[0]?.locality : ""}
          />
        </div>
        <div
          className="field-two-container"
          onFocus={() => {
            setFieldSetTwo({ ...fieldSetTwo, landmark: true });
          }}
          onBlur={() => {
            setFieldSetTwo({ ...fieldSetTwo, landmark: false });
          }}
        >
          <label
            htmlFor="landmark"
            className="field-two-label"
            id={
              fieldSetTwo.landmarkFilled
                ? `${fieldSetTwo.landmarkFilled}`
                : `${fieldSetTwo.landmark}`
            }
          >
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            className="field-two-inp"
            id="landmark"
            onChange={(e) => handleLandmark(e)}
            defaultValue={props?.boolean ? props?.address[0]?.landmark : ""}
          />
        </div>
      </div>
      <div className="field-set-three">
        <div
          className="field-three-container"
          onFocus={() => {
            setFieldSetThree({ ...fieldSetThree, city: true });
          }}
          onBlur={() => {
            setFieldSetThree({ ...fieldSetThree, city: false });
          }}
        >
          <label
            htmlFor="city"
            className="field-three-label"
            id={
              fieldSetThree.cityFilled
                ? `${fieldSetThree.cityFilled}`
                : `${fieldSetThree.city}`
            }
          >
            City/Town
          </label>
          <input
            type="text"
            name="city"
            className="field-three-inp"
            id="city"
            onChange={(e) => handleCity(e)}
            defaultValue={
              props?.boolean ? props?.address[0]?.cityDistrictTown : ""
            }
          />
        </div>
        <div
          className="field-three-container"
          onFocus={() => {
            setFieldSetThree({ ...fieldSetThree, state: true });
          }}
          onBlur={() => {
            setFieldSetThree({ ...fieldSetThree, state: false });
          }}
        >
          <label
            htmlFor="state"
            className="field-three-label"
            id={
              fieldSetThree.stateFilled
                ? `${fieldSetThree.stateFilled}`
                : `${fieldSetThree.state}`
            }
          >
            Choose a state
          </label>
          <select
            name="state"
            className="field-three-inp"
            id="state"
            onChange={(e) => handleState(e)}
            defaultValue={props?.boolean ? props?.address[0]?.state : ""}
          >
            <option value=""></option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
      </div>
      <div className="field-set-four">
        <div
          className="field-four-container"
          onFocus={() => {
            setFieldSetFour({ ...fieldSetFour, alternate: true });
          }}
          onBlur={() => {
            setFieldSetFour({ ...fieldSetFour, alternate: false });
          }}
        >
          <label
            htmlFor="alternatephonenumber"
            className="field-four-label"
            id={
              fieldSetFour.alternateFilled
                ? `${fieldSetFour.alternateFilled}`
                : `${fieldSetFour.alternate}`
            }
          >
            Alternate phone
          </label>
          <input
            type="text"
            name="alternatephonenumber"
            className="field-four-inp"
            id="alternatephonenumber"
            onChange={(e) => handleAlternate(e)}
            defaultValue={
              props?.boolean ? props?.address[0]?.alternatePhone : ""
            }
          />
        </div>
        <div
          className="field-four-container"
          onFocus={() => {
            setFieldSetFour({ ...fieldSetFour, type: true });
          }}
          onBlur={() => {
            setFieldSetFour({ ...fieldSetFour, type: false });
          }}
        >
          <label
            htmlFor="type"
            className="field-four-label"
            id={
              fieldSetFour.typeFilled
                ? `${fieldSetFour.typeFilled}`
                : `${fieldSetFour.type}`
            }
          >
            Address type
          </label>
          <select
            name="type"
            className="field-four-inp"
            id="type"
            onChange={(e) => handleType(e)}
            defaultValue={props?.boolean ? props?.address[0]?.addressType : ""}
          >
            <option value=""></option>
            <option value="Home">Home (7am - 9pm delivery)</option>
            <option value="Office">
              Office/Commercial (10am - 6pm delivery)
            </option>
          </select>
        </div>
      </div>
      <div className="add-address-btn-container">
        {props?.boolean ? (
          <button onClick={() => handleOnEditAddress()}>Save</button>
        ) : (
          <button onClick={() => handleOnAddAddress()}>Add address</button>
        )}
      </div>
    </div>
  );
};

export default Address;
