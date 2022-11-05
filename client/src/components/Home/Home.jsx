import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DogCard from "..//Dogcard/DogCard.jsx";
import SearchDogs from "..//SearchDogs/SearchDogs.jsx";
import { filterByOrigin, filterByRaces, filterByTemperaments, getDogs, getTemperaments, orderByAlphabet, orderByWeight } from "..//../redux/actions";
import sty from "./Home.module.css";
import icon from "..//../img/dogicon.png";
import Loading from "..//Loading/Loading.jsx";
import Config from "..//Config/Config.jsx";
import EmptyDB from "..//EmptyDB/EmptyDB.jsx";
//const { temperamentsUnic, dogsUnic } = require("../utils/unics");

export default function Home ()  {

  let history = useHistory();

  //------------- Access to Action dispatch functions of Redux -----
  const dispatch = useDispatch();
  
  //------------- Redux Central States ----------------------------
  const dogs = useSelector((state) => state.dogs);
  const allDogs = useSelector((state) => state.allDogs);
  const isLoading = useSelector((state) => state.loading);
  const temperaments = useSelector((state) => state.temperaments);
  const dark = useSelector((state) => state.dark);
  const buffering = useSelector((state) => state.buffering);
  //------------- Local States -------------------------------------
  const [alphabet, setAlphabet] = useState(true);
  const [weight, setWeight] = useState(true);
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState(false);
  const [dogsPerPage, setDogsPerPage] = useState(8);
   


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());

  }, [dispatch]);

  //Handler Click----------------------------------------
  function handleClickCreate() {
    history.push("/create");
  }
  function handleClickImage() {
    history.push("/");
  }
  function handleConfig() {
    setConfig(!config);
  }

  function handleRefresh() {
    window.location.reload();
  }

  // Filters---------------------------------------
  function filterTemperaments(e) {
    console.log(e.target.value);
    dispatch(filterByTemperaments(e.target.value));
    setPage(1);
  }
  function filterRaces(e) {
    dispatch(filterByRaces(e.target.value));
    setPage(1);
  }
  function filterOrigin(e) {
    dispatch(filterByOrigin(e.target.value));
    setPage(1);
  }
  function orderAlphabetical() {
    setAlphabet(!alphabet);
    dispatch(orderByAlphabet(alphabet));
    setPage(1);
  }
  function orderWeight() {
    setWeight(!weight);
    dispatch(orderByWeight(weight));
    setPage(1);
  }

  //-------------Pagination--------------------------------------------

  const lastIndex = page * dogsPerPage; 
  const firstIndex = lastIndex - dogsPerPage; 
 const dogsPaginated = dogs.length? dogs.slice(firstIndex, lastIndex):dogs;
  const totalPages = Math.ceil(dogs.length / dogsPerPage);
  let pagesNumber = [];
  for (let i = 0; i < totalPages; i++) {
    pagesNumber.push(i);
  }

  
const pageSeter = (pageNumber) => {
  setPage(pageNumber);
}
  //---------------------------------------------------------------


  return (
    <div className={dark ? sty.dark_container : sty.container}>
      <header className={sty.header}>
        
        <div className={dark ? sty.dark_header_search : sty.header_search}>
          {/* page Landing */}
          <img
            onClick={handleClickImage}
            className={sty.logo}
            src={icon}
            alt="dog-icon"
          />
          {/* Search */}
          <div className={sty.search}>
            <h1>DoggyPedia</h1>
            <SearchDogs dark={dark} buffering={buffering} pageSeter={pageSeter}/>
            {
              buffering && <img className={sty.buffer} src="https://thumbs.gfycat.com/ImpressiveGenuineHen-max-1mb.gif" alt="buffer" />
            }
          </div>
          {/* Create a dog */}
          <button
            className={dark ? sty.dark_create : sty.create}
            onClick={handleClickCreate}
          >
            <i className="fa-solid fa-plus">Add dog</i>
          </button>
        </div>
        {/* Filter by Temperament */}
        <div className={sty.filters}>
          <div className={dark ? sty.dark_select : sty.select}>
            <select name="filterBytemperament" onChange={(e) => filterTemperaments(e)} >
              <option value="all"> All Temperaments </option>
              { temperaments?.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              )) }
            </select>
          </div>
          {/* Filter by Breed */}
          <div className={dark ? sty.dark_select : sty.select}>
            <select
              name="filterByRace"
              onChange={(e) => filterRaces(e)}
            >
              <option value="all">All Breeds</option>
              { dogs?.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              )) }
            </select>
          </div>
          {/* Filter by BD r API */}
          <div className={dark ? sty.dark_select : sty.select}>
            <select
              name="filterByOrigin"
              onChange={(e) => filterOrigin(e)}
            >
              <option value="all">DB-API</option>
              <option value="api">Only Api</option>
              <option value="db">Only DB</option>
            </select>
          </div>
          {/* Order Alphabetically by Breed */}
          <button className={dark ? sty.dark_alpha : sty.alpha} onClick={orderAlphabetical} >
            {alphabet ? ( <i className="fa-solid fa-arrow-down-z-a"></i> ) : (
              <i className="fa-solid fa-arrow-up-a-z"></i> )}
          </button>
          {/* Order by Weight */}
          <button className={dark ? sty.dark_alpha : sty.alpha} onClick={orderWeight} >
            <i className="fa-solid fa-weight-hanging"></i>
            {weight ? ( <i className="fa-solid fa-down-long"></i> ) : ( <i className="fa-solid fa-up-long"></i> )}
          </button>

           {/* Refresh */}
           <button className={dark ? sty.dark_alpha : sty.alpha} onClick={handleRefresh} >
            <i className="fa-solid fa-arrows-rotate"></i>
           </button>

        </div>
      </header>
      <div className={sty.pages}>
        {page !== 1 && (
          <button
            className={dark ? sty.dark_page_number : sty.page_number}
            onClick={() => setPage(page - 1)}
          >
            <i className="fa-solid fa-circle-left"></i>
          </button>
        )}
        {pagesNumber.map((n) =>
          n > 0 && (
            <button
              className={dark ? sty.dark_page_number : sty.page_number}
              onClick={() => setPage(n)}
              key={n}
            >
              {n}
            </button>
          ) 
        )}
        {page !== totalPages && (
          <button
            className={dark ? sty.dark_page_number : sty.page_number}
            onClick={() => setPage(page + 1)}
          >
            <i className="fa-solid fa-circle-right"></i>
          </button>
        )}
      </div>

      <main className={sty.cards}>
        {allDogs.length && !dogs.length ? (
         <EmptyDB dogs={dogs} allDogs={allDogs}/>
        ) : (
          <>
            {isLoading && dogs.length ? (
              dogsPaginated?.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  weight={dog.weight}
                  height={dog.height}
                  yearsLife={dog.yearsLife}
                  image={dog.image}
                  temperaments={dog.temperaments}
                />
              ))
            ) : (
              <Loading />
            )}
          </>
        )}
      </main>
      {config ? (
        <Config
          setConfig={setConfig}
          setDogsPerPage={setDogsPerPage}
          dark={dark}
        />
      ) : (
        <div className={dark ? sty.dark_config : sty.config}>
          <button onClick={handleConfig}>
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
      )}
      <div className={sty.bone}>
        <span>#{page}</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bone_noun_71979_cc.svg/1280px-Bone_noun_71979_cc.svg.png"
          alt="bone"
        />
      </div>
    </div>
  );
};


