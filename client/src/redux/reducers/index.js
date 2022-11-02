import {
    IS_LOADING,
    GET_DOGS,
    GET_DOG_DETAILS,
    SEARCH_DOGS,
    GET_TEMPERAMENTS,
    ADD_DOG,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_RACES,
    FILTER_BY_ORIGIN,
    ORDER_BY_ALPHABET,
    ORDER_BY_WEIGHT,
    DARK_MODE,
    IS_BUFFERING,
  
  } from "../actions";


  const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogDetails: {},
    dark: false,
    loading: false,
    buffering: false,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
          dogDetails: {},
          loading: true,
        };

      case GET_DOG_DETAILS:
        return {
          ...state,
          dogDetails: action.payload,
          loading: !state.loading,
        };

      case SEARCH_DOGS:
        return {
          ...state,
          dogs: action.payload,
          buffering: !state.buffering,
        };

      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };

      case ADD_DOG:
        return {
          ...state,
        };

      case DARK_MODE:
        return {
          ...state,
          dark: !action.payload,
        };

      case FILTER_BY_TEMPERAMENTS:
        const filterTemperament = state.allDogs;
        console.log(filterTemperament);
        const temperament = (action.payload === "all") ? filterTemperament : filterTemperament.filter( e => e.temperaments?.includes(action.payload));
        return {
          ...state,
          dogs: temperament,
        };

      case FILTER_BY_RACES:
        const filterRace = state.allDogs;
        const races = (action.payload === "all") ? filterRace : state.dogs.filter((e) => e.name === action.payload);
        return {
          ...state,
          dogs: races,
        };

      case FILTER_BY_ORIGIN:
        const origins = (action.payload === "all") ? state.allDogs : (action.payload === "db") ? state.dogs.filter((e) => e.id.length > 3) : state.allDogs.filter((e) => typeof e.id == "number");
          return {
          ...state,
          dogs: origins,
        };

      case ORDER_BY_ALPHABET:
        return {
          ...state,
          dogs: (action.payload === true) ? state.dogs?.sort((a, b) => b.name.localeCompare(a.name)) : state.dogs?.sort((a, b) => a.name.localeCompare(b.name)),  
        };

      case ORDER_BY_WEIGHT:
        return {
          ...state,
          dogs: (action.payload === true) ? state.dogs?.sort((a, b) => parseInt(a.weight) - parseInt(b.weight)) : state.dogs?.sort((a, b) => parseInt(b.weight) - parseInt(a.weight)),
        };

      case IS_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      
      case IS_BUFFERING:
        return {
          ...state,
          buffering: action.payload,
        };

      default:
        return {
          ...state,
        };
    }
  }
  