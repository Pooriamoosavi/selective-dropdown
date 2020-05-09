import React, { useState } from "react";
import List from "./List";
import SelectedItems from "./SelectedItems";

const Dropdown = (props) => {
  //The main value of input
  const [value, setValue] = useState("Select Or Type...");

  //check if the input is in typing/searching state so we should keep the list open or not
  const [typing, setTyping] = useState(false);

  //I kept the calculation and search in list, here in this compenent so this state show what to put in list
  const [listItems, setListItems] = useState(props.DB);

  //The state for manageing selected items in front of drop down
  const [selectedItems, setSelectedItems] = useState([]);

  //These two functions are for add/remove an item from the selected items in front of drop down
  function addSelectedItem(item) {
    setSelectedItems([...selectedItems, item]);
  }
  function removeSelectedItem(item) {
    var tempArray = [...selectedItems];
    var index = tempArray.indexOf(item);
    if (index !== -1) {
      tempArray.splice(index, 1);
      setSelectedItems(tempArray);
    }
  }

  //Handlers
  function clickHandler() {
    //Empty input
    setValue("");

    //open the list
    setTyping(true);
  }

  function inputBlurHandler(e) {
    //I am checking if user has clicked on list it self or in an empty space. if he has clicked on the list nothing happens in this case
    if (e.relatedTarget === null || e.relatedTarget.className !== "list")
      setTyping(false);

    //I want to keep user's data if he has searched sth. this one checks is there is sth in input then don't remove it
    if (value === "") {
      setValue("Select Or Type...");
    }
  }

  function changeHandler(e) {
    //check the user input in DB and see if we have it
    var result = searchInList(e.target.value, props.DB);
    setValue(e.target.value);

    //tell the list component what to show
    setListItems(result);
  }

  return (
    <div className="container">
      <div className="drop-down">
        <span>Amenities</span>
        <div className="list-input-container">
          <div>
            <input
              value={value}
              onClick={clickHandler}
              onBlur={inputBlurHandler}
              onChange={changeHandler}
            />
            <img
              src="assets/arrow-point-to-right.svg"
              className="drop-icon"
              alt="img"
              onClick={clickHandler}
            />
          </div>
          <List
            items={listItems}
            export={addSelectedItem}
            typing={typing}
            blur={inputBlurHandler}
          />
        </div>
      </div>
      <SelectedItems
        selectedItems={selectedItems}
        remove={removeSelectedItem}
      />
    </div>
  );
};

export default Dropdown;

function searchInArr(word, arr) {
  var result = [];
  arr.forEach((element) => {
    if (element.toLowerCase().startsWith(word)) result.push(element);
  });
  return result;
}

function searchInList(searchedVal, items) {
  if (searchedVal !== "" && searchedVal !== "Select Or Type...") {
    var search = searchInArr(searchedVal, items);
    return search.length === 0 ? [searchedVal] : search;
  }
}
