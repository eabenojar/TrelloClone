import React, { Component } from "react";
import "../styles/Board.css";
import List from "./List";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTitle: "",
      lists: []
    };
  }
  render() {
    console.log("FROM BOARDS COMP", this.props.boards);
    return (
      <div className="board">
        <div className="board__title">{this.boardTitle}</div>
        <div className="board__tasks">
          <div className="board__tasks--components">
            <h1>Task 1</h1>
          </div>
        </div>
        <div className="board__add-button" />
      </div>
    );
  }
}

export default Board;
