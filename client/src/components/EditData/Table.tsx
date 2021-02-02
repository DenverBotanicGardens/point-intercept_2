//dependencies
import React from 'react'
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';

const Table = (props) => {
    console.log(props.data)
    const rows: RowsProp = props.data;

    const columns: ColDef[] = [
        { field: 'transect', headerName: 'transect', width: 150 },
        { field: 'date', headerName: 'date', width: 150 },
        { field: 'point', headerName: 'point', width: 150 },
        { field: 'hit_one', headerName: 'first hit', width: 150 },
        { field: 'hit_two', headerName: 'second hit(s)', width: 350 },
        { field: 'ground_surface', headerName: 'groud surface', width: 150 },
        { field: 'soil_moisture_percentage', headerName: 'soil moisture %', width: 150 },
        { field: 'canopy_score', headerName: 'canopy score', width: 150 },
        { field: 'canopy_taxa', headerName: 'canopy taxa', width: 450 },
        { field: 'shrub_density_detail', headerName: 'shrub detail', width: 450 },
        { field: 'additionalSpecies', headerName: 'add\'l taxa', width: 350 },
        { field: 'latitude', headerName: 'latitude', width: 150 },
        { field: 'longitude', headerName: 'longitude', width: 150 },
        { field: 'elevation', headerName: 'elevation(m)', width: 150 },
        { field: 'crew', headerName: 'crew', width: 450 },
      ];

    return(
        <>
            <div style={{ height: 300, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
            </div>
        </>
    )
}

export default Table
