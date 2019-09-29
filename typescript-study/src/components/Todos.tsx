import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo } from '../actions';
import { Todo, StoreState } from '../reducers';
// import { todosReducer } from '../reducers/todos';

const handleSetFetching = (fetching: boolean, setFetching: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (!fetching) {
    setFetching(!fetching)
  }
}
export const App: React.FC = () => {
  // create some local state with useState that will tell us if our fetch result is still loading
  const [fetching, setFetching] = useState<boolean>(false);
  const todos = useSelector((state: StoreState) => state.todos);
  const dispatch = useDispatch()
  const useThunkDispatch = (thunk: any) => dispatch(thunk)
  // redux hook that is called whenever todos.length is changed
  useEffect(() => {
    if (todos.length) {
      setFetching(false);
    }
  }, [todos.length]);
  // TODO try use useReducer, result: dispatch params must be action rather then Promise
  // const initialState: Todo[] = [];
  // const [state, dispatch] = useReducer(todosReducer, initialState)


  // create an array of buttons that dispatch the deleteTodo action onClick
  const curTodos = todos.map((todo: Todo) => (
    <button
      key={todo.id}
      onClick={() => dispatch(deleteTodo(todo.id))}>
      {todo.title},
    </button>
  ));
  // the first button below dispatches the fetchTodos action and makes the LOADING text display while it's fetching.
  return (
    <div>
      <button
        onClick={() => {
          useThunkDispatch(fetchTodos())
          // dispatch(fetchTodos());
          handleSetFetching(fetching, setFetching);
        }}>
        fetch data !
      </button>
      {fetching ? 'LOADING' : null}
      {curTodos}
    </div>
  );
};