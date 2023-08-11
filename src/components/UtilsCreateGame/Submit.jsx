import axios from 'axios';

const SubmitGame = async (event,newVideoGame,setNewVideoGame,validateSubmit,setValidateSubmit,date,token) => {
  


    event.preventDefault();
    const config = { Authorization: token };

    try {
      console.log(newVideoGame);

      if (
        newVideoGame.name === "" ||
        newVideoGame.description === "" ||
        date === "" ||
        !newVideoGame.platforms.length ||
        !newVideoGame.genre.length ||
        newVideoGame.image === "" ||
        !newVideoGame.screenShots.length ||
        newVideoGame.price === "" ||
        newVideoGame.requeriments_en === ""
      ) {
        setValidateSubmit(false);
        alert("You must fill in all the fields.")
      } else {
        await axios.post(
          "https://pfvideojuegos-back-production.up.railway.app/games",
          {
            id: newVideoGame.id,
            name: newVideoGame.name,
            releaseDate: newVideoGame.releaseDate,
            description: newVideoGame.description,
            image: newVideoGame.image,
            screenShots: newVideoGame.screenShots,
            platforms: newVideoGame.platforms,
            genre: newVideoGame.genre,
            price: newVideoGame.price,
            requeriments_en: newVideoGame.requeriments_en,
          },
          config
        );

        const response = alert('Publication Create!Continue loading games?');
        if (response) {
          setNewVideoGame({
            id: 1 + Math.floor(Math.random() * 999),
            name: "",
            description: "",
            releaseDate: "",
            image: "",
            screenShots: [],
            platforms: [],
            genre: [],
            price: "",
            requeriments_en: "",
          });
          console.log(response)

          setTimeout(() => {
            window.location.reload()
          }, 2000);
        } else {
          // Aquí puedes realizar la navegación a la pantalla de inicio o realizar cualquier acción que desees.
          // Por ejemplo, puedes utilizar react-router-dom para la navegación si lo necesitas.
          console.log('Back to dashboard...');
        }
      }
    } catch (error) {
      alert("Auch...Something went wrong");
      console.log("Error en el backend:", error);
    }
  };


export default SubmitGame;