import React from "react";

const SelectedItems = (props) => {
  function removeAnItem(e) {
    props.remove(props.selectedItems[e.target.id]);
  }

  return (
    <div className="selectedList">
      <ul>
        {arrGen(props.selectedItems.length).map((id) => (
          <li key={id} id={id}>
            <div className="selectedItems">
              <span>{props.selectedItems[id]}</span>
              <img
                id={id}
                src="assets/cancel.svg"
                alt="close"
                onClick={removeAnItem}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedItems;

function arrGen(num) {
  let arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
}
