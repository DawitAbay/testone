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
import { Link } from 'react-router-dom';
import rowsData1 from "../components/fakeDB/rows"
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
  {
    id: 4,
    SAA_Sample: "SAA0000004",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454647,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86338,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Dec 9, 2021",
    comment: ""
  },
  {
    id: 5,
    SAA_Sample: "SAA0000005",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454648,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86339,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Dec 10, 2021",
    comment: ""
  },
  {
    id: 6,
    SAA_Sample: "SAA0000006",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454649,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86340,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Dec 11, 2021",
    comment: ""
  },
  {
    id: 7,
    SAA_Sample: "SAA0000007",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454650,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86341,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Dec 12, 2021",
    comment: ""
  },
  {
    id: 8,
    SAA_Sample: "SAA0000008",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454651,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86342,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Dec 13, 2021",
    comment: ""
  },
  {
    id: 9,
    SAA_Sample: "SAA0000009",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454652,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86343,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Dec 14, 2021",
    comment: ""
  },
  {
    id: 10,
    SAA_Sample: "SAA0000010",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454653,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86344,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Dec 15, 2021",
    comment: ""
  },
  {
    id: 11,
    SAA_Sample: "SAA0000011",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454654,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86345,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Dec 16, 2021",
    comment: ""
  },
  {
    id: 12,
    SAA_Sample: "SAA0000012",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454655,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86346,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Dec 17, 2021",
    comment: ""
  },
  {
    id: 13,
    SAA_Sample: "SAA0000013",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454656,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86347,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Dec 18, 2021",
    comment: ""
  },
  {
    id: 14,
    SAA_Sample: "SAA0000014",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454657,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86348,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Dec 19, 2021",
    comment: ""
  },
  {
    id: 15,
    SAA_Sample: "SAA0000015",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454658,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86349,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Dec 20, 2021",
    comment: ""
  },
  {
    id: 16,
    SAA_Sample: "SAA0000016",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454659,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86350,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Dec 21, 2021",
    comment: ""
  },
  {
    id: 17,
    SAA_Sample: "SAA0000017",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454660,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86351,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Dec 22, 2021",
    comment: ""
  },
  {
    id: 18,
    SAA_Sample: "SAA0000018",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454661,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86352,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Dec 23, 2021",
    comment: ""
  },
  {
    id: 19,
    SAA_Sample: "SAA0000019",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454662,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86353,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Dec 24, 2021",
    comment: ""
  },
  {
    id: 20,
    SAA_Sample: "SAA0000020",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454663,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86354,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Dec 25, 2021",
    comment: ""
  },
  {
    id: 21,
    SAA_Sample: "SAA0000021",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454664,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86355,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Dec 26, 2021",
    comment: ""
  },
  {
    id: 22,
    SAA_Sample: "SAA0000022",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454665,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86356,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Dec 27, 2021",
    comment: ""
  },
  {
    id: 23,
    SAA_Sample: "SAA0000023",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454666,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86357,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Dec 28, 2021",
    comment: ""
  },
  {
    id: 24,
    SAA_Sample: "SAA0000024",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454667,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86358,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Dec 29, 2021",
    comment: ""
  },
  {
    id: 25,
    SAA_Sample: "SAA0000025",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454668,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86359,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Dec 30, 2021",
    comment: ""
  },
  {
    id: 26,
    SAA_Sample: "SAA0000026",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454669,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86360,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Dec 31, 2021",
    comment: ""
  },
  {
    id: 27,
    SAA_Sample: "SAA0000027",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454670,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86361,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Jan 1, 2022",
    comment: ""
  },
  {
    id: 28,
    SAA_Sample: "SAA0000028",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454671,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86362,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Jan 2, 2022",
    comment: ""
  },
  {
    id: 29,
    SAA_Sample: "SAA0000029",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454672,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86363,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Jan 3, 2022",
    comment: ""
  },
  {
    id: 30,
    SAA_Sample: "SAA0000030",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454673,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86364,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Jan 4, 2022",
    comment: ""
  },
  {
    id: 31,
    SAA_Sample: "SAA0000031",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454674,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86365,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Jan 5, 2022",
    comment: ""
  },
  {
    id: 32,
    SAA_Sample: "SAA0000032",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454675,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86366,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Jan 6, 2022",
    comment: ""
  },
  {
    id: 33,
    SAA_Sample: "SAA0000033",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454676,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86367,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Jan 7, 2022",
    comment: ""
  },
  {
    id: 34,
    SAA_Sample: "SAA0000034",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454677,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86368,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Jan 8, 2022",
    comment: ""
  },
  {
    id: 35,
    SAA_Sample: "SAA0000035",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454678,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86369,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Jan 9, 2022",
    comment: ""
  },
  {
    id: 36,
    SAA_Sample: "SAA0000036",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454679,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86370,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Jan 10, 2022",
    comment: ""
  },
  {
    id: 37,
    SAA_Sample: "SAA0000037",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454680,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86371,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Jan 11, 2022",
    comment: ""
  },
  {
    id: 38,
    SAA_Sample: "SAA0000038",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454681,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86372,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Jan 12, 2022",
    comment: ""
  },
  {
    id: 39,
    SAA_Sample: "SAA0000039",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454682,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86373,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Jan 13, 2022",
    comment: ""
  },
  {
    id: 40,
    SAA_Sample: "SAA0000040",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454683,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86374,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Jan 14, 2022",
    comment: ""
  },
  {
    id: 41,
    SAA_Sample: "SAA0000041",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454684,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86375,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Jan 15, 2022",
    comment: ""
  },
  {
    id: 42,
    SAA_Sample: "SAA0000042",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "No",
    Read_hit_count: 454685,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86376,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Jan 16, 2022",
    comment: ""
  },
  {
    id: 43,
    SAA_Sample: "SAA0000043",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454686,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86377,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Jan 17, 2022",
    comment: ""
  },
  {
    id: 44,
    SAA_Sample: "SAA0000044",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454687,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86378,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Tue, Jan 18, 2022",
    comment: ""
  },
  {
    id: 45,
    SAA_Sample: "SAA0000045",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454688,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86379,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Wed, Jan 19, 2022",
    comment: ""
  },
  {
    id: 46,
    SAA_Sample: "SAA0000046",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454689,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86380,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Thu, Jan 20, 2022",
    comment: ""
  },
  {
    id: 47,
    SAA_Sample: "SAA0000047",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454690,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86381,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Fri, Jan 21, 2022",
    comment: ""
  },
  {
    id: 48,
    SAA_Sample: "SAA0000048",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454691,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86382,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sat, Jan 22, 2022",
    comment: ""
  },
  {
    id: 49,
    SAA_Sample: "SAA0000049",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454692,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86383,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Sun, Jan 23, 2022",
    comment: ""
  },
  {
    id: 50,
    SAA_Sample: "SAA0000050",
    Labels: "No Result",
    location_hit: "54HO,54HO,54HO,54HO,54HO,54HO,",
    PP_hits: "Yes",
    Read_hit_count: 454693,
    Read_AP: "Open New Table",
    Read_AGB: "No Result",
    Conting_A: 86384,
    B_Sample_info: "his tutorial is a continuation of my node js react project. This will add a mongoose database using mongodb and stepping you through how to setup clusters, collections, and documents using mongodb, as well as using code to insert and look up data from the database.",
    SAA_Release_Date: "Mon, Jan 24, 2022",
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
  const suggestions = ['Arkansas', 'Alabamba', 'Alaska', 'Arizona']
  const columns1 = [

    {
      field: "id",
      headerName: "ID",
      width: "136",
      headerClassName: "data-grid-header",
    },
    {

      field: "SAA_Sample",
      headerName: "SAA_Sample",
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
      width: "136",
      editable: true,
      headerClassName: "data-grid-header",
      renderCell: (params) => {
        return (
          <>
            <Chip data={suggestions} label="success" color="success" />
          </>

        );
      }

    },
    {
      field: "location_hit",
      headerName: "location_hit",
      type: "string",
      // headerAlign: "center",
      width: "136",
      editable: true,
      headerClassName: "data-grid-header",

    },
    {
      field: "PP_hits",
      headerName: "PP_hits",
      headerAlign: "left",
      type: "string",
      width: "136",
      headerClassName: "data-grid-header",
      align: "left",

    },
    {
      field: "Read_hit_count",
      headerName: "Read_hit_count",
      headerAlign: "center",
      align: "left",
      width: "136",
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
      width: "136",
      headerClassName: "data-grid-header",
      align: "left",
      renderCell: (params) => {



        return (
          <>

            {/* <Link href={`/About_Read_AP?id=${params.id}`} target="_blank">Profile</Link> */}
            <Button variant="outlined" size="medium" component={Link} to={'/About_Read_AP'}   >
              View
            </Button>
          </>
        );
      }
    },
    {
      field: "Read_AGB",
      headerName: "Read_AGB",
      width: "136",
      editable: true,
      align: "left",
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
      field: "Conting_A",
      headerName: "Conting_A",
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
      field: "B_Sample_info",
      headerName: "B_Sample_info",
      headeralign: "center",
      align: "left",
      width: "136",
      type: "string",
      editable: true,
    },
    {
      field: "SAA_Release_Date",
      headerName: "SAA_Release_Date",
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
      field: "comment",
      headerName: "comment",
      width: "136",
      editable: true,
      type: "string",
    },

    {
      field: "action",
      type: "action",
      width: "136",
      color: "red",
      headerName: "PREVIEW ",
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

