import React, {
  useState,
  // useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import {
  DataGrid,
  GridToolbar,
  // GridCellParams,
  // GridApi,
  // useGridApiRef,
  // esES,
  // GridToolbarContainer,
  // GridToolbarFilterButton,
  GridActionsCellItem,
  // GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import PreviewIcon from '@mui/icons-material/Preview';

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
import useColumnsdata2 from "../components/customHooks/useColumnsdata2";
import useMediaQuery from "@mui/material/useMediaQuery";



const Rows = [
  {
    id: 1,
    qseq_id: "Node_01",
    Stitle: "Poli 2 strain sabin",
    pid: 100,
    Leng: 128,
    qlen: 321,
    Slen: 412,
    mismatch: 0,
    gapopen: 0,
    qstart: 1,
    qend: 258,
    sstart: 78,
    Send: 145,
    evalue: 1.75e-57,
    bitscore: 704,
    sgi: 446546834,
    Stands: 12083,
    sblastnames: "Viruses"
  },
  {
    id: 2,
    qseq_id: "Node_02",
    Stitle: "Poli 2 strain sabin",
    pid: 101,
    Leng: 129,
    qlen: 322,
    Slen: 413,
    mismatch: 0,
    gapopen: 0,
    qstart: 1,
    qend: 259,
    sstart: 79,
    Send: 146,
    evalue: 1.75e-56,
    bitscore: 705,
    sgi: 446546835,
    Stands: 12084,
    sblastnames: "Viruses"
  },
  {
    id: 3,
    qseq_id: "Node_03",
    Stitle: "Poli 2 strain sabin",
    pid: 102,
    Leng: 130,
    qlen: 323,
    Slen: 414,
    mismatch: 0,
    gapopen: 0,
    qstart: 1,
    qend: 260,
    sstart: 80,
    Send: 147,
    evalue: 1.75e-55,
    bitscore: 706,
    sgi: 446546836,
    Stands: 12085,
    sblastnames: "Viruses"
  },

]

const TableData = () => {
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

  const [tableData, setTableData] = useState([])
  // useEffect(() => {
  //   fetch("https://api.jsonbin.io/b/61f1cd971960493ad183192e")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data))

  // }, []);



  const getData = (options, isMounted, abortContr) => {
    setTimeout(() => {


      axios(options, { signal: abortContr.signal })
        .then((res) => {
          //   if (isMounted) {
          if (isMounted.current) {
            // if (res.statusText !== "OK") {
            if (res.status < 200 || res.status > 300) {
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
  // const columnsAll_Conting_A = useColumns(handleOpen, classes);
  const columnsAll_Conting_A = useColumnsdata2(handleOpen);

  const columny = useMemo(() => {
    console.log("columny");
    // return datadb;
    return columnsAll_Conting_A;
  }, []);


  const columns = [
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
      valueOptions: [0, 5, 8, 23],

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
        // height: "80vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "100vh",
        maxwidth: "150%",

      }}
    > Conting Assembly Page
      <DataGrid

        rows={Rows}

        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20, 40, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        editMode="row"
        autoHeight={true}
        components={{
          Toolbar: GridToolbar,
        }}
        getCellClassName={(params) =>
          params.field === "Stitle"
            ? "Stitle"
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
          overflow: "revert",

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

export default TableData;