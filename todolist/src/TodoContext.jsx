import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
/*state 와 dispatch 를 Context 통하여 다른 컴포넌트에서 바로 사용 할 수 있게 해줄건데요, 
우리는 하나의 Context 를 만들어서 state 와 dispatch 를 함께 넣어주는 대신에, 
두개의 Context 를 만들어서 따로 따로 넣어줄 것입니다. 
이렇게 하면 dispatch 만 필요한 컴포넌트에서 불필요한 렌더링을 방지 할 수 있습니다. 추가적으로, 
사용하게 되는 과정에서 더욱 편리하기도 합니다. */

/* Provider 컴포넌트를 렌더링 하고 value 를 설정해주면 됩니다. 그리고, 
props 로 받아온 children 값을 내부에 렌더링해주세요. */

/*useContext 를 직접 사용하는 대신에, useContext 를 사용하는 커스텀 Hook */

/*state 를 위한 Context 와 dispatch 를 위한 Context 를 만들었는데요, 
여기서 추가적으로 nextId 값을 위한 Context 를 만들어주겠습니다. 
여기서 nextId 가 의미하는 값은 새로운 항목을 추가 할 때 사용 할 고유 ID 입니다. 
이 값은, useRef 를 사용하여 관리해주도록 하겠습니다. */