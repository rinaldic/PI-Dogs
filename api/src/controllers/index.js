require('dotenv').config();
const path = require('path');
const { API_KEY } = process.env;
const axios= require("axios");
const {Dog,Temperament} = require('../db.js');


//---------------------- Get Dogs from API ------------------------------------------
const getApiDogs = async () => {
    try
    {
        const apiReq= await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const data= apiReq.data.map( dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                yearsLife: dog.life_span,
                temperaments: dog.temperament,
                image: dog.image.url
            }
        })
        return data;
    }
    catch (err) {
      throw new Error(err.message)
  }    
   
};
//---------------------- Get Dogs from DB ------------------------------------------
const getDbDogs = async () => {
    
  try{
      const dbDog = await Dog.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
          include:{
            model:Temperament,
            attributes:["name"],
            through: {attributes: []}
          } 
          });
          
          const res = dbDog.map(dog => {
            return{
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                yearsLife: dog.yearsLife,
                temperaments: dog.temperaments ? dog.temperaments.map(e => e.name).join(", ") : "",
                image:dog.image
            }
          })
          return res;
    }
    catch (err) {
      throw new Error(err.message)
  }   
  }

 //----------------------Get Api and DATABASE dogs -------------------------------------
const getDogs= async () => {
    const api = await getApiDogs();
    const dtb = await getDbDogs();
    let data= dtb.concat(api);
    return data;
}

//----------------------Get all Temperaments from API and load into DB ----------------------------------
const initial_Temperament = async ()=> {
  try {
          const data = await getApiDogs();
          var arr_prom = data.map((e) => { 
                const temper = e.temperaments?.split(',').map(element => element.trim())
                
                Array.isArray(temper) ? temper.forEach( e => {
                                                        const temp =  Temperament.findOrCreate({ where: { name: e }, defaults: { name: e } })
                                                      } ) : temper && Temperament.findOrCreate({ where: { name: temper }, defaults: { name: temper } }) ;
                                   });  
                       
          
          
            await Promise.all(arr_prom);
          console.log("Temperamentos cargados en la DB")
       
      } 
      catch (err) {
            throw new Error(err.message)
      }
}

//----------------------Get all Temperaments from DB ------------------------------------------------------
const getTemperament = async (req, res) => {
  try {
      const temperament_db = await Temperament.findAll({})
      res.json(temperament_db)
  } catch (err) {
      res.send(err.message)
  }    
}

const validate = (dog) => {
 
  let errors = "";
  //name
  if (!dog.name) {
     errors.concat("Name is required, ");
  } else if ((dog.name && dog.name.length < 4) || dog.name.length > 20) {
     errors.concat("Name must be a minimun of 4 and max of 20, ");
  } else if (!/^[A-Z]+$/i.test(dog.name)) {
     errors.concat("Name Characters invalid, ");
  }
  //min Height
 if (!dog.minHeight) {
    errors.concat("Min Height is required, ");
  }  if (+dog.minHeight >= +dog.maxHeight) {
    errors.minHeight.concat("The minimum height cannot be greater or equal than the maximum height, ");
  }
  //max Height
   if (!dog.maxHeight) {
    errors.concat("Máx Height is required, ");
  }  if (+dog.maxHeight <= +dog.minHeight) {
    errors.concat("The máximum height cannot be less or equal than the minimum height, ");
  }
  //min Weight
  else if (!dog.minWeight) {
    errors.concat("Min Weight is required, ");
  } else if (+dog.minWeight >= +dog.maxWeight) {
    errors.concat("The minimum weight cannot be greater or equal than the máximum weight, ");
  }
  //max Weight
  else if (!dog.maxWeight) {
    errors.concat("Máx Weight is required, ");
  } else if (+dog.maxWeight <= +dog.minWeight) {
    errors.concat("The máximum weight cannot be less or equal than the minimum weight, ");
  }
  //min Life
  else if (!dog.minLife) {
    errors.concat("Min Life span is required, ");
  } else if (+dog.minLife >= +dog.maxLife) {
    errors.concat("The minimum life span cannot be greater or equal than the máximum life span, ");
  }
  //max life span
  else if (!dog.maxLife) {
    errors.concat("Max Life span is required, ");
  } else if (+dog.maxLife <= +dog.minLife) {
    errors.concat("The máximum life span cannot be less or equal than the minimum life span, ");
  }
  //image
  else if (!dog.image) {
    errors.concat("URL is required, ");
  } else if ( !dog.image.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim) ) {
    errors.concat("invalid url, ");
  }
  return errors;
}




module.exports={
    getApiDogs,getDbDogs,getDogs,initial_Temperament, getTemperament, validate
}