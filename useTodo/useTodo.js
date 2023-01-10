import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = []

const init = () => {
    return JSON.parse( localStorage.getItem('todos') || [])
}

export const useTodo = () => {

    const [ todos, dispatch] = useReducer( todoReducer, initialState, init )
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])

    const handleDeleteTodo = ( id ) => {
        const action = {
            type: 'removeTodo',
            payload: id
        }

        dispatch( action );
    }
    
    const handleToggleTodo = ( id ) => {
        const action = {
            type: 'toggleTodo',
            payload: id
        }

        dispatch( action );
    }

    const handleNewTodo = ( todo ) => {
        
        const action = {
            type: 'addTodo',
            payload: todo
        }

        dispatch( action );
    }

    return {
        todos,
        handleToggleTodo,
        handleNewTodo,
        handleDeleteTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length
    }
}
