import * as React from "react";

import { DataGrid ,GridApi, GridCellValue} from "@mui/x-data-grid";
import Button from '@mui/material/Button';

import {
  GridActionsCellItem,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import { Grid } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { generatePath, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {updateSelected } from '../../redux/tokenSelectSlice';

export default function TokenView() {
  let navigate = useNavigate();

  const token = useSelector((state) => state.selectedToken);
  console.log(token);

  const navigateToTokenDetails= ()=>{
    navigate( "/doctor/patientdiagnosis/", { replace: true });

  }

  const patients = useSelector((state) => state.token);
  const dispatch = useDispatch();
 

  const columns = [
    {
      field: "tokenNo",
      headerName: "Token Number",
      width: 150,
      type: "number",
      editable: false,
    },
    { field: "name", headerName: "Name", width: 200, editable: false },
    { field: "age", headerName: "Age", type: "number", editable: false },
    {
      field: "temperature",
      headerName: "Body temperature",
      type: "number",
      width: 200,
      //type: 200,
      editable: false,
    },
    {
      field: "BPM",
      headerName: "Pulse rate",
      type: "number",
      width: 150,
      editable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      width: 220,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
         
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
          
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
            //generatePath("/users/:id", { id: 42 });
            console.log(thisRow);
            dispatch(updateSelected(Number(thisRow.tokenNo)))


            navigateToTokenDetails();
           
             //<Navigate to= {generatePath("/doctor/patientdiagnosis/", { tokenNo: thisRow.tokenNo })} state={{ from: window.location }} replace />;
            
          //return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button  onClick={onClick}>{<Visibility />}</Button>;
      },
    },
    // {
    //   field: "actions",
    //   headerName: "View",
    //   type: "actions",
    //   width: 150,
    //   getActions: () => [
    //     <Link to={"/doctor/patientdiagnosis"}>
    //       <GridActionsCellItem icon={<Visibility />} label='Show' />,
    //     </Link>,
  
    //     // <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />,
    //     // <GridActionsCellItem icon={<RestartAlt />} label='Reset Password' />,
    //   ],
    // },
  ];


  return (
    <Grid container direction='column' alignItems={"center"}>
      <div style={{ height: 400, width: "100%" }}>
    
        <DataGrid
          //   row.dataset.id
          rows={patients}
          columns={columns}
          //checkboxSelection
          hideFooterPagination
         
          initialState={{
            pinnedColumns: {
              left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
              right: ["actions"],
            },
          }}
          
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            // const selectedRowData = patients.filter((row) =>
            //   selectedIDs.has(row.id.toString())
            // );
            console.log(selectedIDs);
          }}
          
        />
         
      </div>
      <Grid
        item
        spacing={3}
        sx={{
          paddingTop: 5,
          borderRadius: 2,
          borderWidth: 1,
        }}
      ></Grid>
    </Grid>
  );
  
}



