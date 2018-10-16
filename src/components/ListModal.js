import "../styles/Modal.css";
import React from "react";

const ListModal = ({
  handleClose,
  showModal,
  children,
  props,
  handleAddBoard,
  handleChange
}) => {
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";
  console.log("MODAL", props);
  return (
    <div className={showHideClassName}>
      <div className="board-container__form modal-main">
        {/* <form onSubmit={handleAddBoard}>
          <input
            type="text"
            name="name"
            placeholder="Enter list title"
            value={props.boardTitle}
            onChange={handleChange}
          />
          <input type="submit" value="Add List" />
        </form> */}
        {/* <button onClick={handleClose}>X</button> */}
      </div>
    </div>
  );
};

export default ListModal;
