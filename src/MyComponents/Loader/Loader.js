import React, { useEffect } from "react";
import "./loader.css";
import A from "../../images/a.png";
import R from "../../images/r.png";
import K from "../../images/k.png";
import N from "../../images/n.png";
import E from "../../images/e.png";

export const Loader = () => {
  return (
    <div>
      <div className="loader-main-container">
        <img src={A} />
        <img src={R} style={{ animationDelay: "0.1s" }} />
        <img src={K} style={{ animationDelay: "0.2s" }} />
        <img src={A} style={{ animationDelay: "0.3s" }} />
        <img src={N} style={{ animationDelay: "0.4s" }} />
        <img src={E} style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
};
