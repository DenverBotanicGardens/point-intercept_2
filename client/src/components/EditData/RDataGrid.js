// import React from "react";
// import ReactDOM from "react-dom";
// import ReactDataGrid from "react-data-grid";



// const RDataGrid = (props) => {
    
//     const columns = [
//         { key: 'transect', name: 'transect', editable: true},
//         { key: 'date', name: 'date', editable: true},
//         { key: 'point', name: 'point', editable: true},
//         { key: 'hit_one', name: 'first hit', editable: true},
//         { key: 'hit_two', name: 'second hit(s)', editable: true},
//         { key: 'ground_surface', name: 'groud surface', editable: true},
//         { key: 'soil_moisture_percentage', name: 'soil moisture %', editable: true},
//         { key: 'canopy_score', name: 'canopy score', editable: true},
//         { key: 'canopy_taxa', name: 'canopy taxa', editable: true},
//         { key: 'shrub_density_detail', name: 'shrub detail', editable: true},
//         { key: 'additionalSpecies', name: 'add\'l taxa', editable: true},
//         { key: 'latitude', name: 'latitude', editable: true},
//         { key: 'longitude', name: 'longitude', editable: true},
//         { key: 'elevation', name: 'elevation(m)', editable: true},
//         { key: 'crew', name: 'crew', editable: true},
//       ];
    
//     const rows = props.data


//     const state = { rows };

//     const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//         this.setState(state => {
//         const rows = state.rows.slice();
//         for (let i = fromRow; i <= toRow; i++) {
//             rows[i] = { ...rows[i], ...updated };
//         }
//         return { rows };
//         });
//     };

//     return (
//       <ReactDataGrid
//         columns={columns}
//         rowGetter={i => this.state.rows[i]}
//         rowsCount={3}
//         onGridRowsUpdated={this.onGridRowsUpdated}
//         enableCellSelect={true}
//       />
//     );

// }

// export default RDataGrid