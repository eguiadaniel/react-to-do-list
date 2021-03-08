import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    newTask: '',
    tasks: [
      { id: '123', content: 'walk the dogs' },
      { id: '456', content: 'shop for groceries' }
    ]
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const content = this.state.newTask;
    const id = Math.random().toString(36).substr(2, 9);

    if (content) {
      const task = {
        id: id,
        content: content
      };
      this.setState({
        tasks: [task, ...this.state.tasks]
      });
    }

    console.log(this.state.tasks);
  };

  handleNewTaskChange = (event) => {
    const value = event.target.value;
    this.setState({
      newTask: value
    });
  };

  handleDeleteTask = (id) => {
    console.log(id);
    const copyOfTasks = [...this.state.tasks];
    const index = copyOfTasks.findIndex((element) => {
      if (element.id === id) {
        return true;
      }
    });
    copyOfTasks.splice(index, 1);
    this.setState({
      tasks: copyOfTasks
    });
    console.log(index);
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-task"></label>
          <input
            type="text"
            placeholder="new task here"
            onChange={this.handleNewTaskChange}
            value={this.state.newTask.content}
          />
          <button>Add to list</button>
        </form>
        <h1>React-to-do-list</h1>
        <ul>
          {this.state.tasks.map((item) => {
            return (
              <div key={item.id}>
                <li>{item.content}</li>
                <button onClick={() => this.handleDeleteTask(item.id)}>
                  Done
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
