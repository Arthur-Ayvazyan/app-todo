import React, { Component } from 'react';

class Task extends Component {
  render() {
    const { id, number, title, text, classname } = this.props;
    return (
      <div id={id}>
        <span>{number} {title} </span>
        <span className={classname}>{text}</span>
      </div>
    )
  }
}
export default Task;