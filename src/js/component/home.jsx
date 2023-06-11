import React, { useEffect, useState } from "react";
import { getAllTodos, updateTodos } from "../todomodel";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
// h1 = todos

// div =
//   input
//   a list (ul)
//     list items of todos (li)
//        text (p, label, whatver)
//        a button to delete
const localStorageKey = "ToDos_key";
const Home = () => {
  const [ToDos, setToDos] = useState([]);
  const [previousToDos, setPreviousToDos] = useState(ToDos);
  // const[inputValue, setInputValue]=useState("");
  // setting state
  useEffect(async () => {
    //remove async keyword for local storage
    // ######### GET FROM LOCAL STORAGE########
    // let localStorageToDos = JSON.parse(localStorage.getItem(localStorageKey));
    // setToDos(localStorageToDos);
    // setPreviousToDos(localStorageToDos);

    //########## GET from API #################
    const apiFetchedList = await getAllTodos();
    setToDos(apiFetchedList);
    setPreviousToDos(apiFetchedList);
  }, []);

  useEffect(() => {
    // ######### Uncomment for local storage #########
    // localStorage.setItem(localStorageKey,JSON.stringify(ToDos));
    updateTodos(ToDos);
  }, [ToDos]);

  console.log(previousToDos);
  console.log(ToDos);
  console.log("=====");

  let onType = (event) => {
    if (event.code == "Enter") {
      let newToDos = [...ToDos];
      newToDos.push({ label: event.target.value, done: true });
      // label can have space
      setToDos(newToDos);
      setPreviousToDos(ToDos);
      // clear input
      event.target.value = "";
    } else {
      // setInputValue(event.target.value);
      // console.log(inputValue);
    }
    // console.log(event);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todos </h1>
      <div className="todo-input-container">
        {/* if enter
				add todo
				refresh input
				else
				setInputvalue to new value */}
        <input
          className="todo-input"
          onKeyUp={onType}
          placeholder="Enter Todo"
        />
        {/* adding event listener */}
      </div>
      <ul className="todo-ul">
        {ToDos.map((todo, index) => {
          console.log("inside map");
          console.log(todo);
          return (
            <li key={index} className="todo-item bubble thought">
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.done}
                onChange={() => {
                  let newToDos = [...ToDos];
                  newToDos[index].done = !todo.done;
                  setToDos(newToDos);
                  setPreviousToDos(ToDos);
                }}
              />
              <p className="todo-label">{todo.label}</p>
              {/* boolean output, so adding "" */}
              {/* <p>{todo.done + ""}</p> */}
              {/* <p>{todo.done ? "yes" : "no"}</p> */}
              {/* object now */}
              <button
                className="todo-delete-item"
                onClick={() => {
                  let newToDos = [...ToDos];
                  newToDos.splice(index, 1);
                  setToDos(newToDos);
                  setPreviousToDos(ToDos);
                }}
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>

      <div className="todo-footer">
        <p className="todo-items-left">
          {ToDos.length} items left
          {/* clear button */}
        </p>
        <button
          className="todo-undo-button"
          onClick={() => {
            // undo button
            setToDos(previousToDos);
          }}
        >
          Undo
        </button>
        <button
          className="todo-clearall-button"
          onClick={() => {
            // setting to an empty array
            setToDos([]);
            setPreviousToDos(ToDos);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Home;

//Things left to-do
// Empty the input on enter
// Add placeholder to input
// Style todos
// Save todos across browser refresh
// undo button