const { Router } = require('express');
const router = Router();
const {Temperament} = require('../db.js');
const{getApiDogs}=require("../controllers/index")

 
router.get("/", async (req, res) => {
      try {
        let dogApi = await getApiDogs();
        const tempsDB = await Temperament.findAll({ 
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        
        });
        if (tempsDB.length === 0) {
          const tempsDataBase = await dogApi
            .map((dog) => dog.temperaments)
            .join()
            .split(",");
          const temps = await tempsDataBase.map((temp) => temp.trim());
          temps.forEach((t) => {
            if (t !== "") {
              Temperament.findOrCreate({
                where: {
                  name: t,
                },
              });
            }
          });
          const dbTemp = await Temperament.findAll();
          if (!dbTemp) return res.status(404).send("Temperaments not found");
          res.json(dbTemp);
        } else {
          res.json(tempsDB);
        }
      } catch (error) {
        console.log(error);
      }
});


module.exports = router;