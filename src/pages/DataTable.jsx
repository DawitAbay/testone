import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";

import Chip from '@mui/material/Chip';
import {
  red,
  blue,
  lightBlue,

  teal,
  lightGreen,
  lime,

  grey,

} from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
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
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Select from '@mui/material/Select';

const Rows = [

  {
    id: 1,
    SRA_Sample_Run: "SAA0000001",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454644,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: "",
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Dec 6, 2021",
    comments: ""
  },
  {
    id: 2,
    SRA_Sample_Run: "SAA0000002",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454645,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: "",
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Dec 7, 2021",
    comments: ""
  },
  {
    id: 3,
    SRA_Sample_Run: "SAA0000003",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454646,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86337,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Dec 8, 2021",
    comments: ""
  },
  {
    id: 4,
    SRA_Sample_Run: "SAA0000004",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454647,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86338,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Dec 9, 2021",
    comments: ""
  },
  {
    id: 5,
    SRA_Sample_Run: "SAA0000005",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454648,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86339,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Dec 10, 2021",
    comments: ""
  },
  {
    id: 6,
    SRA_Sample_Run: "SAA0000006",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454649,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86340,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Dec 11, 2021",
    comments: ""
  },
  {
    id: 7,
    SRA_Sample_Run: "SAA0000007",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454650,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86341,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Dec 12, 2021",
    comments: ""
  },
  {
    id: 8,
    SRA_Sample_Run: "SAA0000008",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454651,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86342,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Dec 13, 2021",
    comments: ""
  },
  {
    id: 9,
    SRA_Sample_Run: "SAA0000009",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454652,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86343,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Dec 14, 2021",
    comments: ""
  },
  {
    id: 10,
    SRA_Sample_Run: "SAA0000010",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454653,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86344,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Dec 15, 2021",
    comments: ""
  },
  {
    id: 11,
    SRA_Sample_Run: "SAA0000011",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454654,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86345,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Dec 16, 2021",
    comments: ""
  },
  {
    id: 12,
    SRA_Sample_Run: "SAA0000012",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454655,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86346,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Dec 17, 2021",
    comments: ""
  },
  {
    id: 13,
    SRA_Sample_Run: "SAA0000013",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454656,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86347,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Dec 18, 2021",
    comments: ""
  },
  {
    id: 14,
    SRA_Sample_Run: "SAA0000014",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454657,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86348,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Dec 19, 2021",
    comments: ""
  },
  {
    id: 15,
    SRA_Sample_Run: "SAA0000015",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454658,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86349,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Dec 20, 2021",
    comments: ""
  },
  {
    id: 16,
    SRA_Sample_Run: "SAA0000016",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454659,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86350,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Dec 21, 2021",
    comments: ""
  },
  {
    id: 17,
    SRA_Sample_Run: "SAA0000017",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454660,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86351,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Dec 22, 2021",
    comments: ""
  },
  {
    id: 18,
    SRA_Sample_Run: "SAA0000018",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454661,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86352,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Dec 23, 2021",
    comments: ""
  },
  {
    id: 19,
    SRA_Sample_Run: "SAA0000019",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454662,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86353,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Dec 24, 2021",
    comments: ""
  },
  {
    id: 20,
    SRA_Sample_Run: "SAA0000020",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454663,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86354,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Dec 25, 2021",
    comments: ""
  },
  {
    id: 21,
    SRA_Sample_Run: "SAA0000021",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454664,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86355,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Dec 26, 2021",
    comments: ""
  },
  {
    id: 22,
    SRA_Sample_Run: "SAA0000022",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454665,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86356,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Dec 27, 2021",
    comments: ""
  },
  {
    id: 23,
    SRA_Sample_Run: "SAA0000023",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454666,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86357,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Dec 28, 2021",
    comments: ""
  },
  {
    id: 24,
    SRA_Sample_Run: "SAA0000024",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454667,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86358,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Dec 29, 2021",
    comments: ""
  },
  {
    id: 25,
    SRA_Sample_Run: "SAA0000025",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454668,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86359,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Dec 30, 2021",
    comments: ""
  },
  {
    id: 26,
    SRA_Sample_Run: "SAA0000026",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454669,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86360,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Dec 31, 2021",
    comments: ""
  },
  {
    id: 27,
    SRA_Sample_Run: "SAA0000027",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454670,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86361,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Jan 1, 2022",
    comments: ""
  },
  {
    id: 28,
    SRA_Sample_Run: "SAA0000028",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454671,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86362,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Jan 2, 2022",
    comments: ""
  },
  {
    id: 29,
    SRA_Sample_Run: "SAA0000029",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454672,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86363,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Jan 3, 2022",
    comments: ""
  },
  {
    id: 30,
    SRA_Sample_Run: "SAA0000030",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454673,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86364,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Jan 4, 2022",
    comments: ""
  },
  {
    id: 31,
    SRA_Sample_Run: "SAA0000031",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454674,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86365,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Jan 5, 2022",
    comments: ""
  },
  {
    id: 32,
    SRA_Sample_Run: "SAA0000032",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454675,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86366,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Jan 6, 2022",
    comments: ""
  },
  {
    id: 33,
    SRA_Sample_Run: "SAA0000033",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454676,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86367,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Jan 7, 2022",
    comments: ""
  },
  {
    id: 34,
    SRA_Sample_Run: "SAA0000034",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454677,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86368,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Jan 8, 2022",
    comments: ""
  },
  {
    id: 35,
    SRA_Sample_Run: "SAA0000035",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454678,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86369,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Jan 9, 2022",
    comments: ""
  },
  {
    id: 36,
    SRA_Sample_Run: "SAA0000036",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454679,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86370,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Jan 10, 2022",
    comments: ""
  },
  {
    id: 37,
    SRA_Sample_Run: "SAA0000037",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454680,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86371,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Jan 11, 2022",
    comments: ""
  },
  {
    id: 38,
    SRA_Sample_Run: "SAA0000038",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454681,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86372,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Jan 12, 2022",
    comments: ""
  },
  {
    id: 39,
    SRA_Sample_Run: "SAA0000039",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454682,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86373,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Jan 13, 2022",
    comments: ""
  },
  {
    id: 40,
    SRA_Sample_Run: "SAA0000040",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454683,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86374,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Jan 14, 2022",
    comments: ""
  },
  {
    id: 41,
    SRA_Sample_Run: "SAA0000041",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454684,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86375,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Jan 15, 2022",
    comments: ""
  },
  {
    id: 42,
    SRA_Sample_Run: "SAA0000042",
    Labels: "No Result3",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "No",
    Read_Hit_Count: 454685,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86376,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Jan 16, 2022",
    comments: ""
  },
  {
    id: 43,
    SRA_Sample_Run: "SAA0000043",
    Labels: "No Result4",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454686,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86377,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Jan 17, 2022",
    comments: ""
  },
  {
    id: 44,
    SRA_Sample_Run: "SAA0000044",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454687,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86378,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Tue, Jan 18, 2022",
    comments: ""
  },
  {
    id: 45,
    SRA_Sample_Run: "SAA0000045",
    Labels: "No Result2",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454688,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86379,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Wed, Jan 19, 2022",
    comments: ""
  },
  {
    id: 46,
    SRA_Sample_Run: "SAA0000046",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454689,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86380,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Thu, Jan 20, 2022",
    comments: ""
  },
  {
    id: 47,
    SRA_Sample_Run: "SAA0000047",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454690,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86381,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Fri, Jan 21, 2022",
    comments: ""
  },
  {
    id: 48,
    SRA_Sample_Run: "SAA0000048",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454691,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86382,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sat, Jan 22, 2022",
    comments: ""
  },
  {
    id: 49,
    SRA_Sample_Run: "SAA0000049",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454692,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86383,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Sun, Jan 23, 2022",
    comments: ""
  },
  {
    id: 50,
    SRA_Sample_Run: "SAA0000050",
    Labels: "No Result1",
    Region_Hits: "54HO,54HO,54HO,54HO,54HO,54HO,",
    Potential_Polio_Hits: "Yes",
    Read_Hit_Count: 454693,
    Read_Alignments_to_polio: "Open New Table",
    Read_Alignments_to_GenBank_nr: "No Result",
    Contig_Assembly: 86384,
    Bio_Sample_Details: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SRA_Release_Date: "Mon, Jan 24, 2022",
    comments: ""
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
    status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
    }
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

  const [Labels, setLabels] = React.useState("");
  const handleChange = (event) => {
    setLabels(event.target.value);
  };



  const columns1 = [

    {
      field: "id",
      headerName: "ID",
      width: "100",
      headerClassName: "data-grid-header",
    },
    {

      field: "SRA_Sample_Run",
      headerName: "SRA Sample Run",
      headerAlign: "right",
      width: "136",
      // height: 'max-content',
      // error: true,
      editable: true,

    },
    {
      field: "Labels",
      headerName: "Labels",
      type: "string",
      headerAlign: "center",
      width: "190",
      editable: false,
      headerClassName: "data-grid-header",
      renderCell: (params) => {
        return (
          <>
            <TextField
              style={{ width: "110%", align: "center" }}
              label="Eidt Labels"
              onChange={handleChange}
              select
            >
              <MenuItem value="Polie"><CheckIcon style={{ Color: "red", fontSize: 15 }} /> <Button style={{ align: "center", backgroundColor: "red", color: "white", fontSize: 12 }} > Polie</Button></MenuItem>
              <MenuItem value="NotPolie"><CheckIcon style={{ Color: "white", fontSize: 15 }} /><Button style={{ align: "center", backgroundColor: "green", color: "white", fontSize: 12 }} > Not Polie</Button></MenuItem>
              <MenuItem value="Reviewed" ><CheckIcon style={{ Color: "white", fontSize: 15 }} /><Button style={{ align: "center", backgroundColor: "blue", color: "white", fontSize: 12 }} > Reviewed</Button></MenuItem>
              <MenuItem value="Needs Review" ><CheckIcon style={{ Color: "white", fontSize: 15 }} /><Button style={{ align: "center", backgroundColor: "yellow", color: "black", fontSize: 12 }} > Needs Reviewed</Button></MenuItem>
            </TextField>

          </>
        );

      }

    },
    {
      field: "Region_Hits",
      headerName: "Region Hits",
      type: "string",
      // headerAlign: "center",
      width: "136",
      editable: true,
      headerClassName: "data-grid-header",

    },
    {
      field: "Potential_Polio_Hits",
      headerName: "Potential Polio Hits",
      headerAlign: "left",
      type: "string",
      width: "136",
      fontSize: "5rem",
      indent: true,
      headerClassName: "data-grid-header",


    },
    {
      field: "Read_Hit_Count",
      headerName: "Read Hit Count",
      headerAlign: "center",
      align: "left",
      width: "136",
      editable: true,
      headerClassName: "data-grid-header",
      type: "string",
      valueOptions: [0, 5, 8, 23],

    },
    {
      field: "Read_Alignments_to_polio",
      headerName: "Read Alignments to polio",
      type: "string",
      // headerAlign: "center",
      width: "136",
      headerClassName: "data-grid-header",
      align: "left",
      renderCell: (params) => {



        return (
          <>

            {/* <Link href={`/About_Read_Alignments_to_polio?id=${params.id}`} target="_blank">Profile</Link> */}
            <Button variant="outlined" size="medium" component={Link} to={'/About_Read_AP'}   >
              View
            </Button>
          </>
        );
      }
    },
    {
      field: "Read_Alignments_to_GenBank_nr",
      headerName: "Read Alignments to GenBank nr",
      width: "180",
      editable: true,
      align: "left",
      fontSize: "1rem",
      indent: true,
      type: "string",
      renderCell: (params) => {



        return (
          <>
            <Button variant="outlined" size="medium" component={Link} to={'/Read_AGB'}>View</Button>


          </>
        );
      }

    },
    {
      field: "Contig_Assembly",
      headerName: "Contig Assembly",
      width: "136",
      editable: true,
      type: "string",
      align: "left",
      renderCell: (params) => {
        return (
          <>

            <Button variant="outlined" size="medium" component={Link} to={'/TableData'} >
              View
            </Button>
          </>
        );
      }
    },
    {
      field: "Bio_Sample_Details",
      headerName: "Bio Sample Details",
      headeralign: "center",
      align: "left",
      width: "136",
      type: "string",
      editable: true,
    },
    {
      field: "SRA_Release_Date",
      headerName: "SRA Release Date",
      type: 'date',
      align: "left",
      width: "136",
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
      field: "comments",
      headerName: "comments",
      width: "136",
      editable: true,
      type: "string",
    },

    {
      field: "action",
      type: "action",
      width: "136",
      color: "red",
      headerName: "PREVIEW",
      sortable: false,
      renderCell: (params) => {



        return (
          <>

            <GridActionsCellItem
              icon={<PreviewIcon sx={{ align: "center", fontSize: 40, color: "blue" }} />}
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
        rowsPerPageOptions={[5, 10, 20, 40, 100]}
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
            : params.field === "SRA_Sample_Run"
              ? "SRA_Sample_Run"
              : params.field === "id"
                ? "id"
                : params.field === "SRA_Release_Date"
                  ? "SRA_Release_Date"
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