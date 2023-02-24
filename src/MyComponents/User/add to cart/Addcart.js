import React from "react";

const Addcart = () => {
  return (
    <div>
      {addToCart && (
        <div
          className="add-to-cart-pop-up"
          style={{ overflowY: "hidden", overflowX: "visible" }}
          id={popUpId}
        >
          <BsFillCaretRightFill
            className="add-to-cart-close-button"
            onClick={() => {
              // setAddToCart(false);
              setQuantity(1);
              setPopUpId("add-to-cart-pop-up-close");
              setTimeout(() => {
                setPopUpId("");
                setAddToCart(false);
              }, 500);
            }}
          />
          <div>
            <div className="add-to-cart-product-image">
              <img src={imagePath(cartData?.productPictures[0]?.img)} alt="" />
            </div>
          </div>
          <div className="flex-content-add-to-cart">
            <div className="add-to-cart-name">{cartData?.name}</div>
            <hr />
            <div className="input-quantity-div">
              <div
                className="plus-minus-button"
                id="minus-button"
                onClick={() => {
                  if (quantity <= 1) {
                    setQuanButtons({ ...quanButtons, minus: "#898989" });
                  } else {
                    setQuantity(quantity - 1);
                    setQuanButtons({
                      ...quanButtons,
                      minus: "#5a5a5a",
                      plus: "#5a5a5a",
                    });
                  }
                }}
                onMouseOut={() => {
                  if (quantity <= 1) {
                    setQuanButtons({ ...quanButtons, minus: "#898989" });
                  } else {
                    setQuanButtons({
                      ...quanButtons,
                      minus: "#5a5a5a",
                      plus: "#5a5a5a",
                    });
                  }
                }}
              >
                <BsFillCaretLeftSquareFill
                  style={{
                    color: quanButtons.minus,
                    transform: "rotate(-90deg)",
                  }}
                />
              </div>
              <input
                type="number"
                name="quantity-num"
                id="add-to-cart-quantity"
                value={quantity}
                step={1}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <div
                className="plus-minus-button"
                id="plus-button"
                onClick={() => {
                  if (quantity >= 10) {
                    setQuanButtons({
                      ...quanButtons,
                      plus: "#898989",
                    });
                  } else {
                    setQuantity(quantity + 1);
                    setQuanButtons({
                      ...quanButtons,
                      minus: "#5a5a5a",
                      plus: "#5a5a5a",
                    });
                  }
                }}
                onMouseOut={() => {
                  if (quantity >= 10) {
                    setQuanButtons({
                      ...quanButtons,
                      plus: "#898989",
                    });
                  } else {
                    setQuanButtons({
                      ...quanButtons,
                      minus: "#5a5a5a",
                      plus: "#5a5a5a",
                    });
                  }
                }}
              >
                <BsFillCaretRightSquareFill
                  style={{
                    color: quanButtons.plus,
                    transform: "rotate(-90deg)",
                  }}
                />
              </div>
            </div>
            <div className="add-to-cart-buttons">
              <button
                onClick={() =>
                  createCartItemOnClick(
                    cartData?._id,
                    quantity,
                    cartData?.price
                  )
                }
              >
                Add To Cart <RiShoppingCartLine />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addcart;
