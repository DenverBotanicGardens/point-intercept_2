//dependencies
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom'
import API from "../../utils/API";
import Table from './Table'
import { useTable } from 'react-table'

const EditProjectData = () => {

    //get _id param (transectID) so that it can be accessed to for displaying data and for adding transect name
    const { _id } = useParams()


    //setting component's initial state
    //hook for state where project title is displayed
    const [project, setProject] =useState([])

    //display the project title once the component mounts
    useEffect(() => {
        //GET Method for pulling project name
        API.getProjectByID(_id)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //create the empty array for table data to be stored in
    const tableDataArr = []

    //get data from database and construct an object for every row of table
    useEffect(() => {
        //Get method for pulling data by project ID
        API.getProjectData(_id)
        .then(res => {
            let tableTransects = res.data.transects
            class TableData {
                constructor(transect, date, latitude, longitude, elevation, crew, additionalSpecies, point, ground_surface, soil_moisture_percentage, shrub_density_detail, canopy_score, canopy_taxa, hit_one, hit_two, point_id, transect_id){
                    this.transect = transect;
                    this.date = date;
                    this.latitude = latitude;
                    this.longitude = longitude;
                    this.elevation = elevation;
                    this.crew = crew;
                    this.additionalSpecies = additionalSpecies;
                    this.point = point;
                    this.ground_surface = ground_surface;
                    this.soil_moisture_percentage = soil_moisture_percentage;
                    this.shrub_density_detail = shrub_density_detail;
                    this.canopy_score = canopy_score;
                    this.canopy_taxa = canopy_taxa;
                    this.hit_one = hit_one;
                    this.hit_two = hit_two;
                    this.point_id = point_id;
                    this.transect_id = transect_id
                }
            }
            tableTransects.forEach(tableTransect => {
                for (var j = 0; j < tableTransect.points.length; j++) {
                    tableDataArr.push(new TableData(
                        tableTransect.transect,
                        tableTransect.date,
                        tableTransect.latitude,
                        tableTransect.longitude,
                        tableTransect.elevation,
                        tableTransect.crew,
                        tableTransect.additionalSpecies,
                        tableTransect.points[j].point,
                        tableTransect.points[j].ground_surface,
                        tableTransect.points[j].soil_moisture_percentage,
                        tableTransect.points[j].shrub_density_detail,
                        tableTransect.points[j].canopy_score,
                        tableTransect.points[j].canopy_taxa,
                        tableTransect.points[j].hit_one,
                        tableTransect.points[j].hit_two,
                        tableTransect.points[j]._id,
                        tableTransect._id
                        ))
                }
            })
        })
        .catch(err => console.log(err))
    }, [])

    //define the data for the table
    const data = React.useMemo(() => tableDataArr, [])

    //define the columns for the table
    const columns = React.useMemo(
        () => [
            {
                Header: 'transect',
                accessor: 'transect'
            },
            {
                Header: 'date',
                accessor: 'date'
            },
            {
                Header: 'point',
                accessor: 'point'
            },
            {
                Header: 'first hit',
                accessor: 'hit_one'
            },
            {
                Header: 'second hit',
                accessor: 'hit_two'
            },
            {
                Header: 'ground surface',
                accessor: 'ground_surface'
            },
            {
                Header: 'soil moisture %',
                accessor: 'soil_moisture_percentage'
            },
            {
                Header: 'canopy score',
                accessor: 'canopy_score'
            },
            {
                Header: 'canopy taxa',
                accessor: 'canopy_taxa'
            },
            {
                Header: 'shrub density detail',
                accessor: 'shrub_density_detail'
            },
            {
                Header: 'additional species',
                accessor: 'additionalSpecies'
            },
            {
                Header: 'crew',
                accessor: 'crew'
            },
            {
                Header: 'latitude',
                accessor: 'latitude'
            },
            {
                Header: 'longitude',
                accessor: 'longitude'
            },
            {
                Header: 'elevation',
                accessor: 'elevation'
            }

          ],
          []
        )
    
        //hook to create instance of table
        // const tableInstance = useTable({ columns, data })

        // const {
        //     getTableProps,
        //     getTableBodyProps,
        //     headerGroups,
        //     rows,
        //     prepareRow,
        //   } = tableInstance

          const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
          } = useTable({ columns, data })

    
    return (
        <>
        
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                        {...column.getHeaderProps()}
                        style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        }}
                    >
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                            }}
                        >
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
            </table>



{/* 
            <Table
                id={project._id}
                project={project.project}
                data={data}
            /> */}
        </>
    )
}

export default EditProjectData