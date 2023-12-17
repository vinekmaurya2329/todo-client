import React, { useEffect, useState  } from 'react';
import {Link} from 'react-router-dom'
import { Button, Modal } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function Lists() {
    const [isModalOpen, setIsModalOpen] = useState(false);
   const  [title,setTitle] = useState('');
   const  [discription,setDiscription] = useState('');
   const [date,setDate] = useState('');
   const [checkbox,setCheckbox] = useState(false);
   const [deleteId,setDeleteId]=  useState('')
   const [updateId,setUpdateId] =useState('')
   
   const [allList,setAllList] = useState([])
  const [updateTitle,setUpdateTitle]  = useState('');
  const [updateDate,setUpdateDate]=  useState('');
  const [updateDiscription,setUpdateDiscription] = useState('')

  const localUser = JSON.parse(localStorage.getItem('user'))
     if(!localUser){
      Swal.fire('opps!','Please Login ','error')
       window.location.href = '/login'
     }
  const showModal = async (listId) => {
   setUpdateId(listId)
    setIsModalOpen(true);
    
  };
  const handleOk =async () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //  update list function 
  async function updatelist(listId){
    setIsModalOpen(false);
    const url = `http://localhost:4000/updatelist/`+updateId ;
     const updatedlist = await axios.put(url,{title:updateTitle,date:updateDate,discription:updateDiscription})
    Swal.fire(updatedlist.data.ft,updatedlist.data.message,updatedlist.data.lt);
     window.location.reload()
  }
    useEffect(()=>{
       async function fetchList(){
           const lists =  await axios.post('http://localhost:4000/allLists',{email:localUser.email})
          
           setAllList(lists.data.lists)
           
        }
        fetchList()
        // eslint-disable-next-line
    },[])
    async function listSubmit(e){ 
      e.preventDefault()
   const lists = await axios.post('http://localhost:4000/setlist',{title:title,discription:discription,date:date,email:localUser.email})
    Swal.fire(lists.data.ft,lists.data.message,lists.data.lt)
    window.location.reload()
    }
    // delete function 
    async function deleteList(listId){
         const url = `http://localhost:4000/deleteList/`+listId
         
        const deletedList = await  axios.delete(url)
        Swal.fire(deletedList.data.ft,deletedList.data.message,deletedList.data.lt)
        window.location.reload()
    }
  return (
    <>
    <div className='list-container'>
        
        <form onSubmit={listSubmit}>

        <div className="list2-container">
          <h2 className='list-caption'>Create List</h2>
         
          {/* <label htmlFor="title">Title :</label> */}
          <input type="text"placeholder=' Enter title' value={title} onChange={(e)=>setTitle(e.target.value)}/><br />
          
         
          {/* <label htmlFor="date">Date :</label> */}
          <input type="date" placeholder=' select date' onChange={(e)=>setDate(e.target.value)}/><br />
        
          
          {/* <label htmlFor="discription">Discription :</label><br /> */}
          <textarea name="discription" placeholder=' enter some discription' onChange={(e)=>setDiscription(e.target.value)} id="" cols="22" rows="5"></textarea><br />
        
         <input type="submit"  className='add-button' value="add task +"/>
        </div>

        </form>
        </div>
             <div className="allList-container">
              {allList.map((list)=>{
                return <div  className="alllist2-container">
                 <div className="list-child">
                 <h4 className='title-list'> title : {list.title}</h4>
                  <p> Discription : {list.discription}</p>
                  <p> Date : {moment(list.date).format('DD-MM-YYYY')}</p>
                 </div>
                <div className="list2-child">
                <input type="checkbox" value={checkbox}  name='checkbox' onChange={(e)=>setCheckbox(e.target.value)}/>
                <button onClick={()=>showModal(list._id)} className='edit-button'>Edit <i class="ri-pencil-line"></i> </button>
                {/* <button onClick={()=>{deleteList()}} >delete {list._id}</button> */}
                <button onClick={() => deleteList(list._id)} className='delete-button'>delete <i class="ri-delete-bin-2-line"></i> </button>
                 
                </div>

                </div>
              })}
             </div>

        
      <Modal title="Update List" open={isModalOpen} onOk={updatelist} onCancel={handleCancel}>
       <label htmlFor="title">Title :</label><br />
       <input type="text" placeholder='Title' onChange={(e)=>setUpdateTitle(e.target.value)} /><br />
       <label htmlFor="date"> Date :</label><br />
       <input type="date"  placeholder='Select date'  onChange={(e)=>setUpdateDate(e.target.value)}/><br />
       <label htmlFor="discription">Discription :</label><br />
       
       <textarea name="description" onChange={(e)=>setUpdateDiscription(e.target.value)} id="" cols="25" rows="5"></textarea><br />
      </Modal>
      </>
  )
    }

export default Lists