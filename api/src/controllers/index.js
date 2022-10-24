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




module.exports={
    getApiDogs,getDbDogs,getDogs,initial_Temperament, getTemperament
}