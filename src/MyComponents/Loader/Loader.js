import React, { useEffect } from "react";
import "./loader.css";

export const Loader = () => {
  return (
    <div>
      <div className="loader-main-container">
        <img src="a.png" />
        <img src="r.png" style={{ animationDelay: "0.1s" }} />
        <img src="k.png" style={{ animationDelay: "0.2s" }} />
        <img src="a.png" style={{ animationDelay: "0.3s" }} />
        <img src="n.png" style={{ animationDelay: "0.4s" }} />
        <img src="e.png" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
};
