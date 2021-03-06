import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    newTask: '',
    tasks: [
      { id: '123', content: 'Walk the dogs' },
      { id: '456', content: 'Shop for groceries' }
    ]
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const content = this.state.newTask;
    // if (!content) return;
    if (content) {
      const task = {
        id: Math.random().toString(),
        content: content
      };
      this.setState({
        tasks: [task, ...this.state.tasks],
        newTask: ''
      });
    }
  };

  handleNewTaskChange = (event) => {
    // const value = event.target.value;
    const { value } = event.target;
    this.setState({
      newTask: value
    });
    console.log(`New Task: ${this.state.newTask}`);
  };

  removeTask = (id) => {
    // tasksClone = [...this.state.tasks];
    // const index = tasksClone.findIndex((task) => task.id === id);
    // tasksClone.splice(index, 1);

    const tasksClone = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: tasksClone
    });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
            placeholder="Write here..."
            onChange={this.handleNewTaskChange}
            value={this.state.newTask}
          ></input>
          <button>Add to list</button>
        </form>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              {task.content}
              <button onClick={() => this.removeTask(task.id)}>✔</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
