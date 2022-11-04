import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '..//Loading/Loading.jsx';
import {getDogDetails } from '..//../redux/actions';
import sty from "./DogDetails.module.css";


export default function DogDetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history= useHistory()
    // redux states --------------------------------
    const dog = useSelector(state=>state.dogDetails)
    const dark = useSelector(state=>state.dark)

   useEffect(()=>{
       dispatch(getDogDetails(id))     
   },[id, dispatch])

 //--------handler click--------------------
   function handleClickCreate() {
    history.push("/create");
  }
  function handleClickBack() {
    history.push("/home");
  }
  
    return (
      <div className={dark ? sty.dark_details : sty.details}>
        <div className={dark ? sty.dark_btn : sty.btn}>
          
          <button onClick={handleClickBack}>
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
        
        </div>
        {
          dog.message ? <h2>{dog.message}</h2> : <>
          
            {dog.image ? (
          <div className={dark ? sty.dark_container : sty.container}>
            
            <img src={dog.image} alt="" />
            
            <div className={dark ? sty.dark_text : sty.text}>
              
              <h1>{dog.name}</h1>
              
              <div className={dark ? sty.dark_specs : sty.specs}>
                <p>
                  <strong>Temperament: </strong>
                  {dog?.temperaments}.
                </p>

                <p>
                  <strong>Height: </strong>
                  {dog.height}
                </p>

                <p>
                  <strong>Weight: </strong>
                  {dog.weight? dog.weight:"10-50"}
                </p>
                <p>

                  <strong>Life Span: </strong>
                  {dog.yearsLife}
                </p>

                <button onClick={handleClickCreate} className={sty.button1 }>
                  <i className="fa-solid fa-plus"></i> Create a dog
                </button>
              
              </div>
               
               
            </div>
          </div>
        ) : (
          <Loading />
        )}
          </>
        }
      
      </div>
    );
};
