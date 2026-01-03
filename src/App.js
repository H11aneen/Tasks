import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange ,purple ,green ,blueGrey } from '@mui/material/colors';
import Home from './Home';
import { v4 as uuidv4 } from 'uuid';
import {ToastProvider} from './context/ToastContext';
import TodosProvider from './context/TodoesContext';

const theme = createTheme({
  palette:{
    primary:{
      main:"#ff80ab"
    },
     card:{
      main:"#880e4f"
     }
  }
  
})
const initialTodes=[
  {
    id:uuidv4(),
    title:"read",
    details:"dddd",
    iscompleted: false
  },

  {
    id:uuidv4(),
    title:"write",
    details:"hhh",
    iscompleted: false
  },

  {
    id:uuidv4(),
    title:"read",
    details:"dddd",
    iscompleted: false
  }
]
function App() {
 // const[todes , setTodes]= useState(initialTodes)

 
  return(<>
  <ThemeProvider theme={theme}>
    <TodosProvider>
      <ToastProvider >
      <div className='APP'>
      
        <Home/>
      
      </div>
      </ToastProvider>
    </TodosProvider>
  </ThemeProvider>
    </>)
}
export default App;
