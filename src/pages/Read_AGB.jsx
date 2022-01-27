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
import useColumnsdata4 from "../components/customHooks/useColumnsdata4";
import useMediaQuery from "@mui/material/useMediaQuery";
import PreviewIcon from '@mui/icons-material/Preview';
import { GridActionsCellItem } from "@mui/x-data-grid";

const Rows = [
  {
    id: 1,
    seqid: "SRR779845",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.65,
    qlen: 500,
    lenght: 156,
    mismatch: 5,
    gapopen: 0,
    qstart: 375,
    qend: 349,
    sstart: 402,
    send: 333,
    evalue: 2.45e-250,
    bitscore: 375,
    Sequence: ""
  },
  {
    id: 2,
    seqid: "SRR779846",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.66,
    qlen: 500,
    lenght: 157,
    mismatch: 6,
    gapopen: 0,
    qstart: 376,
    qend: 350,
    sstart: 403,
    send: 334,
    evalue: 2.45e-249,
    bitscore: 376,
    Sequence: ""
  },
  {
    id: 3,
    seqid: "SRR779847",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.67,
    qlen: 500,
    lenght: 158,
    mismatch: 7,
    gapopen: 0,
    qstart: 377,
    qend: 351,
    sstart: 404,
    send: 335,
    evalue: 2.45e-248,
    bitscore: 377,
    Sequence: ""
  },

]

const Read_AGB = () => {
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
  const matches = useMediaQuery("(max-height:500px)");

  const [Read_AGB, setRead_AGB] = useState([])
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/61f1ce301960493ad1831957")
      .then((data) => data.json())
      .then((data) => setRead_AGB(data))

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

  // const columnsAll_Read_AGB = useColumns(handleOpen, classes);
  const columnsAll_Read_AGB = useColumnsdata4(handleOpen);

  const columny = useMemo(() => {
    console.log("columny");
    // return datadb;
    return columnsAll_Read_AGB;
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
      headerClassName: "data-grid-header",
    },
    {

      field: "seqid",
      headerName: "seqid",
      headerAlign: "right",
      width: 150,
      // height: 'max-content',
      // error: true,
      editable: true,

    },
    {
      field: "sseqid",
      headerName: "sseqid",
      type: "string",
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
    },
    {
      field: "pident",
      headerName: "pident",
      type: "string",
      // headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",

    },
    {
      field: "qlen",
      headerName: "qlen",
      headerAlign: "left",
      type: "string",
      width: 100,
      headerClassName: "data-grid-header",
      align: "left",

    },
    {
      field: "lenght",
      headerName: "lenght",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: true,
      headerClassName: "data-grid-header",
      type: "string",
      valueOptions: [0, 5, 8, 23],

    },
    {
      field: "mismatch",
      headerName: "mismatch",
      type: "string",
      // headerAlign: "center",
      width: 150,
      headerClassName: "data-grid-header",
      align: "left",
    },
    {
      field: "gapopen",
      headerName: "gapopen",
      width: 150,
      editable: true,
      align: "left",
      type: "string",

    },
    {
      field: "qstart",
      headerName: "qstart",
      width: 150,
      editable: true,
      type: "string",
      align: "left",
    },
    {
      field: "qend",
      headerName: "qend",
      headeralign: "center",
      align: "left",
      width: 150,
      type: "string",
      editable: true,
    },
    {
      field: "sstart",
      headerName: "sstart",
      type: 'string',
      align: "left",
      width: 150,
      editable: true,



    },
    {
      field: "send",
      headerName: "send",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "evalue",
      headerName: "evalue",
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
      field: "Sequence",
      headerName: "Sequence",
      width: 130,
      editable: true,
      type: "string",
    },
    {
      field: "action",
      type: "string",
      width: 130,
      color: "red",
      headerName: "PREVIEW SELECTED ROW",
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
        height: "800vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",


      }}
    >
      Read Alimnment to Genbank nr
      <DataGrid

        rows={Rows}

        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 40, 80, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        editMode="row"

        autoHeight={true}
        autoWidth={true}
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
          width: "160%",
          overflow: "auto"
        }}
        rowHeight={30}
        headerHeight={40}

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



export default Read_AGB;