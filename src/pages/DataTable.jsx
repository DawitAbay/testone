import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  DataGrid,
  GridToolbar,

} from "@mui/x-data-grid";
import {
  red,

  lightBlue,

  teal,
  lightGreen,
  lime,

  grey,

} from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import ModalComp from "../components/ModalComp";
import { Typography } from "@mui/material";
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../components/reducer/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import useColumns from "../components/customHooks/useColumns";
import PreviewIcon from '@mui/icons-material/Preview';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { format } from "date-fns";

import Button from '@mui/material/Button';

const Rows = [

  {
    id: 1,
    SAA_Sample: "SAA0000001",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454644,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: "",
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Dec 6, 2021",

    comment: ""
  },
  {
    id: 2,
    SAA_Sample: "SAA0000002",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454645,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: "",
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Dec 7, 2021",
    comment: ""
  },
  {
    id: 3,
    SAA_Sample: "SAA0000003",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454646,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86337,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Dec 8, 2021",
    comment: ""
  },
]
// const defaultTheme = createTheme();
const useStyles = makeStyles({
  cellHeight: {
    ".MuiDataGrid-row, .MuiDataGrid-root .MuiDataGrid-cell, .rendering-zone": {
      "max-height": "none !important",
    },
    ".MuiDataGrid-root .MuiDataGrid-window": {
      position: "relative !important",
    },
    ".MuiDataGrid-root .MuiDataGrid-viewport": {
      "max-height": "none !important",
    },
    ".MuiDataGrid-root": { height: "auto !important" },
  },
  headersAndCells: {
    // autoHeight: "true",
    // fontWeight: 700,
    // height: "400px",
    // headerHeight: "300px",
    "& .MuiDataGrid-columnHeaderTitle": {
      // "& .data-grid-header": {
      fontWeight: 700,
      color: red[900],
      // headerHeight: 300,
      // headerHeight: "300px",
      // autoHeight: "true",
      // height: 400,
      lineHeight: "1rem",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "visible",
      // flexWrap: "wrap",
    },
    "& .MuiDataGrid-cell": {
      // "& .MuiDataGrid-root .MuiDataGrid-cell": {
      fontWeight: 500,
      // display: "flex",
      // lineHeight: "1rem",
      // whiteSpace: "normal !important",
      // wordWrap: "break-word !important",
      // overflow: "visible !important",
    },
    "& .id": {
      backgroundColor: lightBlue[100],
    },
    "& .gray": {
      backgroundColor: grey[100],
    },
  },
});

// const DataTable = ({ columns, rows, apiRef }) => {
const DataTable = ({
  // columns,
  rows,
  dataTableProps,

}) => {
  const {

    dispatch,
    finalTextResponse,
    baseURLtoDB,
  } = dataTableProps;
  // const refApi = useRef();
  const classes = useStyles();
  // const DataTable = ({ columns, rows }) => {
  const [pageSize, setPageSize] = useState(20);
  const [editRowsModel, setEditRowsModel] = useState({});
  const matches = useMediaQuery("(max-height:500px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [row_params, set_row_params] = useState({});

  // store row data after editing
  const [editRowData, setEditRowData] = useState({});

  const handleOpen = (params) => {
    set_row_params(params);
    setModalOpen(true);
  };
  const columnsAll = useColumns(handleOpen);

  const columns = useMemo(() => {
    return columnsAll;
  }, []);

  const columns1 = [

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
      valueOptions: [0, 5, 8, 23],

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

            <Button variant="outlined" size="medium" href="/TableData">
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
      color: "red",
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

  ]


  const handleClose = () => setModalOpen(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();

    const id = row_params.id;
    console.log(id);
    row_params.api.updateRows([{ id, _action: "delete" }]);
    console.log("Row DELETED!");
    handleClose();
    set_row_params({});

    // console.log(apiRef.current);
    // apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const style = {
    color: red["50"],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "95vw",
    minWidth: matches ? "80%" : "50%",
    maxHeight: "95vh",
    // maxWidth: "90vw",
    // bgcolor: 'background.paper',
    bgcolor: grey[800],
    // backgroundColor: 'background.paper',
    border: "2px solid #000",
    // overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
    boxShadow: 24,
    p: 3,
    textAlign: "center",
    overflow: matches ? "scroll" : "auto",
  };

  // const handleEditRowsModelChange = useCallback(
  const handleEditRowsModelChange = (model) => {
    console.log("handleEditRowsModelChange");
    console.log("model");
    console.log(model);
    const editedIds = Object.keys(model); // 3
    // console.log(editedIds);
    const getUpdatedRowObj = () => {
      const rowUpdated = {};
      for (const [key, value] of Object.entries(model[editedIds[0]])) {
        rowUpdated[key] = value.value;
      }
      // console.log(rowUpdated);
      return rowUpdated;
    };

    if (editedIds.length === 0) {

      console.log("editedIds.length === 0");
      // update on firebase
    } else {


      if (model[editedIds[0]].Name.value.length < 3) {
        console.log("Too SHORT");
        return;

      } else {
        console.log("OKAY");
        // setEditRowData(model[editedIds[0]]);
        setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });
        // setEditRowData({ id: Number(editedIds[0]), ...model[editedIds[0]] });
      }


    }
    setEditRowsModel(model);


  };


  const editRowCommit = (id) => {
    console.log("EDIT_ROW_COMMIT: ");
    console.log(id); // id number

    dispatch({ type: post_data, payload: editRowData });
    dispatch({ type: api_method, payload: "PUT" });
    dispatch({ type: current_url, payload: `${baseURLtoDB}/${id}` });
  };

  const styles = {
    customHeaderCell: {
      "& div": {
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflow: "visible",
      },
    },
  };

  return (
    <div
      style={{
        // height: "80vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",
        overflow: "visible",

      }}
      className={classes.headersAndCells}
    >
      Home Page

      {/* <ErrorBoundary> */}
      <Typography>{finalTextResponse}</Typography>
      <DataGrid

        rows={Rows}
        columns={columns1}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 40, 80, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        editRowsModel={editRowsModel}
        editMode="row"
        onEditRowsModelChange={handleEditRowsModelChange}
        onRowEditCommit={editRowCommit}
        autoHeight={true}
        autoWidth={true}
        components={{
          Toolbar: GridToolbar,
        }}
        getCellClassName={(params) =>
          params.field === "Labels"
            ? "Labels"
            : params.field === "SAA_Sample"
              ? "SAA_Sample"
              : params.field === "id"
                ? "id"
                : params.field === "SAA_Release_Date"
                  ? "SAA_Release_Date"
                  : ""
        }

        style={{
          padding: "10px",
          backgroundColor: "#eef5ee",
          marginTop: "10px",
          marginLeft: "-360px",
          width: "160%",
          overflow: "visible",
        }}
        rowHeight={35}
        headerHeight={70}


      />
      <ModalComp
        style={style}
        handleDelete={handleDeleteClick}
        handleClose={handleClose}
        modalOpen={modalOpen}
        params={row_params}
      />
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default DataTable;

