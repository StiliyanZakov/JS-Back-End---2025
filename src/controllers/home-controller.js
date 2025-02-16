import { Router } from "express";
import movieService from "../services/movie-service.js";

const router = Router();

router.get("/", async (req, res) => {

  // *Second solution - use .lean() method on the query to get plain objects
  const movies = await movieService.getAll();

  // *First solution - convert documents to plain objects
  // Convert documents to plain objects
  //const moviesPlain = movies.map(m => m.toObject()); 
  
  // *Third solution is to use allowProtoPropertiesByDefault: true; runtime option in handlebars
  res.render("home", { movies });
});

router.get("/about", (req, res) => {
  res.render("about", {pageTitle: 'About'});
});

export default router;
