import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';


export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);

    // destructuring para poder filtrar en la url por el nombre y la categoria
    const { nombre , categoria} = busqueda;

    
    useEffect(() => {
        if(consultar){
        const obtenerRecetas = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria.replace(' ','_')}`;
            //const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

            console.log(url);

            const resultado = await axios.get(url);
            guardarRecetas(resultado.data.drinks)
            // console.log(resultado.data.drinks);
        }
        obtenerRecetas();
    }

    }, [busqueda, categoria, consultar, nombre]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
      );
}
 
export default RecetasProvider;