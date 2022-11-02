import React from "react";
import { Link, useHistory } from "react-router-dom";
import dogsgroup from "..//../img/dog-group.png";
import { useDispatch } from "react-redux";
import { changeLoading } from "..//../redux/actions/index.js";
import sty from "./LandingPage.module.css"; 



export default function LandingPage() {
  
  const dispatch = useDispatch();

  const histoy = useHistory();

  function handleClick() {
    histoy.push("/home");
   dispatch(changeLoading(false))
  }

  return (
              <div className={sty.landing}>
                <div className={sty.text_container}>
                  <h1 className={sty.title}> DoggyPedia </h1>
                  <p>
                    Know more about your dog and behaviors, be a better partner for him ;)  
                  </p>
                  <div className={sty.icon_container}>
                    
                    <button onClick={handleClick} className={sty.btn}>
                      <Link to="/home">Go</Link>
                    </button>
                                        
                  </div>
                </div>
                <img className={sty.image} src={dogsgroup} alt="dogsgroup" />
              </div>
  );
};

