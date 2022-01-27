import React, { useEffect } from 'react';
import View from './View'
import './form.css';
function Form(){

    const getDataFromLs=()=>{
        const data=localStorage.getItem('books');
        if(data){
            return JSON.parse(data)
        }
        else{
            return []
        }
    }
    
    const [books,setbooks]=React.useState([]);
    const [title,setTitle]=React.useState('')
    const [author,setAuthor]=React.useState('')
    const [prn,setPrn]=React.useState('')
    // const[books,Setbooks]=React.useState([]);

    const submitData=(e)=>{
        e.preventDefault();
        //creating object
        let book={
            title,
            author,
            prn
        }
        setbooks([...books,book])
        setTitle('');
        setAuthor('');
        setPrn('');
        
    }
    useEffect(()=>{
        localStorage.setItem('BookList',JSON.stringify(books))
    },[books])
const deleteBook=(prn)=>{
    const filteredBooks=books.filter((element,index)=>{
        return element.prn !==prn

    })
    setbooks(filteredBooks);
} 

    return(
        <div className='wrapper'>
            <h1>BookList App</h1>
            <div className='main'>
            <div className='form-container'>
            <form autoComplete='off' className='form-group' onSubmit={submitData}>
            <label>Title</label>
            <input type="text" name='title' placeholder='title' className='form-control' onChange={(e)=>setTitle(e.target.value)} value={title} required/><br/>

            <label>Author</label>
            <input type="text" name='author' placeholder='author'className='form-control' onChange={(e)=>setAuthor(e.target.value)} value={author} required/><br/>

            <label>PRN</label>
            <input type="number" name='prn' placeholder='prn' className='form-control' onChange={(e)=>setPrn(e.target.value)} value={prn} required/><br/>

            <button type="submit"  className='btn btn-success btn-md' value="submit">ADD</button>
            </form>
        </div>
        <div className='view-container'>
            {books.length>0&& <>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>PRN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <View books={books} deleteBook={deleteBook}/>
                    </tbody>
                </table>
            </div>
            <button className='btn btn-danger' onClick={()=>setbooks([])} >Remove All</button>
            </>}
            {books.length < 1 && <div> No Books Are Added</div>}

        </div>
        </div>
        </div>
    
    )
}
export default Form