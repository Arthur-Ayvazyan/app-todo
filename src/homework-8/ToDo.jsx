import React, { Component } from 'react';
import styles from './todo.module.scss';

class ToDo extends Component {

  state = {
    inputValue: '',
    arrTaskas: [],
    arrChecked: [],
  }

  setValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addTask = () => {
    const inputValue = this.state.inputValue.trim();
    if (!inputValue) return;
    this.setState({
      arrTaskas: [...this.state.arrTaskas, inputValue],
      inputValue: ''
    });
  }

  resetAllTasks = () => {
    this.setState({
      arrTaskas: [],
      arrChecked: [],
      inputValue: ''
    });
  }

  removeCurrentTask = (e) => {
    const { arrTaskas, arrChecked } = this.state;
    const taskIndex = +e.target.value;
    const copyArrTasks = [...arrTaskas];
    const copyArrChecked = [...arrChecked];
    copyArrTasks.splice(taskIndex, 1);
    this.setState({
      arrTaskas: copyArrTasks,
    });

    if (e.target.previousSibling.checked) {
      if (copyArrChecked.indexOf(taskIndex) !== 1) {
        const indexOf = copyArrChecked.indexOf(taskIndex);
        copyArrChecked.splice(indexOf, 1);
        this.setState({
          arrChecked: copyArrChecked
        });
      }
    }
  }

  checkDone = (e) => {
    const { arrChecked } = this.state;
    const copyArr = [...arrChecked];
    const target = e.target;
    if (target.checked) {
      this.setState({
        arrChecked: [...copyArr, +e.target.id],
      });
      return;
    }
    const indexOf = copyArr.indexOf(+e.target.id);
    copyArr.splice(indexOf, 1);
    this.setState({
      arrChecked: [...copyArr],
    });
  }

  resetCheckedTasks = () => {
    const { arrTaskas, arrChecked } = this.state;
    const arrTaskasCopy = [...arrTaskas];
    const arrCheckedCopy = [...arrChecked];
    const restArrTasks = [];
    arrTaskasCopy.forEach((elem, index) => {
      if (!arrCheckedCopy.includes(index)) {
        restArrTasks.push(elem);
      }
    })

    this.setState({
      arrTaskas: [...restArrTasks],
      arrChecked: [],
    });
  }

  render() {
    const { inputValue, arrTaskas, arrChecked } = this.state;
    const list = arrTaskas.map((elem, index) => {
      const classes = [''];
      if (arrChecked.includes(index)) {
        classes.push(styles.selected);
      }

      return (
        <li className="todo__item" key={index}>Task {index + 1}:
          <span id={index} className={classes.join(' ')}>{elem}</span>
          <div>
            <input id={index} type="checkbox" onChange={this.checkDone} />
            <button value={index} onClick={this.removeCurrentTask}>remove</button>
          </div>
        </li>
      )
    });


    return (
      <div className="todo" >
        <h1 className="todo__heading">Create To-Do list, be more productive!</h1>
        <div className="todo__controls">
          <input className="todo__input" value={inputValue} onChange={this.setValue} type="text" placeholder="Create new task..." />
          <button className="todo__add" onClick={this.addTask}>Add Task</button>
          <button className="todo__reset" onClick={this.resetAllTasks}>Reset All Tasks</button>
          <button className="todo__reset-checked" onClick={this.resetCheckedTasks}>Reset Checked Tasks</button>
        </div>
        <div className="todo__wrapper">
          <ul className="todo__list">{list}</ul>
        </div>
      </div>
    );
  }
}

export default ToDo;