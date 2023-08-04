const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

router.get("/movies", (req, res, next) => {
  Movie.find()
    .select({ title: 1, image: 1 })
    .then((response) => {
      // console.log(response);
      res.render("movies.hbs", {
        allMovies: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/movies/:id',(req, res, next)=>{
//     let movieId = req.params.id;
//     Movie.findById({_id: movieId})
//     .then((response)=>{
//         console.log(response);
//         res.render("movie-description.hbs",{
//             oneMovie: response
//         })
//     })
//     .catch((error)=>{
//         next(error)
//     })
// })

router.get("/movies/:id", (req, res, next) => {
  async function showOneMovie() {
    try {
      const oneMovie = await Movie.findById({ _id: req.params.id });
    //   console.log(oneMovie);
      res.render("movie-description.hbs", {
        oneMovie,
      });
    } catch (error) {
      next(error);
    }
  }
  showOneMovie();
});

module.exports = router;
