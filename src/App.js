import React from "react";
import TodoItem from './components/TodoItem';
// import tick from '../public/tick.svg';
import './App.css';

const ACTIVE = 'active';
const COMPLETED = 'completed';
const ENTER_KEY = 13;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
    let localTodos = JSON.parse(localStorage.getItem("todos")) ||  [
        { title: 'Go shopping', isComplete: false },
        { title: 'Eat dinner', isComplete: true },
        { title: 'Go to sleep', isComplete: true }
      ]
    
    this.state = {
      todoItems: localTodos
    }

    this.onKeyUp = this.onKeyUp.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.inputText.current.focus();
  }
  componentDidUpdate() {
localStorage.setItem("todos", JSON.stringify(this.state.todoItems))
  }
  resetForm() {
    this.inputText.current.value = '';
  }

  onItemClicked(item) {
    return () => {
      const { isComplete } = item;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);

      this.setState({
        currentFilter: 'all',
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item, isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    }
  }
  onClickedRemove(item) {
    return () => {
      let { todoItems } = this.state;
      todoItems = todoItems.filter(todo => todo !== item);
      this.setState({
        todoItems: [
          ...todoItems
        ]
      })
    }
  }
  onKeyUp(event) {
    if (event.keyCode === ENTER_KEY) {
      let text = event.target.value;

      text = text.trim();
      if (!text) { return };

      this.setState({
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems]
      })

      event.target.value = '';
    }
  }

  changeFilter(filter) {
    this.setState({
      currentFilter: filter
    })
  }

  checkAll() {
    let { todoItems } = this.state;
    const COMPLETED = true;

    let check = todoItems.every(item => item.isComplete === COMPLETED);
    switch (check) {
      case (true):
        todoItems = todoItems.map(item => item = Object.assign({}, item, { isComplete: false }))
        break;
      default:
        todoItems = todoItems.map(item => item = Object.assign({}, item, { isComplete: true }));
    }

    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
  }

  clearCompleted() {
    let { todoItems } = this.state;
    todoItems = todoItems.filter(item => item.isComplete === false);
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
  }


  render() {
    let { todoItems, currentFilter } = this.state;
    let uncompleted = todoItems.filter(item => item.isComplete === false);
    
    const COMPLETED_ITEMS = todoItems.filter(item => item.isComplete === true);

    switch (currentFilter) {
      case (ACTIVE):
        todoItems = todoItems.filter(item => item.isComplete === false);
        break;
      case (COMPLETED):
        todoItems = todoItems.filter(item => item.isComplete === true);
        break;
      default:
    }


    return (
      <div className="App">
        <div className="Header gradient">
          <img
            src={"https://image.flaticon.com/icons/svg/447/447147.svg"}
            width="32" height="32"
            alt="create"
            onClick={this.checkAll}
          />
            <input
              type="text"
              placeholder="Add a new item"
              onKeyUp={this.onKeyUp}
              ref={this.inputText}
            />
            <input
              type="button"
              onClick={this.resetForm}
              value="Clear"
              style={{width: 'fit-content'}} />
        </div>

        <input
          type="button"
          onClick={() => this.changeFilter('all')}
          value="all" />

        <input
          type="button"
          onClick={() => this.changeFilter('active')}
          value="active" />

        <input
          type="button"
          onClick={() => this.changeFilter('completed')}
          value="completed" />

        <span style={{right: "5px", position: "absolute"}}> {uncompleted.length} item left</span>
        {todoItems.length > 0
          ? todoItems.map((item, index) =>
            <TodoItem
              key={index}
              item={item}
              onClick={this.onItemClicked(item)}
              onClickRemove={this.onClickedRemove(item)} />
          )

          : "There is nothing here"
        }

        {COMPLETED_ITEMS.length > 0
          && <input
            type="button"
            onClick={() => this.clearCompleted()}
            value="Clear completed" />
        }
      </div>
    );
  }
}