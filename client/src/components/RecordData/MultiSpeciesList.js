import React, { useState } from 'react';
import MultiSpecies from './MultiSpecies'

const MultiSpeciesList = () => {
    const [speciesNames, setSpeciesNames] = useState([]);

    const addSpeciesNames = (species) => {
        setSpeciesNames([...speciesNames, {species}])
    }
    return (
        <div>
            <ul>
                {speciesNames.map(speciesName => {
                    return ( <li key={speciesName.id}>{speciesName.species}</li> )
                })}
            </ul>
            <MultiSpecies addSpeciesNames={addSpeciesNames}/>
        </div>
    )
}

export default MultiSpeciesList;