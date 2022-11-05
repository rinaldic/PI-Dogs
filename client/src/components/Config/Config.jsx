import React from "react";
import { useDispatch } from "react-redux";
import { isDark } from "..//../redux/actions/index.js";
import sty from "./Config.module.css";

export default function Config ({ setConfig, setDogsPerPage, dark }) {
  
  const dispatch = useDispatch();

  function onClose() {
    setConfig(false);
  }

  function handleChange(e) {
    e.preventDefault();
    setDogsPerPage(e.target.value);
  }
  function handleDark() {
    dispatch(isDark(dark));
  }

  return (

    <div className={sty.container}>
        <div className={sty.panel_container}>
            <div className={sty.panel}>
              
              <button onClick={onClose} className={sty.close}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              
              <div className={sty.dark}>
                <p>Dark mode</p>
                <button onClick={handleDark}>
                  <i className={ dark ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                </button>
              </div>

              <div className={sty.select}>
                <p>Dogs per page</p>
                <select name="dogsPerPage" onChange={handleChange}>
                  <option value={8}>Dogs per page</option>
                  <option value={4}>4 dogs</option>
                  <option value={8}>8 dogs</option>
                  <option value={12}>12 dogs</option>
                </select>
              </div>
              
            </div>
        </div>
    </div>
  );
};


