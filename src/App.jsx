import React from 'react';
import './App.css';

const TaskItem = (props) => {

  const item = props.item;
  // console.log(item);

  return (
  <li className="task">{item.content}>
    <button onClick={props.onRemoveTask}>Done</button>
  </li>
  )
}

class TaskInput extends React.Component{
  state= {
    newTask: ''
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const content = this.state.newTask;
    const id = Math.random().toString(36).substr(2, 9);

    if (!content) return
    const task = {
      id: id,
      content: content
    };

    this.setState({      
      newTask:''
    })

    this.props.onTaskCreate(task);
  
  };

  handleNewTaskChange = (event) => {
    const value = event.target.value;
    this.setState({
      newTask: value
    });
  };


  render() {
    return (
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
    )
  }
}

class App extends React.Component {
  state = {    
    tasks: [
      { id: '123', content: 'walk the dogs' },
      { id: '456', content: 'shop for groceries' }
    ]
  };

  createTask = (task) => {
    this.setState({
      tasks : [task, ...this.state.tasks]
      
    })
  }

  handleDeleteTask = (id) => {
    // console.log(id);
    const copyOfTasks = [...this.state.tasks];
    const index = copyOfTasks.findIndex(element => element.id === id);
    copyOfTasks.splice(index, 1);
    this.setState({
      tasks: copyOfTasks
    });
    // console.log(index);
  };

  render() {
    return (
      <div className="App">
        <TaskInput onTaskCreate={this.createTask}/>
      
        <h1>React-to-do-list</h1>
        <ul>
          {this.state.tasks.map((item) =>
                <TaskItem key={item.id} item={item} onRemoveTask={() => this.handleDeleteTask(item.id)}/>
               
           )}
        </ul>
      </div>
    );
  }
}

export default App;
