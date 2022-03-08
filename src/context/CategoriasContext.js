import axios from 'axios';
import React, { createContext , useState, useEffect} from 'react'

// Crear el context
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {

    //crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    // conectando a la api
   useEffect(() => {
        const obtenerCategorias = async () => {
            //const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin&c=Ordinary_Drink';
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'


            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
   }, [])
   
    
    //lo que está en value es lo que va a estar disponible en todos los componentes hijos
    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        
        
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;