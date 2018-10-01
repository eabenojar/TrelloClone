import React, { Component } from "react";
import "../styles/Board.css";
import List from "./List";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTitle: "",
      lists: [],
      listTitle: "",
      listDescription: "",
      showAddButton: false
    };
    this.addList = this.addList.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }
  componentDidMount() {
    console.log("DID MOUNT BOARD", this.props.location.state.board);
    var data = localStorage.getItem("boards");
    data = JSON.parse(data);
    const boardData = data.filter(item => {
      if (item.id === this.props.location.state.board.id) {
        return item;
      }
    });
    console.log("DID MOUNT DATA", boardData);
    this.setState({
      boards: data,
      lists: boardData[0].lists
    });
    return data.filter(board => {
      if (board.id === this.props.location.state.board.id) {
        return board;
      }
    });
    console.log("DATA BOARDS", data);
  }
  check(e) {
    console.log("PRESSED");
    this.setState({
      showAddButton: true
    });
    console.log(this.props.board);
  }
  onHandleChange(event) {
    console.log(event.target.value);
    this.setState({
      listTitle: event.target.value
    });
  }
  addList(event) {
    event.preventDefault();
    var obj = {
      listTitle: this.state.listTitle,
      listDescription: "",
      cards: []
    };

    this.state.boards.map(item => {
      if (item.id === this.props.location.state.board.id) {
        item.lists.push(obj);
        return item;
      }
    });
    localStorage.setItem("boards", JSON.stringify(this.state.boards));
    console.log("ADD LIST", this.state.boards);
    const listArr = [...this.state.lists];
    listArr.push(obj);
    this.setState({
      showAddButton: false,
      lists: listArr
    });
  }
  render() {
    console.log("RENDER BOARDS", this.state.boards);
    const { board } = this.props.location.state;
    return (
      <div className="board">
        <div className="board__header">
          <div className="board__header--title">{board.boardTitle}</div>
        </div>
        <div className="board-canvas">
          {this.state.showAddButton === false ? (
            <div className="board__button">
              <button
                className="board__button--add"
                onClick={e => this.check(e, this.props.board)}
              >
                + Add another list
              </button>
            </div>
          ) : (
            <div className="board__form">
              <form onSubmit={this.addList}>
                <label>
                  <input
                    type="text"
                    placeholder="Enter list title..."
                    onChange={this.onHandleChange}
                  />
                </label>
                <input type="submit" value="Add List" />
              </form>
            </div>
          )}
          <div className="board-canvas__lists">
            {this.state.lists !== null
              ? this.state.lists.map((list, i) => {
                  return (
                    <div className="board-canvas__lists--container" key={i}>
                      <h1 className="lists--container list-title">
                        {list.listTitle}
                      </h1>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
