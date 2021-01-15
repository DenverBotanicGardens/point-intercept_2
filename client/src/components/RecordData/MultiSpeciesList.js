import React, { useState } from 'react';
import MultiSpecies from './MultiSpecies'

//Function for displaying the list of species being added to a list (for second hits, etc)
const MultiSpeciesList = () => {
    //hook to set the state of the list
    const [speciesNames, setSpeciesNames] = useState([]);

    const addSpeciesNames = (species) => {
        setSpeciesNames([...speciesNames, {species}])
    }
    return (
        <div>
            <ul>
                {speciesNames.map(speciesName => {
                    return ( 
                        <li key={speciesName.id}>{speciesName.species}</li> )
                })}
            </ul>
            <MultiSpecies addSpeciesNames={addSpeciesNames}/>
        </div>
    )
}

export default MultiSpeciesList;