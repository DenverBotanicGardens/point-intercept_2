//dependencies
import React from 'react'

//components
import CreateNew from '../components/CreateNew/CreateNew'

const CreateProject = () => {
    return (
        <div className="row">
            <div className="col s12">
                <h1>create a new project</h1>
                <CreateNew />
            </div>
        </div>
    )
}

export default CreateProject