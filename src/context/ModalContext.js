import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';


// crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // state del provider
    const [idReceta, guardarIdReceta] = useState(null); // quiero guardar el id de la receta a la que le doy click
    const [recetaFull, guardarRecetaFull] = useState({})

    // una vez que tenemos el id de la receta, llamo a la api
    useEffect(() => {
        const obtenerRecetaFull = async () => {
            if(!idReceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            
            const resultado = await axios.get(url);
            guardarRecetaFull(resultado.data.drinks[0]);
           console.log(resultado.data.drinks[0]);
        }
        obtenerRecetaFull();
       

    },[idReceta])

    return (
        <ModalContext.Provider
            value={{
                recetaFull,
                guardarIdReceta,
                guardarRecetaFull
            }}
        >
            {props.children}
        </ModalContext.Provider>
      );
}
 
export default ModalProvider;