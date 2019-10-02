import React from 'react';

export default class InputForm extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="">
        <form onSubmit={this.onSubmit}>
          <input 
            onChange={this.handleChange} 
            name="todo" 
            type="text" 
            value={this.state.todo} 
            placeholder="todo..."
          />
        </form>
      </div>
    );
  }
}