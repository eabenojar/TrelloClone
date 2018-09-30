import React, { Component } from "react";
import "../styles/Home.css";
import Board from "./Board";
import uuidv1 from "uuid/v1";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      hideForm: true,
      boardTitle: ""
    };
    this.onChange = this.onChange.bind(this);
    this.addBoard = this.addBoard.bind(this);
  }
  componentDidMount() {
    var data = localStorage.getItem("boards");
    data = JSON.parse(data);
    this.setState({
      boards: data
    });
    console.log("DATA", data);
  }
  onPress() {
    console.log("Pressed");
  }
  addList() {
    console.log("ADD LIST");
  }
  onChange(event) {
    this.setState({
      boardTitle: event.target.value
    });
    // console.log(this.state.boardTitle);
  }
  addBoard(event) {
    console.log("ADDED");
    const obj = {
      boardTitle: this.state.boardTitle,
      id: uuidv1()
    };
    const addBoard = [...this.state.boards];
    addBoard.push(obj);
    console.log(addBoard);
    this.setState({
      boards: addBoard,
      boardTitle: ""
    });
    localStorage.setItem("boards", JSON.stringify(addBoard));
    event.preventDefault();
  }
  render() {
    console.log("RENDER", this.state);
    return (
      <div className="container">
        <div className="header">
          <h1 className="header__title">Trello Clone</h1>
        </div>
        <div className="board-container">
          <button onClick={this.addList}>+ Add another list</button>
          <div className="board-container__form">
            <form onSubmit={this.addBoard}>
              <input
                type="text"
                name="name"
                placeholder="Enter list title"
                value={this.state.boardTitle}
                onChange={this.onChange}
              />
              <input type="submit" value="Add List" />
              <button>X</button>
            </form>
          </div>
          <Board boards={this.state.boards} />
        </div>
      </div>
    );
  }
}

export default Home;
