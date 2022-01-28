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
import useMediaQuery from "@mui/material/useMediaQuery";
import PreviewIcon from '@mui/icons-material/Preview';
import { GridActionsCellItem } from "@mui/x-data-grid";

const Rows = [
  {
    id: 1,
    qseq_id: "SRR54564",
    pident: "3d pv1 sabin1 AY546445",
    qlen: 100,
    Leng: 500,
    mm: 0,
    gap: 0,
    qstart: 0,
    qend: 200,
    sstart: 546,
    Send: 654,
    evalue: 1.94e-100,
    bit: 67.8,
    poltype: "PV1",
    polstart: 975,
    polend: 975,
    Sequence: ""
  },
  {
    id: 2,
    qseq_id: "SRR54565",
    pident: "3d pv1 sabin1 AY546446",
    qlen: 100,
    Leng: 501,
    mm: 0,
    gap: 0,
    qstart: 1,
    qend: 201,
    sstart: 547,
    Send: 655,
    evalue: 1.94e-99,
    bit: 67.9,
    poltype: "PV2",
    polstart: 976,
    polend: 976,
    Sequence: ""
  },
  {
    id: 3,
    qseq_id: "SRR54566",
    pident: "3d pv1 sabin1 AY546447",
    qlen: 100,
    Leng: 502,
    mm: 0,
    gap: 0,
    qstart: 2,
    qend: 202,
    sstart: 548,
    Send: 656,
    evalue: 1.94e-98,
    bit: 68,
    poltype: "PV1",
    polstart: 977,
    polend: 977,
    Sequence: ""
  },
  {
    id: 4,
    qseq_id: "SRR54567",
    pident: "3d pv1 sabin1 AY546448",
    qlen: 100,
    Leng: 503,
    mm: 0,
    gap: 0,
    qstart: 3,
    qend: 203,
    sstart: 549,
    Send: 657,
    evalue: 1.94e-97,
    bit: 68.1,
    poltype: "PV2",
    polstart: 978,
    polend: 978,
    Sequence: ""
  },
  {
    id: 5,
    qseq_id: "SRR54568",
    pident: "3d pv1 sabin1 AY546449",
    qlen: 100,
    Leng: 504,
    mm: 0,
    gap: 0,
    qstart: 4,
    qend: 204,
    sstart: 550,
    Send: 658,
    evalue: 1.94e-96,
    bit: 68.2,
    poltype: "PV1",
    polstart: 979,
    polend: 979,
    Sequence: ""
  },
  {
    id: 6,
    qseq_id: "SRR54569",
    pident: "3d pv1 sabin1 AY546450",
    qlen: 100,
    Leng: 505,
    mm: 0,
    gap: 0,
    qstart: 5,
    qend: 205,
    sstart: 551,
    Send: 659,
    evalue: 1.94e-95,
    bit: 68.3,
    poltype: "PV2",
    polstart: 980,
    polend: 980,
    Sequence: ""
  },
  {
    id: 7,
    qseq_id: "SRR54570",
    pident: "3d pv1 sabin1 AY546451",
    qlen: 100,
    Leng: 506,
    mm: 0,
    gap: 0,
    qstart: 6,
    qend: 206,
    sstart: 552,
    Send: 660,
    evalue: 1.94e-94,
    bit: 68.4,
    poltype: "PV1",
    polstart: 981,
    polend: 981,
    Sequence: ""
  },
  {
    id: 8,
    qseq_id: "SRR54571",
    pident: "3d pv1 sabin1 AY546452",
    qlen: 100,
    Leng: 507,
    mm: 0,
    gap: 0,
    qstart: 7,
    qend: 207,
    sstart: 553,
    Send: 661,
    evalue: 1.94e-93,
    bit: 68.5,
    poltype: "PV2",
    polstart: 982,
    polend: 982,
    Sequence: ""
  },
  {
    id: 9,
    qseq_id: "SRR54572",
    pident: "3d pv1 sabin1 AY546453",
    qlen: 100,
    Leng: 508,
    mm: 0,
    gap: 0,
    qstart: 8,
    qend: 208,
    sstart: 554,
    Send: 662,
    evalue: 1.94e-92,
    bit: 68.6,
    poltype: "PV1",
    polstart: 983,
    polend: 983,
    Sequence: ""
  },
  {
    id: 10,
    qseq_id: "SRR54573",
    pident: "3d pv1 sabin1 AY546454",
    qlen: 100,
    Leng: 509,
    mm: 0,
    gap: 0,
    qstart: 9,
    qend: 209,
    sstart: 555,
    Send: 663,
    evalue: 1.94e-91,
    bit: 68.7,
    poltype: "PV2",
    polstart: 984,
    polend: 984,
    Sequence: ""
  },
  {
    id: 11,
    qseq_id: "SRR54574",
    pident: "3d pv1 sabin1 AY546455",
    qlen: 100,
    Leng: 510,
    mm: 0,
    gap: 0,
    qstart: 10,
    qend: 210,
    sstart: 556,
    Send: 664,
    evalue: 1.94e-90,
    bit: 68.8,
    poltype: "PV1",
    polstart: 985,
    polend: 985,
    Sequence: ""
  },
  {
    id: 12,
    qseq_id: "SRR54575",
    pident: "3d pv1 sabin1 AY546456",
    qlen: 100,
    Leng: 511,
    mm: 0,
    gap: 0,
    qstart: 11,
    qend: 211,
    sstart: 557,
    Send: 665,
    evalue: 1.94e-89,
    bit: 68.9,
    poltype: "PV2",
    polstart: 986,
    polend: 986,
    Sequence: ""
  },
  {
    id: 13,
    qseq_id: "SRR54576",
    pident: "3d pv1 sabin1 AY546457",
    qlen: 100,
    Leng: 512,
    mm: 0,
    gap: 0,
    qstart: 12,
    qend: 212,
    sstart: 558,
    Send: 666,
    evalue: 1.94e-88,
    bit: 69,
    poltype: "PV1",
    polstart: 987,
    polend: 987,
    Sequence: ""
  },
  {
    id: 14,
    qseq_id: "SRR54577",
    pident: "3d pv1 sabin1 AY546458",
    qlen: 100,
    Leng: 513,
    mm: 0,
    gap: 0,
    qstart: 13,
    qend: 213,
    sstart: 559,
    Send: 667,
    evalue: 1.94e-87,
    bit: 69.1,
    poltype: "PV2",
    polstart: 988,
    polend: 988,
    Sequence: ""
  },
  {
    id: 15,
    qseq_id: "SRR54578",
    pident: "3d pv1 sabin1 AY546459",
    qlen: 100,
    Leng: 514,
    mm: 0,
    gap: 0,
    qstart: 14,
    qend: 214,
    sstart: 560,
    Send: 668,
    evalue: 1.94e-86,
    bit: 69.2,
    poltype: "PV1",
    polstart: 989,
    polend: 989,
    Sequence: ""
  },
  {
    id: 16,
    qseq_id: "SRR54579",
    pident: "3d pv1 sabin1 AY546460",
    qlen: 100,
    Leng: 515,
    mm: 0,
    gap: 0,
    qstart: 15,
    qend: 215,
    sstart: 561,
    Send: 669,
    evalue: 1.94e-85,
    bit: 69.3,
    poltype: "PV2",
    polstart: 990,
    polend: 990,
    Sequence: ""
  },
  {
    id: 17,
    qseq_id: "SRR54580",
    pident: "3d pv1 sabin1 AY546461",
    qlen: 100,
    Leng: 516,
    mm: 0,
    gap: 0,
    qstart: 16,
    qend: 216,
    sstart: 562,
    Send: 670,
    evalue: 1.94e-84,
    bit: 69.4,
    poltype: "PV1",
    polstart: 991,
    polend: 991,
    Sequence: ""
  },
  {
    id: 18,
    qseq_id: "SRR54581",
    pident: "3d pv1 sabin1 AY546462",
    qlen: 100,
    Leng: 517,
    mm: 0,
    gap: 0,
    qstart: 17,
    qend: 217,
    sstart: 563,
    Send: 671,
    evalue: 1.94e-83,
    bit: 69.5,
    poltype: "PV2",
    polstart: 992,
    polend: 992,
    Sequence: ""
  },
  {
    id: 19,
    qseq_id: "SRR54582",
    pident: "3d pv1 sabin1 AY546463",
    qlen: 100,
    Leng: 518,
    mm: 0,
    gap: 0,
    qstart: 18,
    qend: 218,
    sstart: 564,
    Send: 672,
    evalue: 1.94e-82,
    bit: 69.6,
    poltype: "PV1",
    polstart: 993,
    polend: 993,
    Sequence: ""
  },
  {
    id: 20,
    qseq_id: "SRR54583",
    pident: "3d pv1 sabin1 AY546464",
    qlen: 100,
    Leng: 519,
    mm: 0,
    gap: 0,
    qstart: 19,
    qend: 219,
    sstart: 565,
    Send: 673,
    evalue: 1.94e-81,
    bit: 69.7,
    poltype: "PV2",
    polstart: 994,
    polend: 994,
    Sequence: ""
  },
  {
    id: 21,
    qseq_id: "SRR54584",
    pident: "3d pv1 sabin1 AY546465",
    qlen: 100,
    Leng: 520,
    mm: 0,
    gap: 0,
    qstart: 20,
    qend: 220,
    sstart: 566,
    Send: 674,
    evalue: 1.94e-80,
    bit: 69.8,
    poltype: "PV1",
    polstart: 995,
    polend: 995,
    Sequence: ""
  },
  {
    id: 22,
    qseq_id: "SRR54585",
    pident: "3d pv1 sabin1 AY546466",
    qlen: 100,
    Leng: 521,
    mm: 0,
    gap: 0,
    qstart: 21,
    qend: 221,
    sstart: 567,
    Send: 675,
    evalue: 1.94e-79,
    bit: 67.8,
    poltype: "PV2",
    polstart: 996,
    polend: 996,
    Sequence: ""
  },
  {
    id: 23,
    qseq_id: "SRR54586",
    pident: "3d pv1 sabin1 AY546467",
    qlen: 100,
    Leng: 522,
    mm: 0,
    gap: 0,
    qstart: 22,
    qend: 222,
    sstart: 568,
    Send: 676,
    evalue: 1.94e-78,
    bit: 67.9,
    poltype: "PV1",
    polstart: 997,
    polend: 997,
    Sequence: ""
  },
  {
    id: 24,
    qseq_id: "SRR54587",
    pident: "3d pv1 sabin1 AY546468",
    qlen: 100,
    Leng: 523,
    mm: 0,
    gap: 0,
    qstart: 23,
    qend: 223,
    sstart: 569,
    Send: 677,
    evalue: 1.94e-77,
    bit: 68,
    poltype: "PV2",
    polstart: 998,
    polend: 998,
    Sequence: ""
  },
  {
    id: 25,
    qseq_id: "SRR54588",
    pident: "3d pv1 sabin1 AY546469",
    qlen: 100,
    Leng: 524,
    mm: 0,
    gap: 0,
    qstart: 24,
    qend: 224,
    sstart: 570,
    Send: 678,
    evalue: 1.94e-76,
    bit: 68.1,
    poltype: "PV1",
    polstart: 999,
    polend: 999,
    Sequence: ""
  },
  {
    id: 26,
    qseq_id: "SRR54589",
    pident: "3d pv1 sabin1 AY546470",
    qlen: 100,
    Leng: 525,
    mm: 0,
    gap: 0,
    qstart: 25,
    qend: 225,
    sstart: 571,
    Send: 679,
    evalue: 1.94e-75,
    bit: 68.2,
    poltype: "PV2",
    polstart: 1000,
    polend: 1000,
    Sequence: ""
  },
  {
    id: 27,
    qseq_id: "SRR54590",
    pident: "3d pv1 sabin1 AY546471",
    qlen: 100,
    Leng: 526,
    mm: 0,
    gap: 0,
    qstart: 26,
    qend: 226,
    sstart: 572,
    Send: 680,
    evalue: 1.94e-74,
    bit: 68.3,
    poltype: "PV1",
    polstart: 1001,
    polend: 1001,
    Sequence: ""
  },
  {
    id: 28,
    qseq_id: "SRR54591",
    pident: "3d pv1 sabin1 AY546472",
    qlen: 100,
    Leng: 527,
    mm: 0,
    gap: 0,
    qstart: 27,
    qend: 227,
    sstart: 573,
    Send: 681,
    evalue: 1.94e-73,
    bit: 68.4,
    poltype: "PV2",
    polstart: 1002,
    polend: 1002,
    Sequence: ""
  },
  {
    id: 29,
    qseq_id: "SRR54592",
    pident: "3d pv1 sabin1 AY546473",
    qlen: 100,
    Leng: 528,
    mm: 0,
    gap: 0,
    qstart: 28,
    qend: 228,
    sstart: 574,
    Send: 682,
    evalue: 1.94e-72,
    bit: 68.5,
    poltype: "PV1",
    polstart: 1003,
    polend: 1003,
    Sequence: ""
  },
  {
    id: 30,
    qseq_id: "SRR54593",
    pident: "3d pv1 sabin1 AY546474",
    qlen: 100,
    Leng: 529,
    mm: 0,
    gap: 0,
    qstart: 29,
    qend: 229,
    sstart: 575,
    Send: 683,
    evalue: 1.94e-71,
    bit: 68.6,
    poltype: "PV2",
    polstart: 1004,
    polend: 1004,
    Sequence: ""
  },
  {
    id: 31,
    qseq_id: "SRR54594",
    pident: "3d pv1 sabin1 AY546475",
    qlen: 100,
    Leng: 530,
    mm: 0,
    gap: 0,
    qstart: 30,
    qend: 230,
    sstart: 576,
    Send: 684,
    evalue: 1.94e-70,
    bit: 68.7,
    poltype: "PV1",
    polstart: 1005,
    polend: 1005,
    Sequence: ""
  },
  {
    id: 32,
    qseq_id: "SRR54595",
    pident: "3d pv1 sabin1 AY546476",
    qlen: 100,
    Leng: 531,
    mm: 0,
    gap: 0,
    qstart: 31,
    qend: 231,
    sstart: 577,
    Send: 685,
    evalue: 1.94e-69,
    bit: 68.8,
    poltype: "PV2",
    polstart: 1006,
    polend: 1006,
    Sequence: ""
  },
  {
    id: 33,
    qseq_id: "SRR54596",
    pident: "3d pv1 sabin1 AY546477",
    qlen: 100,
    Leng: 532,
    mm: 0,
    gap: 0,
    qstart: 32,
    qend: 232,
    sstart: 578,
    Send: 686,
    evalue: 1.94e-68,
    bit: 68.9,
    poltype: "PV1",
    polstart: 1007,
    polend: 1007,
    Sequence: ""
  },
  {
    id: 34,
    qseq_id: "SRR54597",
    pident: "3d pv1 sabin1 AY546478",
    qlen: 100,
    Leng: 533,
    mm: 0,
    gap: 0,
    qstart: 33,
    qend: 233,
    sstart: 579,
    Send: 687,
    evalue: 1.94e-67,
    bit: 69,
    poltype: "PV2",
    polstart: 1008,
    polend: 1008,
    Sequence: ""
  },
  {
    id: 35,
    qseq_id: "SRR54598",
    pident: "3d pv1 sabin1 AY546479",
    qlen: 100,
    Leng: 534,
    mm: 0,
    gap: 0,
    qstart: 34,
    qend: 234,
    sstart: 580,
    Send: 688,
    evalue: 1.94e-66,
    bit: 69.1,
    poltype: "PV1",
    polstart: 1009,
    polend: 1009,
    Sequence: ""
  },
  {
    id: 36,
    qseq_id: "SRR54599",
    pident: "3d pv1 sabin1 AY546480",
    qlen: 100,
    Leng: 535,
    mm: 0,
    gap: 0,
    qstart: 35,
    qend: 235,
    sstart: 581,
    Send: 689,
    evalue: 1.94e-65,
    bit: 69.2,
    poltype: "PV2",
    polstart: 1010,
    polend: 1010,
    Sequence: ""
  },
  {
    id: 37,
    qseq_id: "SRR54600",
    pident: "3d pv1 sabin1 AY546481",
    qlen: 100,
    Leng: 536,
    mm: 0,
    gap: 0,
    qstart: 36,
    qend: 236,
    sstart: 582,
    Send: 690,
    evalue: 1.94e-64,
    bit: 69.3,
    poltype: "PV1",
    polstart: 1011,
    polend: 1011,
    Sequence: ""
  },
  {
    id: 38,
    qseq_id: "SRR54601",
    pident: "3d pv1 sabin1 AY546482",
    qlen: 100,
    Leng: 537,
    mm: 0,
    gap: 0,
    qstart: 37,
    qend: 237,
    sstart: 583,
    Send: 691,
    evalue: 1.94e-63,
    bit: 69.4,
    poltype: "PV2",
    polstart: 1012,
    polend: 1012,
    Sequence: ""
  },
  {
    id: 39,
    qseq_id: "SRR54602",
    pident: "3d pv1 sabin1 AY546483",
    qlen: 100,
    Leng: 538,
    mm: 0,
    gap: 0,
    qstart: 38,
    qend: 238,
    sstart: 584,
    Send: 692,
    evalue: 1.94e-62,
    bit: 69.5,
    poltype: "PV1",
    polstart: 1013,
    polend: 1013,
    Sequence: ""
  },
  {
    id: 40,
    qseq_id: "SRR54603",
    pident: "3d pv1 sabin1 AY546484",
    qlen: 100,
    Leng: 539,
    mm: 0,
    gap: 0,
    qstart: 39,
    qend: 239,
    sstart: 585,
    Send: 693,
    evalue: 1.94e-61,
    bit: 69.6,
    poltype: "PV2",
    polstart: 1014,
    polend: 1014,
    Sequence: ""
  },
  {
    id: 41,
    qseq_id: "SRR54604",
    pident: "3d pv1 sabin1 AY546485",
    qlen: 100,
    Leng: 540,
    mm: 0,
    gap: 0,
    qstart: 40,
    qend: 240,
    sstart: 586,
    Send: 694,
    evalue: 1.94e-60,
    bit: 69.7,
    poltype: "PV1",
    polstart: 1015,
    polend: 1015,
    Sequence: ""
  },
  {
    id: 42,
    qseq_id: "SRR54605",
    pident: "3d pv1 sabin1 AY546486",
    qlen: 100,
    Leng: 541,
    mm: 0,
    gap: 0,
    qstart: 41,
    qend: 241,
    sstart: 587,
    Send: 695,
    evalue: 1.94e-59,
    bit: 69.8,
    poltype: "PV2",
    polstart: 1016,
    polend: 1016,
    Sequence: ""
  },
  {
    id: 43,
    qseq_id: "SRR54606",
    pident: "3d pv1 sabin1 AY546487",
    qlen: 100,
    Leng: 542,
    mm: 0,
    gap: 0,
    qstart: 42,
    qend: 242,
    sstart: 588,
    Send: 696,
    evalue: 1.94e-58,
    bit: 67.8,
    poltype: "PV1",
    polstart: 1017,
    polend: 1017,
    Sequence: ""
  },
  {
    id: 44,
    qseq_id: "SRR54607",
    pident: "3d pv1 sabin1 AY546488",
    qlen: 100,
    Leng: 543,
    mm: 0,
    gap: 0,
    qstart: 43,
    qend: 243,
    sstart: 589,
    Send: 697,
    evalue: 1.94e-57,
    bit: 67.9,
    poltype: "PV2",
    polstart: 1018,
    polend: 1018,
    Sequence: ""
  },
  {
    id: 45,
    qseq_id: "SRR54608",
    pident: "3d pv1 sabin1 AY546489",
    qlen: 100,
    Leng: 544,
    mm: 0,
    gap: 0,
    qstart: 44,
    qend: 244,
    sstart: 590,
    Send: 698,
    evalue: 1.94e-56,
    bit: 68,
    poltype: "PV1",
    polstart: 1019,
    polend: 1019,
    Sequence: ""
  },
  {
    id: 46,
    qseq_id: "SRR54609",
    pident: "3d pv1 sabin1 AY546490",
    qlen: 100,
    Leng: 545,
    mm: 0,
    gap: 0,
    qstart: 45,
    qend: 245,
    sstart: 591,
    Send: 699,
    evalue: 1.94e-55,
    bit: 68.1,
    poltype: "PV2",
    polstart: 1020,
    polend: 1020,
    Sequence: ""
  },
  {
    id: 47,
    qseq_id: "SRR54610",
    pident: "3d pv1 sabin1 AY546491",
    qlen: 100,
    Leng: 546,
    mm: 0,
    gap: 0,
    qstart: 46,
    qend: 246,
    sstart: 592,
    Send: 700,
    evalue: 1.94e-54,
    bit: 68.2,
    poltype: "PV1",
    polstart: 1021,
    polend: 1021,
    Sequence: ""
  },
  {
    id: 48,
    qseq_id: "SRR54611",
    pident: "3d pv1 sabin1 AY546492",
    qlen: 100,
    Leng: 547,
    mm: 0,
    gap: 0,
    qstart: 47,
    qend: 247,
    sstart: 593,
    Send: 701,
    evalue: 1.94e-53,
    bit: 68.3,
    poltype: "PV2",
    polstart: 1022,
    polend: 1022,
    Sequence: ""
  },
  {
    id: 49,
    qseq_id: "SRR54612",
    pident: "3d pv1 sabin1 AY546493",
    qlen: 100,
    Leng: 548,
    mm: 0,
    gap: 0,
    qstart: 48,
    qend: 248,
    sstart: 594,
    Send: 702,
    evalue: 1.94e-52,
    bit: 68.4,
    poltype: "PV1",
    polstart: 1023,
    polend: 1023,
    Sequence: ""
  },
  {
    id: 50,
    qseq_id: "SRR54613",
    pident: "3d pv1 sabin1 AY546494",
    qlen: 100,
    Leng: 549,
    mm: 0,
    gap: 0,
    qstart: 49,
    qend: 249,
    sstart: 595,
    Send: 703,
    evalue: 1.94e-51,
    bit: 68.5,
    poltype: "PV2",
    polstart: 1024,
    polend: 1024,
    Sequence: ""
  }

]

