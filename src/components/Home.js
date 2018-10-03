import React, { Component } from "react";
import "../styles/Home.css";
import uuidv1 from "uuid/v1";
import { Link } from "react-router-dom";
import Modal from "./Modal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      hideForm: true,
      boardTitle: "",
      showModal: false
    };
    this.onChange = this.onChange.bind(this);
    this.addList = this.addList.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
    this.setState({ showModal: true });
  }
  hideModal() {
    this.setState({ showModal: false });
  }
  onChange(event) {
    this.setState({
      boardTitle: event.target.value
    });
    console.log(this.state.boardTitle);
  }
  addBoard = event => {
    event.preventDefault();
    console.log("ADDED");
    const obj = {
      boardTitle: this.state.boardTitle,
      id: uuidv1(),
      lists: []
    };
    console.log("OBJECT", obj);
    const addBoard = this.state.boards === null ? [] : [...this.state.boards];
    addBoard.push(obj);
    console.log(addBoard);
    this.setState({
      boards: addBoard,
      boardTitle: ""
    });
    localStorage.setItem("boards", JSON.stringify(addBoard));
  };
  render() {
    console.log("RENDER", this.state.boards);

    return (
      <div className="container">
        <div className="board-container">
          {this.state.boards !== null
            ? this.state.boards.map((board, i) => {
                return (
                  <Link
                    to={{
                      pathname: `/board/${board.id}`,
                      state: {
                        board
                      }
                    }}
                    key={i}
                  >
                    <div board={board} className="board-box">
                      <h1 className="board-box__title">{board.boardTitle}</h1>
                    </div>
                  </Link>
                );
              })
            : null}
          <a className="add-board button" onClick={this.addList}>
            <span>+ Create new board...</span>
          </a>
          <Modal
            showModal={this.state.showModal}
            handleClose={this.hideModal}
            addBoard={this.addBoard}
            props={{ ...this.state }}
            onChange={this.onChange}
          >
            <p>Modal</p>
            <p>Data</p>
            <h1>TESTSETTES</h1>
          </Modal>
          {this.state.showModal === true ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
