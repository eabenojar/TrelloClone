import React from "react";
import "../styles/Header.css";
import { FaMicrosoft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <Link
          to={{
            pathname: `/`
          }}
        >
          <FaMicrosoft
            size={40}
            color={"rgb(230, 237, 241)"}
            style={{ margin: "0 15px 0 23px" }}
          />{" "}
        </Link>
        <h1 id="board-icon-title">Boards</h1>
      </div>
      <div className="header__center">
        <h1 className="header__center--title">Trello</h1>
      </div>
      <div className="header__right" />
    </div>
  );
};

export default Header;
