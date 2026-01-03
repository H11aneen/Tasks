import { createContext , useState , useContext} from "react";
import Home from "../Home";

import MySnackbar  from '../components/MySnackbar';


  const ToastContext = createContext({});

  export const ToastProvider =({children })=>{
    const [open, setOpen] = useState(false);
    const [message, setmessage] = useState("");

    function ShowHideToast(message){
        setOpen(true);
        setmessage(message);
        setTimeout(() => {
          setOpen(false)
        }, 2000);
      }

      return(

        <ToastContext.Provider value={{ShowHideToast}}>
            <MySnackbar open={open} message={message} />
            {children}
        </ToastContext.Provider>
        
      );
  };

  export const useToast =() => {
    return useContext(ToastContext)
};

