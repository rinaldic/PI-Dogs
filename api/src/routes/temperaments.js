const { Router } = require('express');
const router = Router();
const {Temperament} = require('../db.js');

 // --------get("/temperaments")------------------
router.get("/", async (req, res) => {
      try {
              
              const tempsDB = await Temperament.findAll({ 
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },        
              });

          if (tempsDB) 
          { return res.status(200).json( tempsDB ); }
          else 
          { return res.status(404).send("Temperaments not found"); }
             
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;