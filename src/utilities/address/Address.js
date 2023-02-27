import React, { useState } from "react";
import "./address.css";

const Address = () => {
  const [fieldSetOne, setFieldSetOne] = useState({
    fullname: false,
    phoneNumber: false,
  });
  const [fieldSetTwo, setFieldSetTwo] = useState({
    pincode: false,
    address: false,
    locality: false,
    landmark: false,
  });
  const [fieldSetThree, setFieldSetThree] = useState({
    city: false,
    state: false,
  });
  const [fieldSetFour, setFieldSetFour] = useState({
    alternate: false,
    type: false,
  });
  return (
    <div className="add-address-slate-container">
      <h2>Add a new address</h2>
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
            id={`${fieldSetOne.fullname}`}
          >
            Name
          </label>
          <input
            type="text"
            name="fullname"
            className="field-inp"
            id="fullname"
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
            id={`${fieldSetOne.phoneNumber}`}
          >
            Phone number
          </label>
          <input
            type="text"
            name="phonenumber"
            className="field-inp"
            id="phone-number"
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
            id={`${fieldSetTwo.pincode}`}
          >
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            className="field-inp"
            id="pincode"
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
            id={`${fieldSetTwo.address}`}
          >
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            name="address"
            className="field-two-inp"
            id="address"
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
            id={`${fieldSetTwo.locality}`}
          >
            Area, Street, Sector, Village
          </label>
          <input
            type="text"
            name="locality"
            className="field-inp"
            id="locality"
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
            id={`${fieldSetTwo.landmark}`}
          >
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            className="field-two-inp"
            id="landmark"
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
            id={`${fieldSetThree.city}`}
          >
            City/Town
          </label>
          <input
            type="text"
            name="city"
            className="field-three-inp"
            id="city"
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
            id={`${fieldSetThree.state}`}
          >
            Choose a state
          </label>
          <select name="state" className="field-three-inp" id="state">
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
            id={`${fieldSetFour.alternate}`}
          >
            Alternate phone
          </label>
          <input
            type="text"
            name="alternatephonenumber"
            className="field-four-inp"
            id="alternatephonenumber"
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
            id={`${fieldSetFour.type}`}
          >
            Address type
          </label>
          <select name="type" className="field-four-inp" id="type">
            <option value=""></option>
            <option value="Home">Home (7am - 9pm delivery)</option>
            <option value="Office">
              Office/Commercial (10am - 6pm delivery)
            </option>
          </select>
        </div>
      </div>
      <div className="add-address-btn-container">
        <button>Add address</button>
      </div>
    </div>
  );
};

export default Address;
