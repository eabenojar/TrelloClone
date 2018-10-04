import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const BoardBox = ({ board, index }) => {
  return (
    <Link
      to={{
        pathname: `/board/${board.id}`,
        state: {
          board
        }
      }}
      key={index}
    >
      <div board={board} className="board-box">
        <h1 className="board-box__title">{board.boardTitle}</h1>
      </div>
    </Link>
  );
};

export default BoardBox;
