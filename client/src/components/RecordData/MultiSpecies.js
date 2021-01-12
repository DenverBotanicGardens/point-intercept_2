import React, { useState } from 'react';

const MultiSpecies = ({ addSpeciesNames }) => {
    const [species, setSpecies] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        addSpeciesNames(species);
        setSpecies("")
    }
    return (
        <div className="form-inline">
            <form classname="form-group" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" value={species} onChange={(e) => setSpecies(e.target.value)}/>
                    <input type="submit" value="+" className="btn btn-sm btn-dark"/>
            </form>
        </div>
    )
}

export default MultiSpecies;