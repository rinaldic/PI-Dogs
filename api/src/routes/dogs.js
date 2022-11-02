const { Router } = require('express');
const router = Router();
const {Dog,Temperament} = require('../db.js');
const{getDogs}=require("../controllers/index")


 // --------get("/dogs")------------------
router.get("/", async (req, res) => {
 
  const name = req.query.name;
  let dogs = await getDogs(); 

  try {
    
        if (name) {
          
          let dogsName = dogs.filter( dog => dog.name.toLowerCase().includes(name.toLowerCase()) );
        
          if (dogsName.length === 0) {
            return res.status(404).json( { message: `Can't find dog with name: ${name}` } );
          }
          res.status(200).json(dogsName);
        } 
        else {
          res.status(200).json(dogs);
        }
    
  } catch (error) {
    res.status(404).send(`Can't find dogs`);
  }
 
});

// -------------------------- get("/dogs/:id") ---------------------------------
router.get('/:id', async (req,res) => {
    const id = req.params.id;
    
    let dogs = await getDogs();

     let dog = dogs.find( el => el.id == id)
  
    try {
            if (dog) { return res.status(200).json(dog) }  
            else { return res.status(404).json({message:`Can't find dog with id:${id}`}) }
    } catch (error) {
        console.log(error)
    }
    
   })

// ------------------------- post("/dogs") -------------------------------------
router.post("/", async(req,res)=> {
    const { name, height, weight, image, yearsLife, temperaments } = req.body;
    
    if (!name && !height && !weight && !image) {
       return  res.status(404).send("Missing some required values. Check (name, height, weight or image)")
    }
    try {
        const dog = await Dog.create( {name, height, weight, yearsLife, image} )
        
        const tempers = temperaments?.split(',').map(element => element.trim())
        if (Array.isArray(tempers)){
          let dogTemperament= await Temperament.findAll({
            where:{ 
                name : tempers
            }
        })
        await dog.addTemperament(dogTemperament)
        }
       
       
        res.status(201).send("the dog was successfully created")

    } catch (error) {
        console.log(error)
    }
})


// --------delete("/dogs/:id")------------------
router.delete("/:id", async(req,res)=>{
  const id=req.params.id
  try {
    await Dog.destroy({
      where:{
        id
      }
    })
    res.send(`the dog with id ${id} was successfully removed`)
    
  } catch (error) {
    console.log(error)
  }
})







module.exports = router;