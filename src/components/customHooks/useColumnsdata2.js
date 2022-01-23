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


const useColumnsdata2 = (handleOpen) => {
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
    params.api.setRowMode(params.id, "view");
    const row = params.api.getRow(params.id);
    params.api.updateRows([{ ...row }]);
  };

  const handleCancelClick = (event, params) => {
    event.stopPropagation();
    const api = params.api;
    api.setRowMode(params.id, "view");
  };

  const handleSelectClick = (e, val) =>{
    console.log(e);
    console.log(e.target.value);
    console.log(val);
    setQuality(e.target.value);
    console.log('quality');
    console.log(quality);
  }

 

 

  
  const columnsAll_Conting_A = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
      headerClassName: "data-grid-header",
    },
    {
      
      field: "qseq_id",
      headerName: "qseq_id",
      headerAlign: "right",
      width: 150,
      // height: 'max-content',
      // error: true,
      editable: true,
      
    },
    {
      field: "Stitle",
      headerName: "Stitle",
      type: "string",
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
    },
    {
      field: "pid",
      headerName: "pid",
      type: "string",
      // headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
      
    },
    {
      field: "Leng",
      headerName: "Leng",
      headerAlign: "left",
      type: "string",
      width: 100,
      headerClassName: "data-grid-header",
      align: "left",
      
    },
    {
      field: "qlen",
      headerName: "qlen",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
      type: "string",
      valueOptions: [0,5,8,23],
     
    },
    {
      field: "Slen",
      headerName: "Slen",
      type: "string",
      // headerAlign: "center",
      width: 150,
      headerClassName: "data-grid-header",
      align: "left",
    },
    {
      field: "mismatch",
      headerName: "mismatch",
      width: 150,
      editable: true,
      align: "left",
      type: "string",
      
    },
    {
      field: "gapopen",
      headerName: "gapopen",
      width: 150,
      editable: true,
      type: "string",
      align: "left",
    },
    {
      field: "qstart",
      headerName: "qstart",
      headeralign: "center",
      align: "left",
      width: 150,
      type: "string",
      editable: true,
    },
    {
      field: "qend",
      headerName: "qend",
      type: 'string',
      align: "left",
      width: 150,
      editable: true,
     
      
     
    },
    {
      field: "sstart",
      headerName: "sstart",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "Send",
      headerName: "Send",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "bitscore",
      headerName: "bitscore",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "sgi",
      headerName: "sgi",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "Stands",
      headerName: "Stands",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "sblastnames",
      headerName: "sblastnames",
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
  return columnsAll_Conting_A;
};

export default useColumnsdata2;