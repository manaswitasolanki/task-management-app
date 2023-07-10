import React,{ useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTaskApi } from '../../services/api';

function AddTaskModal({setRefreshList}) {

    const [taskTitle, setTaskTitle] = useState('');

    const handleTaskSubmit=async()=> {
        console.log(taskTitle,"taskTitle")
        if(taskTitle === ''){
            toast('Task is required');
            return;
        }

        const result = await createTaskApi({title:taskTitle});
        console.log(result);

        if(result.status===200  &&  result.data.status === 200){
            toast("task added");
            setRefreshList(new Date())
        }
        else{
            toast(result.data.message);
        }
    };



  return (
    
    <div className="modal mt-5" id="exampleModal">
       <ToastContainer />
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Create New Task
            </h5>
            <button type="button" className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
             <div className="form-group">
              <textarea name="" 
              className="form-control"
              placeholder="Write Task..."
              rows={3} 
              onChange={(e)=>
                setTaskTitle(e.target.value)}
              ></textarea>
             </div>
          </div>
          <div class="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleTaskSubmit} data-bs-dismiss="modal">
            Save Task
        </button>
        <button type="button" className="btn btn-secondary" onClick={()=>{setTaskTitle('');}}  data-bs-dismiss="modal"
        >
            Close
            </button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal
