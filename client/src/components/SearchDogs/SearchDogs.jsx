import React from 'react';
import { useState } from 'react';
import {useDispatch} from "react-redux"
import{isBuffering, searchDogs}from "..//../redux/actions/index.js"
import sty from "./SearchDogs.module.css"

export default function SearchDogs ({dark,pageSeter}) {
     const dispatch= useDispatch()
     const[search, setSearch]= useState("")

     function handleChange(e){
        e.preventDefault()
       setSearch(e.target.value)
    }
    function handleSearch(e) {
        e.preventDefault()
        pageSeter(1);
        dispatch(searchDogs(search))
        dispatch(isBuffering(true))
    }

    return (
        <div className={dark ? sty.dark_search : sty.search}>
            <p>Search by breed</p>
            <i  onClick={(e)=>handleSearch(e)} className="fa-solid fa-paw"></i>
                <input type="text" 
                onChange={(e)=>handleChange(e)}
                />
        </div>
    );
};
