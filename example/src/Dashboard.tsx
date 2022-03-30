import React from "react";
import { IResource } from "./types/Resource";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';



interface Props {
    resources: IResource[];
}

export const Dashboard = (props: Props) => {

    const rows: GridRowsProp = props.resources.map(r => {
        return {
            id: r.id,
            name: r.name,
            path: r.path
        }
    })

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'path', headerName: 'Path', width: 150 },
    ];

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
};