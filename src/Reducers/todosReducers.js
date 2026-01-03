import { v4 as uuidv4 } from 'uuid';

export default function reducers(currentTodos , action){
    
    switch(action.type){
       
      case"added":{
           
                const newTodes = {
                  id: uuidv4(),
                  title: action.payload.newTitle ,
                  details: action.payload.newdetails,
                  iscompleted: false
                };
                const updatedTodos=[...currentTodos, newTodes];

                localStorage.setItem("todos" , JSON.stringify(updatedTodos))
                return updatedTodos;
                
        }
        
      case"deleted":{
             
            const updatedTodos = currentTodos.filter((t)=>{
                return t.id != action.payload.id;
              })
              localStorage.setItem("todos" , JSON.stringify(updatedTodos));
              return updatedTodos
              
        }
       
      case"updated":{
                const updatedTodos = currentTodos.map((t) => {
                    if (t.id === action.payload.id) {
                      return { 
                        ...t, 
                        title: action.payload.title, 
                        details: action.payload.details }
                    }
                    return t;
            });
              localStorage.setItem("todos" , JSON.stringify(updatedTodos))
              return updatedTodos
            
        }

      case"get":{
            const storgeTodos = 
            JSON.parse(localStorage.getItem("todos")) ?? [];
           return storgeTodos

      }

      case"ty":{
          const updatedTodos = currentTodos.map((t) => {
            if (t.id === action.payload.id) {
            
        
              return {
                ...t,
                iscompleted: !t.iscompleted
              };
            }
            return t;
          });
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
          return updatedTodos;
          
    
        }
        default:
            throw Error("Unknown Action" + action.type )
        
    }
   return[];
}