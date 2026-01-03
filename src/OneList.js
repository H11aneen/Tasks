import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
export default function TextField(){
    return(
        <div style={{display:"flex", direction:"rtl", gap:"40%", justifyContent:"center", alignItems:"center"}}>
            <div>
               <h2>حل التحدي</h2>
                <p>اليوم</p>
            </div>
            <div style={{display:"flex" , gap:"5px"}}>
            <Fab size="small"color="secondary" aria-label="edit" >
                <EditIcon />
            </Fab>

            <Fab size="small"color="secondary" aria-label="delet" >
                <DeleteIcon/>
            </Fab>
            </div>
        </div>

    )
}


