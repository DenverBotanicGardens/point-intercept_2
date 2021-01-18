//dependencies
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Input, SubmitBtn } from "../../components/Form";
import {useHistory, useParams } from 'react-router-dom'
import RecordTransectName from "./RecordTransectName"
import { HitInputSelect } from "./HitInputSelect"
import { GroundInputSelect } from "./GroundInputSelect"
import PointInput from "./PointInput"

const RecordData = () => {

    //get _id param (transectID) so that it can be accessed to for displaying data and for adding t
    const { _id } = useParams()

    const history = useHistory()

    //hook for state where transect name is displayed
    const [transect, setTransect] =useState([])
    //hook for state of point data form
    const [pointFormObject, setPointFormObject] = useState({
        point: "0",
        groundSurface: "",
        soilMoisture: "",
        shrubDensity: "",
        canopyScore: "",
        firstHit: "",
    })

    //second hits//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //hook for state of second hits values (array of names)
    const [secondHits, setSecondHits] = useState([])
    //hook for state of second hits input field
    const [secondHitInput, setSecondHitInput] = useState("")

    //function to add the value in the input field to the to the list of second hit values
    const handleSecondHitSumbit = () => {
        if (secondHitInput.length > 0) {
            setSecondHits(secondHits => [...secondHits, secondHitInput])
            //setSecondHits(secondHits => secondHits.concat(secondHitInput))
            console.log("inside handleSecondHitSubmit")
            setSecondHitInput("")
        }
    }
    
    //function to update the secondHitInput as user types
    function updateSecondHitInput({ target }) {
        setSecondHitInput(target.value);
    }

    //have enter key submit value
    const keyPressed = ({ key }) => {
        if (key === "Enter") {
            handleSecondHitSumbit()
        }
      }

    
    const submitSecondHitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
      }

    //component ----maybe should save in abother file, but gotta figure out props
    const Search = ({ secondHitInput }) => <li>{secondHitInput}</li>

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //use the species list for the dropdowns and display the transectName on the page once the component mounts 
    useEffect(() => {
 
        //GET Method for pulling transect name
        API.getTransectById(_id)
        .then(res => {
            setTransect(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        console.log("inside handleinput", event.target.name, event.target.value)
        const { name, value } = event.target;
        setPointFormObject({...pointFormObject, [name]: value})
    };

    //when the form is submitted, use API.addPoint method to save the project data
    //then navigate to a new Point Data Record page, with point incremented by 0.25
    function handlePointFormSubmitNext(event) {
        event.preventDefault(pointFormObject.firstHit)
        console.log(pointFormObject)
        console.log(secondHits)
            API.addPoint({
                point: pointFormObject.point,
                ground_surface: pointFormObject.groundSurface,
                soil_moisture_percentage: pointFormObject.soilMoisture,
                shrub_density: pointFormObject.shrubDensity,
                canopy_score: pointFormObject.canopyScore,
                hit_one: pointFormObject.firstHit,
                hit_two: secondHits,
                transectID: _id //this is the transect that I am adding the point to
            })
            .then(() => 
            
            {   const newPoint = parseFloat(pointFormObject.point) + 0.25
                
                setPointFormObject({
                point: newPoint,
                groundSurface: "",
                soilMoisture: "",
                shrubDensity: "",
                canopyScore: "",
                firstHit: "",
            })
                setSecondHits([])
            })
                .catch(err => console.log(err))
        
    };


    //when the form is submitted, use API.addPoint method to save the project data
    //then navigate to the projects page
    function handlePointFormSubmitEnd(event) {
        event.preventDefault()

            API.addPoint({
                point: pointFormObject.point,
                ground_surface: pointFormObject.groundSurface,
                soil_moisture_percentage: pointFormObject.soilMoisture,
                shrub_density: pointFormObject.shrubDensity,
                canopy_score: pointFormObject.canopyScore,
                hit_one: pointFormObject.firstHit,
                hit_two: secondHits,
                transectID: _id //this is the transect that I am adding the point to
            })
                .then(history.push('/projects'))
                .catch(err => console.log(err))
        
    };

    return (
        <>
        <div className="row">
            <div className="col">
                <RecordTransectName
                    id={transect._id}
                    transect={transect.transect}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-auto">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">point</div>
                    </div>
                    <PointInput value={pointFormObject.point} type="number" step="0.25" min="0" name="point" id="point" onChange={handleInputChange}></PointInput>

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <label>ground surface</label>
                    <GroundInputSelect value={pointFormObject.groundSurface} type="text" name="groundSurface" className="form-control" id="groundSurface" onChange={handleInputChange}></GroundInputSelect>
                </div>
                <div className="form-group">
                    <label>soil moisture percentage</label>
                    <Input value={pointFormObject.soilMoisture} type="number" name="soilMoisture" step="0.1" className="form-control" id="soilMoisture" min="0" onChange={handleInputChange}></Input>
                </div>
                <div className="form-group">
                    <label>shrub density</label>
                    <Input value={pointFormObject.shrubDensity} type="number" name="shrubDensity" className="form-control" id="shrubDensity" min="0" onChange={handleInputChange}></Input>
                </div>
                <div className="form-group">
                    <label>canopy score (value from densiometer, not %)</label>
                    <Input value={pointFormObject.canopyScore} type="number" name="canopyScore" max="96" min="0" className="form-control" id="canopyScore" onChange={handleInputChange}></Input>
                </div>
                <div className="form-group">
                    <label>first hit</label>
                    <HitInputSelect
                    value={pointFormObject.firstHit}
                    name="firstHit"
                    className="form-control"
                    id="firstHit"
                    onChange={handleInputChange}
                    ></HitInputSelect>
                </div>
                <div className="form-group">
                    <label>second hit(s)</label>
                    <ul>
                        {secondHits.map((secondHitInput, i) => (
                            <Search
                                secondHitInput={secondHitInput}
                                key={secondHitInput + i}
                            />
                        ))}
                    </ul>
                    <form className="form-inline" onSubmit={submitSecondHitHandler}>
                        <input
                            className="form-control"
                            type="text"
                            onChange={updateSecondHitInput}
                            onKeyPress={keyPressed}
                            value={secondHitInput}
                        />
                        <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={handleSecondHitSumbit}
                        >
                            +
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <SubmitBtn
                    onClick={handlePointFormSubmitEnd}
                >
                    end transect
                </SubmitBtn>
            </div>
            <div className="col-8">
                <SubmitBtn
                    onClick={handlePointFormSubmitNext}
                >
                    next point
                </SubmitBtn>
            </div>
        </div>
        </>
    )
}

export default RecordData