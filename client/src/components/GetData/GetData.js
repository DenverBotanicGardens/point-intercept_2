import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from 'react-router-dom'
import ResumeProjectName from '../AddTransect/ResumeProjectName'
import { CSVLink } from "react-csv"
import MeanValuesChart from './MeanValuesChart'
import TopCanopyChart from './TopCanopyChart'
import LowerCanopyChart from './LowerCanopyChart'
import moment from 'moment-timezone'



const GetData = () => {

    const { _id } = useParams()
    

    //setting component's initial state
    //hook for state where project title is displayed
    const [project, setProject] =useState([])
    //hook for state of data to be downloaded as csv
    const [data, setData] = useState([])
    //hook for state of data for the charts
    const [chartData, setChartData] = useState([])
    //hook for state of top canopy taxa chart data
    const [topCanopy, setTopCanopy] = useState([])
    //hook for state of lower canopy taxa chart data
    const [lowerCanopy, setLowerCanopy] = useState([])

    //display the project title once the component mounts
    useEffect(() => {
        //GET Method for pulling project name
        API.getProjectByID(_id)
            .then(res => {
                setProject(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    //run the function that calls tha API and creates the formatted data for csv download
    useEffect(() => {
        API.getProjectData(_id)
            .then(res => {
                let csvData = []
                csvData.push(["transectName", "eventDate", "decimalLatitude", "decimalLongitude", "point", "groundSurface", "soilMoisturePercentage", "firstHit", "secondHit", "shrubDensity", "canopyScore"])
                let transects = res.data.transects
                transects.forEach(function(transect) {
                    for (var j = 0; j < transect.points.length; j++){
                        var arr = []
                        arr.push(transect.transect)
                        // arr.push(moment(transect.date).format('YYYY-MM-DD'))
                        arr.push(moment(transect.date).tz('UTC').format('YYYY-MM-DD'))
                        arr.push(transect.latitude)
                        arr.push(transect.longitude)
                        arr.push(transect.points[j].point)
                        arr.push(transect.points[j].ground_surface)
                        arr.push(transect.points[j].soil_moisture_percentage)
                        arr.push(transect.points[j].hit_one)
                        arr.push(transect.points[j].hit_two)
                        arr.push(transect.points[j].shrub_density)
                        arr.push(transect.points[j].canopy_score)
                        csvData.push(arr)
                    }
                })
                setData(csvData)
            })
            .catch(err => console.log(err))
    }, [])

    //run the function that calls the API and formats the mean value data for charts
    useEffect(() => {
        API.getProjectData(_id)
            .then(res => {
                const dataVisArr = []
                let transects = res.data.transects
                transects.forEach(function(transect) {
                    let newObj={}
                    newObj['transectName'] = transect.transect
                    //get values for soil moisture
                    let soilMoistureVals = []
                    for (var j = 0; j < transect.points.length; j++) {
                        if(transect.points[j].soil_moisture_percentage){
                            soilMoistureVals.push(transect.points[j].soil_moisture_percentage)
                        }
                    }
                    //get values for canopy cover
                    let canopyVals = []
                    for (var i = 0; i < transect.points.length; i++) {
                        if(transect.points[i].canopy_score){
                            canopyVals.push(transect.points[i].canopy_score)
                        }
                    }
                    //get values for shrub density
                    let shrubVals = []
                    for (var k = 0; k < transect.points.length; k++) {
                        if(transect.points[k].shrub_density){
                            shrubVals.push(transect.points[k].shrub_density)
                        }
                    }

                    //calculate mean soil moisture
                    let sumMoistureVals
                    let meanSoilMoistureVals
                    if (soilMoistureVals.length > 0){
                        sumMoistureVals = soilMoistureVals.reduce((a,b) => a += b)
                        meanSoilMoistureVals = sumMoistureVals/soilMoistureVals.length
                    }else {
                        meanSoilMoistureVals = null
                    }
            
                    //calculate mean canopy score
                    let sumCanopyVals
                    let meanCanopyVals
                    if (canopyVals.length > 0){
                        sumCanopyVals = canopyVals.reduce((a,b) => a += b)
                        meanCanopyVals = sumCanopyVals/canopyVals.length
                    }else {
                        meanCanopyVals = null
                    }

                    //calculate mean shrub density
                    let sumShrubVals
                    let meanShrubVals
                    if (shrubVals.length > 0){
                        sumShrubVals = shrubVals.reduce((a,b) => a += b)
                        meanShrubVals = sumShrubVals/shrubVals.length  
                    } else {
                        meanShrubVals = null
                    }

                    //add the mean vaues to the object
                    newObj['meanSoilMoisturePercentage'] = meanSoilMoistureVals
                    newObj['meanCanopyScore'] = meanCanopyVals
                    newObj['meanShrubDensity'] = meanShrubVals
                    dataVisArr.push(newObj)
                })
                setChartData(dataVisArr)
            })
            .catch(err => console.log(err))
    }, [])

    //run the function that calls the API and formats the data for the taxa chart
    useEffect(() => {
        API.getProjectData(_id)
            .then(res => {
                const projectTaxaFirstHits = []
                const projectTaxaSecondHits = []
                let transects = res.data.transects
                transects.forEach(function(transect) {
                    for (var i = 0; i < transect.points.length; i++) {
                        if(transect.points[i].hit_one){
                            projectTaxaFirstHits.push(transect.points[i].hit_one)
                        }
                    }
                    for (var g = 0; g < transect.points.length; g++) {
                        if(transect.points[g].hit_two){
                            projectTaxaSecondHits.push(transect.points[g].hit_two)
                        }
                    }
                })
                const firstHits = hitOneCounter(projectTaxaFirstHits)
                const secondHits = hitTwoCounter(projectTaxaSecondHits)
                firstHits.sort((b, a) => {
                    return a.firstHits - b.firstHits
                })
                secondHits.sort((b, a) => {
                    return a.secondHits - b.secondHits
                })
                setTopCanopy(firstHits)
                setLowerCanopy(secondHits)
            })
            .catch(err => console.log(err))
    },[])

    //function to count the instances of a taxon (first hit) found within a project (count occurrences of a string within an array)
    const hitOneCounter = function (array) {
        "use strict";
        const result = {};
        if (array instanceof Array) { // Check if input is array.
            array.forEach(function (v, i) {
                if (!result[v]) { // Initial object property creation.
                    result[v] = [i]; // Create an array for that property.
                } else { // Same occurrences found.
                    result[v].push(i); // Fill the array.
                }
            });
        }
        const hitOneObject = Object.keys(result).map(e => ({taxon: e, firstHits: result[e].length}))
        return hitOneObject
    };

    //function to count the instances of a taxon (second hit) found within a project (count occurrences of a string within an array)
    const hitTwoCounter = function (array) {
        "use strict";
        const result = {};
        if (array instanceof Array) { // Check if input is array.
            array.forEach(function (v, i) {
                if (!result[v]) { // Initial object property creation.
                    result[v] = [i]; // Create an array for that property.
                } else { // Same occurrences found.
                    result[v].push(i); // Fill the array.
                }
            });
        }
        const hitTwoObject = Object.keys(result).map(e => ({taxon: e, secondHits: result[e].length}))
        return hitTwoObject
    };


    return (
        <>
            <ResumeProjectName
                id={project._id}
                project={project.project}
            />

            <MeanValuesChart
                chartData={chartData}
            />

            <TopCanopyChart
                topCanopy={topCanopy}
            />

            <LowerCanopyChart
                lowerCanopy={lowerCanopy}
            />

            <CSVLink
            data={data}
            className="btn btn-lg btn-dark btn-block"
            filename={`${project.project}_point-intercept_data.csv`}
            >
                download csv
            </CSVLink>
        </>
    )


}

export default GetData