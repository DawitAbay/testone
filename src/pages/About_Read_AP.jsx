import React, {
  useState,
  // useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import {
  DataGrid,
  GridToolbar
  // GridCellParams,
  // GridApi,
  // useGridApiRef,
  // esES,
  // GridToolbarContainer,
  // GridToolbarFilterButton,
  // GridActionsCellItem,
  // GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import {
  pink,
  purple,
  red,
  grey,
  blueGrey,
  yellow,
} from "@mui/material/colors";
import axios from "axios";
import datadb from "../components/fakeDB/datadb.json";
// import useFetch from "../components/customHooks/useFetch";
// import ErrorBoundary from "../components/ErrorBoundary";
import ModalComp from "../components/ModalComp";
import useColumnsdata3 from "../components/customHooks/useColumnsdata3";

const About_Read_AP_Read_AP = () => {
  console.log("DataTable Comp.");
  // const DataTable = ({ columns, rows }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [row_params, set_row_params] = useState({});
  const [pageSize, setPageSize] = useState(20);
  const [editRowsModel, setEditRowsModel] = useState({});

  const rowsRef = useRef([datadb]);
  //   const rowsRef = useRef(datadb);
  const [rowsData, setRowsData] = useState();
  //   const rowsRef = React.createRef(datadb);
  const isMounted = useRef(true);
  // store row data after editing
  const [editRowData, setEditRowData] = useState({});


  const [About_Read_AP, setAbout_Read_AP] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/data3")
      .then((data) => data.json())
      .then((data) => setAbout_Read_AP(data))

  }, []);



  const getData = (options, isMounted, abortContr) => {
    setTimeout(() => {


      axios(options, { signal: abortContr.signal })
        .then((res) => {
          //   if (isMounted) {
          if (isMounted.current) {
            // if (res.statusText !== "OK") {
            if (res.status < 200 || res.status > 299) {
              throw Error("Could not fetch data from that resource!");
              // console.log("Could not fetch data from that resource!");
            }
            // console.log(res.data);
            // if (rows.length > 0 && rows !== rowsData) {
            setRowsData(res.data);
            // setRowsData(datadb);
            // }
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.name);
          console.log(err.message);
        });
    }, 700);
  };



  const handleOpen = (params) => {
    console.log("handleOpen Fn");
    set_row_params(params);
    setModalOpen(true);
  };

  // const columnsAll_Read_AP = useColumns(handleOpen, classes);
  const columnsAll_Read_AP = useColumnsdata3(handleOpen);

  const columny = useMemo(() => {
    console.log("columny");
    // return datadb;
    return columnsAll_Read_AP;
  }, []);

  const rows = useMemo(() => {
    // const rows = useCallback(() => {
    if (isMounted.current) {
      // if (rowsData && Array.isArray(rowsData)) {
      console.log("rows");
      // setRowsData(data);
      return rowsData;
    }
    // else return;
  }, [rowsData]);


  const handleClose = () => {
    console.log("handleClose Fn");
    setModalOpen(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    console.log("row_params");
    console.log(row_params);
    const id = row_params.id;
    console.log(id);
    row_params.api.updateRows([{ id, _action: "delete" }]);
    console.log("Row DELETED!");
    handleClose();
    set_row_params({});


  };

  const style = {
    color: yellow["50"],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    // bgcolor: 'background.paper',
    bgcolor: grey[800],
    // backgroundColor: 'background.paper',
    border: "2px solid #000",
    // overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
    boxShadow: 24,
    p: 3,
    textAlign: "center",
  };

  // const handleEditRowsModelChange = useCallback(
  const handleEditRowsModelChange = (model) => {
    console.log("handleEditRowsModelChange");
    console.log("model");
    console.log(model);
    const editedIds = Object.keys(model); // 3

    if (editedIds.length === 0) {
      // alert(JSON.stringify(editRowData, null, 4));
      console.log(editRowData);
      // update on firebase
    } else {


      // TUTAJ ROBIMY VALIDATION
      if (model[editedIds[0]].name.value.length < 3) {
        console.log("Too SHORT");
        return;
        // return false;
        // setEditRowData({});
      } else {
        console.log("OKAY");
        // setEditRowData(model[editedIds[0]]);
        setEditRowData({ id: Number(editedIds[0]), ...model[editedIds[0]] });
      }


    }
    setEditRowsModel(model);
    console.log("editRowData");
    console.log(editRowData);
  };


  const editCommit = (params, event, details) => {
    console.log("EDIT_COMMIT: ");
    console.log(params); // id number

    console.log(editRowData);
    // TUTAJ ROBIMY ROW UPDATE
  };

  return (
    <div
      style={{
        // height: "80vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",

      }}
    >
      Read Alimnment to polio

      <DataGrid

        rows={About_Read_AP}

        columns={columny}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 40, 80, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        editMode="row"
        autoHeight={true}
        components={{
          Toolbar: GridToolbar,
        }}
        getCellClassName={(params) =>
          params.field === "pident"
            ? "pident"
            : params.field === "qseq_id"
              ? "qseq_id"
              : params.field === "id"
                ? "id"
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

    </div>
  );
};



export default About_Read_AP_Read_AP;