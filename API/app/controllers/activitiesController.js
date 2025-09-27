import { Activity, Image } from "../../data/models/association.js";


export const activitiesController = {


    // afficher toutes les activities 
    async getAll(req, res) {
        // 1. récupérer toutes les activities (de la bdd) avec le .findAll() method de sequelize
        const activities = await  Activity.findAll({
          include: [
            {
                  model: Image, as: "images" // <---- HERE
            }
        ]
        });
      console.log(activities);

        // 2. les passer à la vue
        //console.log(res.json(activities));
        res.json(activities);
    },

    async getOne(req, res) {
      const activity = await Activity.findByPk({
        include: [
          {
                model: Image, as: "images" // <---- HERE
          }
      ]
      })
      console.log(activity);
      res.json(activity);
    },



    // afficher toutes les attractions où l'id de sa catégorie équivaut à la catégory Attraction (=1)
    async getAttractions(req, res) {
        // todo
        // 1. récupérer toutes les activities où l'id de sa category équivaut à la catégory Attraction (=1) (de la bdd)
        const activities = await  Activity.findAll({
          // on rajoute une condition pour filtrer les activités en sql (SELECT * FROM activities WHERE id_category = 1)
            where: {
              id_category: 1,
            },
            // on limite le nombre de résultats à 3
            limit: 3,
            // on trie les résultats par ordre décroissant
            order: [
              ['id', 'DESC']
            ],
            // on inclut les images associées à chaque activité
            include: [
              {
                    model: Image, as: "images" // <---- HERE
              }
          ]
          });


        // 2. les passer à la vue
        res.json(activities);
    },

};