const About_Read_AP = () => {
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
  const matches = useMediaQuery("(max-height:50px)");

  const [About_Read_AP, setAbout_Read_AP] = useState([])
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/61f1cce41960493ad18318e8")
      .then(resp => resp.json())
      .then(resp => {
        setAbout_Read_AP(resp)
      })
  }, [])



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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "left",
      align: "left",
      width: "100",
      //// headerClassName: "data-grid-header",

    },
    {

      field: "qseq_id",
      headerName: "qseq_id",
      headerAlign: "left",
      align: "left",
      width: "100",
      // height: 'max-content',
      // error: true,
      editable: true,

    },
    {
      field: "pident",
      headerName: "pident",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: "100",
      editable: true,
      // // headerClassName: "data-grid-header",
    },
    {
      field: "qlen",
      headerName: "qlen",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: "100",
      editable: true,
      // // headerClassName: "data-grid-header",

    },
    {
      field: "Leng",
      headerName: "Leng",
      headerAlign: "center",
      type: "string",
      width: "100",
      // headerClassName: "data-grid-header",
      align: "center",

    },
    {
      field: "mm",
      headerName: "mm",
      headerAlign: "left",
      align: "left",
      width: "100",
      editable: true,
      // headerClassName: "data-grid-header",
      type: "string",
      valueOptions: [0, 5, 8, 23],

    },
    {
      field: "gap",
      headerName: "gap",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: "100",
      // headerClassName: "data-grid-header",
      align: "center",
    },
    {
      field: "qstart",
      headerName: "qstart",
      width: "100",
      editable: true,
      headerAlign: "left",
      align: "left",
      type: "string",

    },
    {
      field: "qend",
      headerName: "qend",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "sstart",
      headerName: "sstart",
      headerAlign: "left",
      align: "left",
      width: "100",
      type: "string",
      editable: true,
    },
    {
      field: "Send",
      headerName: "Send",
      type: 'string',
      headerAlign: "left",
      align: "left",
      width: "100",
      editable: true,



    },
    {
      field: "evalue",
      headerName: "evalue",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "bit",
      headerName: "bit",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "poltype",
      headerName: "poltype",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "polstart",
      headerName: "polstart",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "polend",
      headerName: "polend",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Sequence",
      headerName: "Sequence",
      width: "100",
      editable: true,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      type: "string",
      width: "100",
      color: "red",
      headerAlign: "left",
      align: "left",
      headerName: "PREVIEW SELECTED ROW",
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
    maxWidth: "95Vw",
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
        height: "80vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",
        height: "max-content"

      }}
    >
      Read Alimnment to polio

      <DataGrid

        rows={Rows}

        columns={columns}
        pagination
        backgroundColor=""
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
          params.field === "pident"
            ? "pident"
            : params.field === "qseq_id"
              ? "qseq_id"
              : params.field === "id"
                ? "id"
                : ""
        }

        style={{
          padding: "1px",
          backgroundColor: "white",
          border: "2px solid red",

          marginTop: "10px",
          marginLeft: "-360px",
          width: "160%"
        }}
        rowHeight={35}
        headerHeight={50}

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



export default About_Read_AP;