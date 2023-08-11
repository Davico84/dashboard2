import { videogames } from "./dataVideojuegos";

////filtrado platfomrs
const filterplataforms = videogames.map((g) => g.platforms);
export const allPlatforms = [...new Set(filterplataforms.flat().sort())];

// export const allPlatformsKeyValue = allPlatforms.map((g) =>[g, false]);

// export const objPlatforms = Object.fromEntries(allPlatformsKeyValue);


////filtrado genres
const filtergenres = videogames.map((g) => g.genre);

export const allGenres = [...new Set(filtergenres.flat().sort())];


// const allGenresKeyValue = allGenres.map((g) => [g, false]);

// export const objGenres = Object.fromEntries(allGenresKeyValue);

// export const objGenres = allGenresKeyValue.map(([key,value])=>({[key]:value}))




const filterTags = videogames.map((g) => g.etiquetas);

export const allTags = [...new Set(filterTags.flat().sort())];



