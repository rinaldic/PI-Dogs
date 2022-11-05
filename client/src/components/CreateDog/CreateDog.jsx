import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDog, getTemperaments } from '..//../redux/actions';
import sty from "./CreateDog.module.css";
const {validate} = require("./validator.js");

export default function CreateDog() {
    const dispatch= useDispatch()
    const history= useHistory()
 
    useEffect(()=>{
     dispatch(getTemperaments())
    },[dispatch])

//----------------local states--------------------------------

    const [dog, setDog]= useState({name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", minLife:"", maxLife:"", image:"", temperaments:[]})
    const [errors, setErrors]= useState({})
    const [completeAlert, setCompleteAlert]= useState(false)
    const [temperamentAlert, setTemperamentAlert]= useState(false)
//--------------- Redux global states ----------------------------
    const temperaments= useSelector((state)=>state.temperaments)
    const dark= useSelector(state=>state.dark)

//---Handlers----------------------------------------------------

    function handleClickBack() {
      history.push("/home");
    }

    function handleClickAlert() {
      setTemperamentAlert(false);
    }
    
    function handleClickCompleteAlert() {
      setCompleteAlert(false);
    }

    function handleInputChange(e) {
      e.preventDefault();
      setDog({
        ...dog,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...dog,
          [e.target.name]: e.target.value,
        })
      );
    }

    function handleErrorSelect(e) {
      if (dog.temperaments.includes(e.target.value)) {
        errors.select = "Remember you can't add the same temperament!";
      } else if (dog.temperaments.length < 6) {
        setDog({
          ...dog,
          temperaments: [...dog.temperaments, e.target.value],
        });
      } else {
        setTemperamentAlert(true)
      }
      return errors;
    }

    function deleteTemp(temp){
        setDog({
            ...dog,
            temperaments:dog.temperaments.filter((t)=>t !==temp)
        })
    }

    function handleSubmit(e) {
      e.preventDefault();
      setErrors(dog);
      dispatch(addDog(dog));
      setCompleteAlert(true);
      setDog({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLife: "",
        maxLife: "",
        image: "",
        temperaments: [],
      });
      setErrors({});
      
    }
 //--------------------------------------------------------------------------    
 

    return (
      <div  className={dark? sty.dark_container : sty.container}>
       
        {
            temperamentAlert &&
          <div className={sty.temperament_alert}>
            <div className={sty.alert}>
               <button onClick={ handleClickAlert }>
                <i className="fa-solid fa-xmark"></i>
               </button>
               <i className="fa-solid fa-triangle-exclamation"></i>
               <h2>You can't add more than six temperaments!</h2>
            </div>
          </div>
        }

        {
           completeAlert &&
        <div className={sty.complete_alert}>
              <div className={sty.created}>
                  <span>dog successfully created.</span>
                <button onClick={ handleClickCompleteAlert }>
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </button>
              </div>
        </div>
        }

         <div className={dark ? sty.dark_btn_back : sty.btn_back}>
            <button onClick={handleClickBack}><i className="fa-solid fa-circle-chevron-left"></i></button>
         </div>

        <div className={sty.background}>
        
        <form className={sty.form} onSubmit={handleSubmit}>
          <h4>CREATE YOUR OWN DOG</h4>
          
          <div className={sty.input_container}>
            <label title='name'>Name: </label>
            <input
              key="name"
              type="text"
              name="name"
              placeholder="Dog name..."
              onChange={(e) => handleInputChange(e)}
              value={dog.name}
            />
            {errors.name && <p className={sty.error}>{errors.name}</p>}
          </div>
          
          <div className={sty.input_container}>
            <label title='minHeight' >Min Height:</label>
            <input
              key="minHeight"
              type="number"
              name="minHeight"
              placeholder="Minimum Height"
              onChange={(e) => handleInputChange(e)}
              value={dog.minHeight}
              min="1"

            />
            {errors.minHeight && <p className={sty.error}>{errors.minHeight}</p>}
          </div>
          
          <div className={sty.input_container}>
            <label title="maxHeight">Máx Height:</label>
            <input
              key="maxHeight"
              type="number"
              name="maxHeight"
              placeholder="Máximum Height"
              onChange={(e) => handleInputChange(e)}
              value={dog.maxHeight}
              min={dog.minHeight}
            />
            {errors.maxHeight && <p className={sty.error}>{errors.maxHeight}</p>}
          </div>
          
          <div className={sty.input_container}>
            <label title="minWeight">Min Weight:</label>
            <input
              key="minWeight"
              type="number"
              name="minWeight"
              placeholder="Minimum Weight"
              onChange={(e) => handleInputChange(e)}
              value={dog.minWeight}
              min="1"
            />
            {errors.minWeight && <p className={sty.error}>{errors.minWeight}</p>}
          </div>
         
          <div className={sty.input_container}>
            <label title="maxWeight">Máx Weight:</label>
            <input
              key="maxWeight"
              type="number"
              name="maxWeight"
              placeholder="Máximum Height"
              onChange={(e) => handleInputChange(e)}
              value={dog.maxWeight}
              min={dog.minWeight}
            />
            {errors.maxWeight && <p className={sty.error}>{errors.maxWeight}</p>}
          </div>
         
          <div className={sty.input_container}>
            <label title="minLife">Min life</label>
            <input
              key="minLife"
              type="number"
              name="minLife"
              placeholder="Minimum Life Span"
              onChange={(e) => handleInputChange(e)}
              value={dog.minLife}
              min="1"
            />
            {errors.minLife && <p className={sty.error}>{errors.minLife}</p>}
          </div>
         
          <div className={sty.input_container}>
            <label title="maxLife">Máx life</label>
            <input
              key="maxLife"
              type="number"
              name="maxLife"
              placeholder="Máximum Life Span"
              onChange={(e) => handleInputChange(e)}
              value={dog.maxLife}
              min={dog.minLife}
            />
            {errors.maxLife && <p className={sty.error}>{errors.maxLife}</p>}
          </div>
          
          <div className={sty.input_container}>
            <label title="image">Image:</label>
            <input
              key="image"
              type="text"
              name="image"
              placeholder="URL image"
              onChange={(e) => handleInputChange(e)}
              value={dog.image}
              min="1"
            />
            {errors.image && <p className={sty.error}>{errors.image}</p>}
          </div>
         
          <div className={sty.temperaments}>
            <label>Temperaments:</label>
            
            <select
              multiple={true}
              key="temperaments"
              name="temperaments"
              onChange={(e) => handleErrorSelect(e)}
              required
              value={dog.temperaments}
            >
              {temperaments?.map((t) => (
                <option className={sty.option} value={t.name} key={t.id}>
                  {t.name}
                </option>
              ))}

            </select>
            
            <div className={sty.temperaments_container}>

              {dog.temperaments?.map((t) => (
                <div className={sty.temperament} key={t.id}>
                  <button type="button" onClick={() => deleteTemp(t)}>
                  <i className="fa-solid fa-xmark"></i>
                  </button>
                  <p >{t}</p>
                </div>
              ))}
            </div>

          </div>
          {errors.select && <p className={sty.errors}>{errors.select}</p>}
          {(
            (dog.name.length) >0 &&
                !errors.name &&
                !errors.minHeigh &&
                !errors.maxHeight &&
                !errors.minWeight &&
                !errors.maxWeight &&
                !errors.maxLife &&
                !errors.minLife &&
                !errors.image &&
                dog.temperaments.length > 0
          ) && <button className={sty.submit} type="submit" name="submit" onClick={(e) => handleSubmit(e)}>
                submit
              </button> 
          }
        </form>
        </div>
      </div>
    );
};

