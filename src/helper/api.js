import React from "react";

export const Temp = () => {
  let categoryApi = [
    {
      post: "/category/create",
      payload: {
        name: "test",
        parentId: "xyz",
      },
    },
    {
      post: "/category/update",
      payload: {
        _id: "62f0cd51e4028a70e51c8e20",
        name: "sub test",
        parentId: "62f0cca1e4028a70e51c8e1e",
        type: "store",
      },
    },
    {
      post: "/category/delete",
      payload: {
        ids: [
          {
            _id: "62f0cd51e4028a70e51c8e20",
          },
        ],
      },
    },
    {
      get: "/category/getcategory",
    },
  ];
  let productApi = [
    {
      post: "/product/create",
      payload: {
        name: "xyz",
        quantity: 12,
        price: 12,
        description: "na",
        category: "62f0ad845d8b837d553e5ffc",
        productPicture: "(binary)",
      },
    },
    {
      delete: "product/deleteProductById",
      payload: {
        productId: "62f0d116d4cfcd55a8f22688",   
      },
    },
    {
      get: "product/getProducts",
    },
    {
      get: "/products/:slug",
    },
    {
      get: "/product/:productId",
    },
  ];
  let cartApi = [
    {
      post: "/user/cart/addtocart",
      cartItems: [
        {
          product: "62f0d25dd4cfcd55a8f22690",
          quantity: 1,
          price: 120,
        },
      ],
    },
    {
      post: "/user/cart/removeItem",
      payload: {
        productId: "54s34687654674",
      },
    },
    {
      get: "/user/getCartItems",
    },
  ];
  let userAuth = [
    {
      post: "/signup",
      payload: {
        firstName: "xyz",
        lastName: "abc",
        email: "xyz@gmail.com",
        password: "xa",
      },
    },
    {
      post: "/signin",
      payload: {
        email: "xyz@gmail.com",
        password: "xa",
      },
    },
    {
      post: "/signout",
    },
  ];
  let adminAuth = [
    {
      post: "/admin/signup",
      payload: {
        firstName: "xyz",
        lastName: "abc",
        email: "xyz@gmail.com",
        password: "xa",
      },
    },
    {
      post: "/admin/signin",
      payload: {
        email: "xyz@gmail.com",
        password: "xa",
      },
    },
    {
      post: "/admin/signout",
    },
  ];
  let addressApi = [
    {
      post: "/user/address/create",
      payload: {
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
      },
    },
    {
      get: "/user/getaddress",
    },
  ];
  let orderApi = [
    {
      post: "/addOrder",
      payload: {
        totalAmount: 45,
        items: [
          {
            productId: "62f0d25dd4cfcd55a8f22690",
            payablePrice: 45,
            purchasedQty: 1,
          },
          {
            productId: "62f0d25dd4cfcd55a8f22690",
            payablePrice: 45,
            purchasedQty: 1,
          },
        ],
        paymentStatus: "pending",
        paymentType: "cod",
      },
    },
    {
      post: "/order/update",
      payload: {
        orderId: "23165413464321",
        type: "delivered",
      },
    },
    {
      post: "/getOrder",
      payload: {
        orderId: "546423465135743",
      },
    },
    {
      get: "/getOrders",
    },
    {
      get: "/order/getCustomerOrders",
    },
  ];
  return <div>Temp</div>;
};