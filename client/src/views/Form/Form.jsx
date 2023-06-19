import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allGenres } from "../../redux/actions";

function Form() {
   const dispatch = useDispatch();

   const genres = useSelector((state) => state.genres);

   useEffect(() => {
      dispatch(allGenres());
   }, []);

   const [form, setForm] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      release: "",
      rating: "",
      genres: [],
   });

   const [errors, setErrors] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      release: "",
      rating: "",
      genres: "",
   });

   //? --> HANDLERS

   const handlerSubmit = async (event) => {
      event.preventDefault();
      console.log(form.genres);
      try {
         await axios.post(`http://localhost:3001/videogames`, form);
         setErrors({ ...errors, created: false });
      } catch (error) {
         setErrors({ ...errors, created: true });
         console.log("no se pudo crear el juego");
      }
   };

   const handleChangeName = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateName({ ...form, [key]: val });
   };

   const handleChangeImage = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateImage({ ...form, [key]: val });
   };

   const handleChangeDescription = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateDescription({ ...form, [key]: val });
   };

   const handleChangePlatforms = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validatePlatforms({ ...form, [key]: val });
   };

   const handleChangeRelease = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateRelease({ ...form, [key]: val });
   };

   const handleChangeRating = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateRating({ ...form, [key]: val });
   };

   const handleChecked = (event) => {
      const val = event.target.value;

      if (event.target.checked) {
         setForm((form) => ({ ...form, genres: [...form.genres, val] }));
      } else {
         const index = form.genres.indexOf(val);
         if (index > -1) {
            const updatedGenres = [...form.genres];
            updatedGenres.splice(index, 1);
            setForm({ ...form, genres: updatedGenres });
         }
      }
   };

   //? --> VALIDATIONS

   const validateName = (form) => {
      //Validacion del nombre
      if (form.name === "") {
         setErrors({ ...errors, name: "Campo obligatorio" });
      } else {
         if (form.name.includes(`'`) || form.name.includes(`"`)) {
            setErrors({
               ...errors,
               name: `No esta permitido usar ningun tipo de comillas ( " / ' )`,
            });
         } else {
            setErrors({ ...errors, name: "" });
         }
      }
   };

   const validateImage = (form) => {
      //Validacion de la URL de imagen
      if (form.image === "") {
         setErrors({ ...errors, image: "Campo obligatorio" });
      } else {
         const urlRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
         if (!urlRegex.test(form.image)) {
            setErrors({
               ...errors,
               image: "Debe ser una URL con extension (.jpg/.png/.gif/.jpeg)",
            });
         } else {
            setErrors({ ...errors, image: "" });
         }
      }
   };

   const validateDescription = (form) => {
      //Validacion de la descripcion
      if (form.description === "") {
         setErrors({ ...errors, description: "Campo obligatorio" });
      } else {
         if (form.description.length < 70) {
            setErrors({
               ...errors,
               description: "Debe contener al menos 70 caracteres",
            });
         } else if (form.description.length > 200) {
            setErrors({
               ...errors,
               description: "cantidad maxima de caracteres 200",
            });
         } else {
            setErrors({ ...errors, description: "" });
         }
      }
   };

   const validatePlatforms = (form) => {
      //validacion de las plataformas
      if (form.platforms === "") {
         setErrors({
            ...errors,
            platforms: "Al menos debe estar disponible en dos plataformas",
         });
      } else {
         if (!form.platforms.includes(",")) {
            setErrors({
               ...errors,
               platforms: `Las plataformas deben estar separadas por coma ( , )`,
            });
         } else {
            setErrors({ ...errors, platforms: "" });
         }
      }
   };

   const validateRelease = (form) => {
      //Validacion de fecha de lanzamiento
      if (form.release === "") {
         setErrors({ ...errors, release: "Campo obligatorio" });
      } else {
         const regexDate =
            /^(19\d\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
         if (regexDate.test(form.release)) {
            setErrors({ ...errors, release: "" });
         } else {
            if(form.release[1] < 9){
               setErrors({...errors, release: "No creo que ningun juego haya sido creado en esa fecha"})
            }else{
               setErrors({ ...errors, release: "Debe ser una fecha" });
            }
         }
      }
   };

   const validateRating = (form) => {
      //Validacion del rating
      if (form.rating === "") {
         setErrors({ ...errors, rating: "Campo obligatorio" });
      } else if (!Number(form.rating)) {
         setErrors({ ...errors, rating: "Debe ser un numero" });
      } else {
         if (form.rating < 10 && form.rating > 0) {
            setErrors({ ...errors, rating: "" });
         } else {
            setErrors({ ...errors, rating: "El rating se mide entre 0 y 10" });
         }
      }
   };

   const validationCheeckbox = (genres) => {
      if (genres.length === 0) {
         setErrors({ ...errors, genres: "Debes elegir al menos un genero" });
      } else {
         setErrors({ ...errors, genres: "" });
      }
   };

   useEffect(() => {
      validationCheeckbox(form.genres);
   }, [form.genres]);

   return (
      <div>
         <form onSubmit={handlerSubmit}>
            <label>Name: </label>
            <input
               type="text"
               value={form.name}
               name="name"
               onChange={handleChangeName}
            />
            {errors.name && <div>{errors.name}</div>}

            <br />
            <label>image: </label>
            <input
               type="text"
               value={form.image}
               name="image"
               onChange={handleChangeImage}
            />
            {errors.image && <div>{errors.image}</div>}

            <br />
            <label>Description: </label>
            <input
               type="text"
               value={form.description}
               name="description"
               onChange={handleChangeDescription}
            />
            {errors.description && <div>{errors.description}</div>}

            <br />
            <label>Platforms: </label>
            <input
               type="text"
               value={form.platforms}
               name="platforms"
               onChange={handleChangePlatforms}
            />
            {errors.platforms && <div>{errors.platforms}</div>}

            <br />
            <label>Release: </label>
            <input
               type="text"
               value={form.release}
               name="release"
               onChange={handleChangeRelease}
            />
            {errors.release && <div>{errors.release}</div>}

            <br />
            <label>Rating: </label>
            <input
               type="text"
               value={form.rating}
               name="rating"
               onChange={handleChangeRating}
            />
            {errors.rating && <div>{errors.rating}</div>}

            <br />
            <label>Genres: </label>
            {genres.map((genre) => {
               return (
                  <div>
                     <input
                        type="checkbox"
                        value={genre.name}
                        name="genres"
                        onChange={handleChecked}
                     />
                     {genre.name}
                  </div>
               );
            })}
            {errors.genres && <div>{errors.genres}</div>}

            <button type="submit">submit</button>
         </form>
      </div>
   );
}

export default Form;
