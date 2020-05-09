import React from "react";

const List = (props) => {
  function clickHandler(e) {
    props.export(props.items[e.target.id]);
  }

  function listBlurHandler(e) {
    props.blur(e);
  }

  return (
    <div
      tabIndex="0"
      className={props.typing ? "list" : "list invisible"}
      onBlur={listBlurHandler}
    >
      <ul>
        {arrGen(props.items.length).map((id) => (
          <li key={id} id={id} onClick={clickHandler}>
            <span id={id}>{props.items[id]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;

function arrGen(num) {
  let arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
}
