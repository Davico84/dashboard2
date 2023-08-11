export const validate = (val) => {
  const errors = {};

  if (val.name === "") {
    errors.name = "Missing enter name";
  } else if (!/^[A-Z][a-zA-Z\s\d\S]*$/.test(val.name)) {
    errors.name = "Name must start with an uppercase letter and can only contain letters, spaces, numbers, and symbols";
  } else {
    errors.name = "";
  }

  if (val.description  === "") {
    errors.description = "Need to add an description";
  } else {
    errors.description = "";
  }

  if (val.releaseDate === "") {
    errors.releaseDate = "Need to add a date";
  } else if (/^(0?[1-9]|[1-2]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(val.releaseDate)) {
    errors.releaseDate = "Invalid date format (dd-mm-yyyy)";
  } else {
    errors.releaseDate = ""; 
  }

  if (val.image === "") {
    errors.image = "Need to add an image";
  } else {
    errors.image = "";
  }

  if (!val.screenShots.length) {
    errors.screenShots = "Need to add screenshot";
  } else {
    errors.screenShots = "";
  }

  if (!val.platforms.length) {
    errors.platforms = "Need to add an platforms";
  } else {
    errors.platforms = "";
  }
  
  if (!val.genre.length) {
    errors.genre = "Need to add an genre";
  } else {
    errors.genre = "";
  }


  if (!val.price) {
    errors.price = "Missing enter Price";
  } else if (!/^\d+$/.test(val.price)) {
    errors.price = "Price must be a number";
  } else {
    errors.price = "";
  }

  if (val.requeriments_en === "") {
    errors.requeriments_en = "Missing enter name";

  } else {
    errors.requeriments_en = "";
  }

  return errors;
};
