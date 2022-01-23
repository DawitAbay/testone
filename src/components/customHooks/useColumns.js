import React, { useState, useEffect } from "react";
import {
  
  GridActionsCellItem,
  
} from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as  Route,  } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import { format } from "date-fns";
import TableData from "../../pages/TableData";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from '@material-ui/core'

const useColumns = (handleOpen) => {
  const [quality, setQuality] = useState('');

  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary,
      },
      textPrimary: {
        color: theme.palette.text.primary,
      },
      headers: {
        whiteSpace: "normal",
        wordWrap: "break-word",
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflow: "visible",
          lineHeight: "2rem",
          alignItems: "flex-start",
          alignContent: "flex-start",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
        },
       
      },
    }),
    { defaultTheme }
  );

  const classes = useStyles();

  const styles = {
    customHeaderCell: {
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "visible",

      flexWrap: "wrap",
      // lineHeight: "2rem",
      alignItems: "flex-start",
      alignContent: "flex-start",
    
    },
  };

  const handleEditClick = (event, params) => {

    const api = params.api;


    api.setRowMode(params.id, "edit");
  };

  const handleSaveClick = (event, params) => {
    event.stopPropagation();
    console.log(params);
    params.api.commitRowChange(params.id);
    params.api.commitRowChange(params.SAA_Sample);
    params.api.setRowMode(params.id, "view");
    const row = params.api.getRow(params.id);
    const row2 = params.api.getRow(params.SAA_Sample);
    params.api.updateRows([{ ...row }]);
  };

  const handleCancelClick = (event, params) => {
    event.stopPropagation();
    const api = params.api;
    api.setRowMode(params.id, "view");
    api.setRowMode(params.SAA_Sample, "view");
  };

  const handleSelectClick = (e, val) =>{
    console.log(e);
    console.log(e.target.value);
    console.log(val);
    setQuality(e.target.value);
    console.log('quality');
    console.log(quality);
  }

 

 
  const columnsAll = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
      headerClassName: "data-grid-header",
    },
    {
      
      field: "SAA_Sample",
      headerName: "SAA_Sample",
      headerAlign: "right",
      width: 150,
      // height: 'max-content',
      // error: true,
      editable: true,
      
    },
    {
      field: "Labels",
      headerName: "Labels",
      type: "string",
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
    },
    {
      field: "location_hit",
      headerName: "location_hit",
      type: "string",
      // headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
      
    },
    {
      field: "PP_hits",
      headerName: "PP_hits",
      headerAlign: "left",
      type: "string",
      width: 100,
      headerClassName: "data-grid-header",
      align: "left",
      
    },
    {
      field: "Read_hit_count",
      headerName: "Read_hit_count",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
      type: "string",
      valueOptions: [0,5,8,23],
     
    },
    {
      field: "Read_AP",
      headerName: "Read_AP",
      type: "string",
      // headerAlign: "center",
      width: 150,
      headerClassName: "data-grid-header",
      align: "left",
      renderCell: (params) => {
        

        
        return (
          <>
         
         {/* <Link href={`/About_Read_AP?id=${params.id}`} target="_blank">Profile</Link> */}
            <Button variant="outlined" size="medium" href="/About_Read_AP"  >
        View
      </Button>
          </>
        );
    }
    },
    {
      field: "Read_AGB",
      headerName: "Read_AGB",
      width: 150,
      editable: true,
      align: "left",
      type: "string",
      renderCell: (params) => {
        

        
        return (
          <>
            
            <Button variant="outlined" size="medium" href="/Read_AGB">
        View
      </Button>
          </>
        );
    }
      
    },
    {
      field: "Conting_A",
      headerName: "Conting_A",
      width: 150,
      editable: true,
      type: "string",
      align: "left",
      renderCell: (params) => {
        

        
        return (
          <>
            
            <Button variant="outlined" size="medium" href="/data">
        View
      </Button>
          </>
        );
    }
    },
    {
      field: "B_Sample_info",
      headerName: "B_Sample_info",
      headeralign: "center",
      align: "left",
      width: 150,
      type: "string",
      editable: true,
    },
    {
      field: "SAA_Release_Date",
      headerName: "SAA_Release_Date",
      type: 'date',
      align: "left",
      width: 150,
      editable: true,
      // valueFormatter for displaying
      valueFormatter: (params) => {
        
        return format(new Date(params.value), 'MM/dd/Y');
        
      },
      
      valueGetter: (params) => {

        return format(new Date(params.value), 'MM/dd/Y');
      },
    },
    {
      field: "location",
      headerName: "location",
      width: 130,
      editable: true,
      type: "string",
      },
    {
      field: "comment",
      headerName: "comment",
      width: 130,
      editable: true,
      type: "string",
      },
    
    {
      field: "action",
      type: "action",
      width: 130,
      color :"red",
      headerName: "PREVIEW SELECTED ROW",
      sortable: false,
      renderCell: (params) => {
        

        
          return (
            <>
              
              <GridActionsCellItem
                icon={<PreviewIcon sx={{ align: "center", fontSize: 40 }} />}
                label="VIEW"
                
                onClick={() => handleOpen(params)}
                color="inherit"
              />
            </>
          );
      },
    },
  ];
  return columnsAll;
  

};

export default useColumns;
