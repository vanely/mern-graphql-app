import React from 'react';
import gql from 'graphql-tag'; // allows us to parse graphql queries/ mutations (has to be bound to component)
import { graphql } from 'react-apollo'; // makes our app a higher order component, and allows us to make graphql queries/ mutation
import * as compose from 'lodash.flowright';

import './App.scss';

const TodosQuery = gql`
query {
  todos {
    id
    text
    complete
  }
}`;

// const CreateMutation = gql`
// mutation() {

// }`;

const UpdateMutation = gql`
mutation($id: ID!, $complete: Boolean!)  {
  updateTodo(id: $id, complete: $complete)
}`;

// const RemoveMutation = gql`
// mutation($id: ID!) {
//   removeTodo(id: $id)
// }`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };
  }

  addTodo = () => {

  }

  updateTodo = async (todo) => {
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete,
      },
      update: (store) => {
        // read cache data(our TodoQuery) for this query
        const data = store.readQuery({query: TodosQuery});
        // add mutation change
        data.todos = data.todos.map((x) =>  // since this method will be specific to the todo that I click do I even need to iterate over the todos or should I just make a direct change
          x.id === todo.id 
          ?
            {
              ...todo,
              complete: !todo.complete,
            }
          : x
        );
        // write data back to cache
        store.writeQuery({query: TodosQuery, data});
      }
    });
  }

  removeTodo = () => {

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  } 

  render() {
    // props now have data coming from GraphQl query.
    console.log(this.props);

    // loading boolean can be used to display loading spinner, and todos array, contains contents of query
    const {loading, todos} = this.props.data; 

    // represent the loadwith loading boolean
    if (loading) {
      return null;
    }

    // let's iterate and return todos
    return (
      <div className="">
        <div>
          <h1>Add Todo</h1>
          <input onChange={this.handleChange} name="todo" type="text" placeholder="enter your todo"/>
        </div>
        <h2>Todos</h2>
        {
          todos.map((todo) => {
            return (
              <div key={todo.id}>
                <input type="checkbox" name="complete" checked={todo.complete}/>
                <strong onClick={() => this.updateTodo(todo)} style={{padding: '0 10px 0 10px'}}>{todo.text}</strong>
                <span onClick={ () => this.removeTodo }>X</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

// sends the queries and the component
export default compose( // compose was removed from react-apollo v3.x(use lodash.flowright instead)
  graphql(TodosQuery),
  graphql(UpdateMutation, {name: "updateTodo"}),
)(App);
