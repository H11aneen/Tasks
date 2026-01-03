import { createContext , useReducer , useContext} from "react";
import todosReducers from "../Reducers/todosReducers"

export const TodesContext = createContext([])
 const TodosProvider =({children})=> {
    const [todes , todeoDispatch] = useReducer(todosReducers ,[])
    return(
        <TodesContext.Provider value={{todes:todes , dispatch:todeoDispatch}}>
            {children}
        </TodesContext.Provider>
    )
}

export default TodosProvider;
//export const TodesContext = createContext([])
export const useTodos =() => {
    return useContext(TodesContext)
};
