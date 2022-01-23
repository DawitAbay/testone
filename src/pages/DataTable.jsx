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

    "& .MuiDataGrid-columnHeaderTitle": {
      // "& .data-grid-header": {
      fontWeight: 550,
      color: grey[700],

      lineHeight: "1rem",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "visible",
      // flexWrap: "wrap",
    },
    "& .MuiDataGrid-cell": {
      fontWeight: 500,

    },
    "& .id": {
      backgroundColor: lightBlue[100],
    },
    "& .SAA_Sample": {
      backgroundColor: teal[500],
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
    maxWidth: "95%",
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

      }}
      className={classes.headersAndCells}
    >
      Home Page

      {/* <ErrorBoundary> */}
      <Typography>{finalTextResponse}</Typography>
      <DataGrid

        rows={rows}
        columns={columns}
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
          width: "160%"
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

