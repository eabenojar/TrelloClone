import React, { Component } from "react";
import "../styles/Home.css";
import uuidv1 from "uuid/v1";
import { Link } from "react-router-dom";
import Modal from "./Modal";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardBox from "./BoardBox";
import { connect } from "react-redux";

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
  addList() {
    // console.log("ADD LIST");
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
      boardTitle: "",
      showModal: false
    });
    localStorage.setItem("boards", JSON.stringify(addBoard));
  };
  onDragStart = () => {
    // console.log("ON START DRAG");
  };
  onDragUpdate = () => {
    console.log("ON UPDATE DRAG");
  };
  // onDragEnd = () => {
  //   console.log("ON END DRAG");

  //   // the only one that is required
  // };
  render() {
    console.log("RENDER", this.state.boards);
    const { hideModal, addBoard, onChange } = this;
    return (
      <div className="container">
        <div className="board-container">
          <div className="board-container__title-section">
            <h1 className="board-container-title">Personal Boards</h1>
          </div>

          <div className="board-container all-boards">
            {this.state.boards !== null
              ? this.state.boards.map((board, i) => {
                  return <BoardBox board={board} index={i} key={i} />;
                })
              : null}
            <a className="add-board button" onClick={this.addList}>
              <span>+ Create new board...</span>
            </a>
            <Modal
              showModal={this.state.showModal}
              handleClose={hideModal}
              handleAddBoard={addBoard}
              props={{ ...this.state }}
              handleChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
