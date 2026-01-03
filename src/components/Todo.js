//react
import { useState } from 'react';
//mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
//context
import { useToast} from '../context/ToastContext';
import { useTodos } from '../context/TodoesContext';


export default function Todo({Todo  , showDelet , showupdate}){
    const[ setshowupdateDialog]=useState(false);
    const { dispatch} =useTodos()
   
    const {ShowHideToast} = useToast();
    
    //EVENT handle
    function handleCheckClick() {
      const willBeCompleted = !Todo.iscompleted
      dispatch({
        type:"ty",
        payload: {id: Todo.id}
      });

      if (willBeCompleted) {
        ShowHideToast("تم إكمال المهمة ");
      } else {
        ShowHideToast("تم إلغاء إكمال المهمة ");
      }
    }
    
   
    function handleCheckDelet(){
      showDelet(Todo);
    }
    function handleCheckUpdate(){
      showupdate(Todo);
    }
    
   
    function handleCloseUpdate(){
        setshowupdateDialog(false);
    }

   

    
    //== EVENT handle
    return(
        <>
    

 
   
    
      <Card sx={{ 
        minWidth: { xs: "9vh", sm: "8vh" } , 
        minHeight: { md:"14px",xs: "4px", sm: "4px" },
        backgroundColor: "card.main", 
        color:"white" , 
        paddingLeft:{ md:"14px",xs: "20px", sm: "6px" },
        marginTop:"20px"
      }} className='todoCard'>
       <CardContent>
       <Grid container spacing={2} >

            <Grid size={8}>
                <Typography gutterBottom sx={{  fontSize: "24px"  ,color:'text' , textAlign:"right" , textDecoration: Todo.iscompleted ? "line-through" : ""}}>
                    {Todo.title}
              </Typography>
              <Typography gutterBottom  sx={{  fontSize: "14px",color:'text' , textAlign:"right"}}>
                    {Todo.details}
              </Typography>
            </Grid>

            <Grid 
             size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            gap={{ md: "8px",xs: "4px", sm: "5px"} }
            >
                  <IconButton 
                  onClick={()=> 
                    handleCheckClick()
                  }
                  style={{
                      color:Todo.iscompleted ?   "white":"#1b5e20",
                      background:Todo.iscompleted ? "#1b5e20":"white", 
                      border:"solid #1b5e20 3px"}} 
                      className='CEDbutton'>
                  <CheckIcon />
                  </IconButton>

                  <IconButton className='CEDbutton ' style={{color:"#01579b",background:"white" , border:"solid #01579b 3px"}}
                  onClick={handleCheckUpdate}>
                    <EditIcon />
                  </IconButton>

                  <IconButton className='CEDbutton'  style={{color:"#b71c1c",background:"white" , border:"solid #b71c1c 3px"}}
                onClick={handleCheckDelet}
                >
                    <DeleteIcon />
                  </IconButton>
            
            </Grid>
        </Grid>
         

       </CardContent>
    </Card>
    
        
        </>
    )
}