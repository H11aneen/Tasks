//REACT
import { useState , useReducer  } from 'react';
import * as React from 'react';
import { useEffect , useMemo} from 'react';
import './App.css'

//Context
import {  useTodos } from './context/TodoesContext';
import {useToast} from './context/ToastContext';

//components
import Todo from './components/Todo';

//mui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TextField from '@mui/material/TextField';


//other
import { v4 as uuidv4 } from 'uuid';

//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'



export default function Home() {

 

  const {ShowHideToast} = useToast();
  const[dialogTodo , setDialogTodo] = useState(null)
  const[showDeletDialog ,setShowDeletDialog]= useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({title: "", details: ""});
  const[showupdateDialog , setshowupdateDialog]=useState(false);
  const[displayedTodosType , setDisplayedTodosType] = useState("all")
  const[titleInput , setTitleInput]=useState("")
  const [detailsInput, setDetailsInput] = useState(""); // <-- حقل التفاصيل
  
   
 
  const {todes , dispatch} =useTodos()
  const completedTodos =  useMemo(()=>{
      return  todes.filter((t) =>{
          return t.iscompleted
      });
    },[todes])
  
  const notcompletedTodos =  useMemo(()=>{
      return  todes.filter((t) =>{
        return !t.iscompleted
      });
    },[todes])

  let todosToRendered = todes

  if(displayedTodosType == "completed") 
    {
     todosToRendered = completedTodos
  }else if(displayedTodosType == "non-completed")
  {
    todosToRendered = notcompletedTodos
  }else{
    todosToRendered = todes
  }
  
  const todesJsx=todosToRendered.map((t)=>{
    return <Todo key={t.id}  Todo={t} showDelet ={opnDeletDialog} showupdate={opnUpdateDialog}
    />
  })



  useEffect(()=>{
     dispatch({type:"get"})
   }, []) ;

    
    function changeDisplayedType(e){
      setDisplayedTodosType(e.target.value)
    }

   ///////////////////handle////////////

    function handleAddClick() {
        dispatch({type:"added" , 
          payload:{
            newTitle: titleInput ,
            newdetails: detailsInput // <-- تمرير التفاصيل

          }})
        setTitleInput(""); // تفريغ الحقل (اختياري)
        setDetailsInput("");
        ShowHideToast("تمت الاضافة بنجاح")
      }

    function opnDeletDialog(Todo){
      setDialogTodo(Todo)
      setShowDeletDialog(true)
    }

    function opnUpdateDialog(Todo){
      setDialogTodo(Todo)
      setUpdatedTodo({title: Todo.title || "", details: Todo.details || ""});
      setshowupdateDialog(true)
    }
    function handleClosedelet(){
          setShowDeletDialog(false);
      }

    function handledeletConfirm(){
        dispatch({type:"deleted" ,
          payload:
            dialogTodo
          
        })
        setShowDeletDialog(false)
        ShowHideToast("تم الحذف بنجاح  ")
      }

      
    function handleCloseUpdate(){
      setshowupdateDialog(false);
  }

 

  function handleUpdateConfirm() {
      dispatch({type:"updated" ,
        payload:{
          id: dialogTodo.id ,
          title : updatedTodo.title,
          details : updatedTodo.details
        }
      })
      setshowupdateDialog(false);
      ShowHideToast("تم التعديل بنجاح ")
     
    }
  return (
    <>
      {/**Delet Model */}
    <Dialog
        style={{direction:"rtl"}}
        open={showDeletDialog}
        onClose={handleClosedelet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك في حذف المهمه ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            لا يمكن التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedelet}>اغلاق</Button>
          <Button autoFocus onClick={handledeletConfirm} >
            نعم , قم بالحذف
          </Button>
        </DialogActions>
    </Dialog>

     {/**Edit Model */}

     <Dialog
        style={{direction:"rtl"}}
        open={showupdateDialog}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableRestoreFocus
      >
        <DialogTitle id="alert-dialog-title">
         تعديل مهمه 
        </DialogTitle>
        <DialogContent>
          
          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label={"العنوان "}
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) =>
                setUpdatedTodo({...updatedTodo , title: e.target.value})
              }
            />
          
         <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="التفاصيل"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) =>
                setUpdatedTodo({...updatedTodo , details: e.target.value})
              }
            
            />

            
          
        </DialogContent>
    
        <DialogActions>
          <Button onClick={handleCloseUpdate}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm} >
            تأكيد التعديل
          </Button>
        </DialogActions>
      </Dialog>
     {/**End Edit Model */}

      <Container maxWidth="sm">
      <Card sx={{
      width: "100%",
      maxHeight: { xs: "90vh", sm: "80vh" },
      overflowY: "auto",
      backgroundColor: "rgba(0,0,0,0.1)",
      color: "white",
      borderRadius: 3,
      p: { xs: 1, sm: 2 }
    }}>
       <CardContent>
         <Typography gutterBottom variant="h4"
  sx={{
    fontSize: {  md:"3rem", xs: "1.2rem", sm: "1.6rem", },  color:'card.main'
  }} >
         مهامي
         </Typography>
         <Divider />

   {/* FILTER BUTTONS */}
   <ToggleButtonGroup dir="ltr" style={{ margin: "9px" }}
      value={displayedTodosType}
      exclusive
      onChange={changeDisplayedType}
      aria-label="text alignment"
      color="primary">
      <ToggleButton value="non-completed">غير منجزه </ToggleButton>
      <ToggleButton value="completed" >منجزة</ToggleButton>
      <ToggleButton value="all">الكل</ToggleButton>
      
    </ToggleButtonGroup>
     {/*END FILTER BUTTONS */}
     {/*All Todes */}
       {todesJsx}
     {/*End All Todes */}

     {/*input , AddTodes */}
     <Grid   container
      spacing={1}
      sx={{
        width:"100%",
        position: "sticky",
        bottom: 0,
       
        p: 1
      }}>
       <Grid size={6} >
          <TextField
          fullWidth label="عنوان المهمة" 
          id="fullWidth" 
          value={titleInput}
          onChange={(e)=>{
            setTitleInput(e.target.value)}}
            style={{color:"#fff",
              background:"rgba(1,1,1,0.3)"}}
          />
       </Grid>
       <Grid size={6} >
        <TextField
          fullWidth
          
          label="تفاصيل المهمة"
          value={detailsInput}
          onChange={(e) => setDetailsInput(e.target.value)}
          style={{color:"#fff",
            background:"rgba(1,1,1,0.3)"}}
        />
     </Grid>
       <Grid size={12}>
          <Button 
          className='app-button '
          style={{width:"100%", height:"100%",
           fontSize:"20px"}}
          variant="contained"
          onClick={() => {
            handleAddClick()
          }}
          disabled={titleInput.length == 0 }
          >
            اضافة
             </Button>
       </Grid>


     </Grid>
       </CardContent>
       
    </Card>
      </Container>
    </>
  );
}
