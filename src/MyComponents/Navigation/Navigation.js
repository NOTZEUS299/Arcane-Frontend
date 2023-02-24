import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

export const Navigation = () => {
  const [nav, setNav] = useState("");

  const path = useLocation().pathname;

  useEffect(() => {
    if (
      path === "/men" ||
      path === "/men-outfits" ||
      path === "/men-tops" ||
      path === "/men-bottoms" ||
      path === "/men-footwears" ||
      path === "/men-accessories"
    ) {
      setNav("men");
    }
    if (
      path === "/women" ||
      path === "/women-outfits" ||
      path === "/women-tops" ||
      path === "/women-bottoms" ||
      path === "/women-footwears" ||
      path === "/women-accessories"
    ) {
      setNav("women");
    }
  }, [path]);

  return (
    <div>
      <div className="men-top-bar">
        <div className="men-navigation-bar">
          <div>
            <li>
              <NavLink to={`/${nav}-outfits`} className="navList-comClass">
                Outfits
              </NavLink>
            </li>
            <div></div>
          </div>
          <div>
            <li>
              <NavLink to={`/${nav}-tops`} className="navList-comClass">
                Top
              </NavLink>
            </li>
            <div></div>
          </div>
          <div>
            <li>
              <NavLink to={`/${nav}-bottoms`} className="navList-comClass">
                Bottom
              </NavLink>
            </li>
            <div></div>
          </div>
          <div>
            <li>
              <NavLink to={`/${nav}-footwears`} className="navList-comClass">
                Foot wear
              </NavLink>
            </li>
            <div></div>
          </div>
          <div>
            <li>
              <NavLink to={`/${nav}-accessories`} className="navList-comClass">
                Accessories
              </NavLink>
            </li>
            <div></div>
          </div>
        </div>
        <span>|</span>
        <div className="men-advrtse-bar">
          <div className="men-advrts">
            <span>CHECKOUT OVERSIZE T-SHIRTS | DESIGNER WARDROBE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
