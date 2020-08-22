/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '', age: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  const getCurrentUser = async () => {
    let user
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (err) {
      console.log("cant get current user", err)
    }
    return user
  }

  useEffect(() => {
    fetchTodos()
  })

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const user = await getCurrentUser()
      const userSub = user.attributes.sub

      const todoData = await API.graphql(graphqlOperation(listTodos, {
        filter: {
          createdBy: {
            eq: userSub
          }
        }
      }))

      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos', err) }
  }

  async function addTodo() {
    try {
      const user = await getCurrentUser()
      const userSub = user.attributes.sub
      if (!formState.name || !formState.description || !formState.age) return
      const todo = { ...formState, createdBy: userSub }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  const deleteTodoCall = async (e, todo) => {
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input: { id: todo.id } }))
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }
  return (
    <div style={styles.container}>
    <AmplifySignOut/>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <input
        onChange={event => setInput('age', event.target.value)}
        style={styles.input}
        value={formState.Age}
        placeholder="Age"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
            <p>{todo.age}</p>
            <button onClick={e => deleteTodoCall(e, todo)}>delete</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)