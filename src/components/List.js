import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      taskDescription: ""
    };
  }
  render() {
    return (
      <div className="list-container">
        <h1>Lists</h1>
      </div>
    );
  }
}

export default List;
