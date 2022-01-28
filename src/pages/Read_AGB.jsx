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
  {
    id: 4,
    seqid: "SRR779848",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.68,
    qlen: 500,
    lenght: 159,
    mismatch: 8,
    gapopen: 1,
    qstart: 378,
    qend: 352,
    sstart: 405,
    send: 336,
    evalue: 2.45e-247,
    bitscore: 378,
    Sequence: ""
  },
  {
    id: 5,
    seqid: "SRR779849",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.69,
    qlen: 500,
    lenght: 160,
    mismatch: 9,
    gapopen: 0,
    qstart: 379,
    qend: 353,
    sstart: 406,
    send: 337,
    evalue: 2.45e-246,
    bitscore: 379,
    Sequence: ""
  },
  {
    id: 6,
    seqid: "SRR779850",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.7,
    qlen: 500,
    lenght: 161,
    mismatch: 10,
    gapopen: 0,
    qstart: 380,
    qend: 354,
    sstart: 407,
    send: 338,
    evalue: 2.45e-245,
    bitscore: 380,
    Sequence: ""
  },
  {
    id: 7,
    seqid: "SRR779851",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.71,
    qlen: 500,
    lenght: 162,
    mismatch: 11,
    gapopen: 0,
    qstart: 381,
    qend: 355,
    sstart: 408,
    send: 339,
    evalue: 2.45e-244,
    bitscore: 381,
    Sequence: ""
  },
  {
    id: 8,
    seqid: "SRR779852",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.72,
    qlen: 500,
    lenght: 163,
    mismatch: 12,
    gapopen: 0,
    qstart: 382,
    qend: 356,
    sstart: 409,
    send: 340,
    evalue: 2.45e-243,
    bitscore: 382,
    Sequence: ""
  },
  {
    id: 9,
    seqid: "SRR779853",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.73,
    qlen: 500,
    lenght: 164,
    mismatch: 13,
    gapopen: 0,
    qstart: 383,
    qend: 357,
    sstart: 410,
    send: 341,
    evalue: 2.45e-242,
    bitscore: 383,
    Sequence: ""
  },
  {
    id: 10,
    seqid: "SRR779854",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.74,
    qlen: 500,
    lenght: 165,
    mismatch: 14,
    gapopen: 1,
    qstart: 384,
    qend: 358,
    sstart: 411,
    send: 342,
    evalue: 2.45e-241,
    bitscore: 384,
    Sequence: ""
  },
  {
    id: 11,
    seqid: "SRR779855",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.75,
    qlen: 500,
    lenght: 166,
    mismatch: 15,
    gapopen: 0,
    qstart: 385,
    qend: 359,
    sstart: 412,
    send: 343,
    evalue: 2.45e-240,
    bitscore: 385,
    Sequence: ""
  },
  {
    id: 12,
    seqid: "SRR779856",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.76,
    qlen: 500,
    lenght: 167,
    mismatch: 16,
    gapopen: 0,
    qstart: 386,
    qend: 360,
    sstart: 413,
    send: 344,
    evalue: 2.45e-239,
    bitscore: 386,
    Sequence: ""
  },
  {
    id: 13,
    seqid: "SRR779857",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.77,
    qlen: 500,
    lenght: 168,
    mismatch: 17,
    gapopen: 0,
    qstart: 387,
    qend: 361,
    sstart: 414,
    send: 345,
    evalue: 2.45e-238,
    bitscore: 387,
    Sequence: ""
  },
  {
    id: 14,
    seqid: "SRR779858",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.78,
    qlen: 500,
    lenght: 169,
    mismatch: 18,
    gapopen: 0,
    qstart: 388,
    qend: 362,
    sstart: 415,
    send: 346,
    evalue: 2.45e-237,
    bitscore: 388,
    Sequence: ""
  },
  {
    id: 15,
    seqid: "SRR779859",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.79,
    qlen: 500,
    lenght: 170,
    mismatch: 19,
    gapopen: 1,
    qstart: 389,
    qend: 363,
    sstart: 416,
    send: 347,
    evalue: 2.45e-236,
    bitscore: 389,
    Sequence: ""
  },
  {
    id: 16,
    seqid: "SRR779860",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.8,
    qlen: 500,
    lenght: 171,
    mismatch: 20,
    gapopen: 1,
    qstart: 390,
    qend: 364,
    sstart: 417,
    send: 348,
    evalue: 2.45e-235,
    bitscore: 390,
    Sequence: ""
  },
  {
    id: 17,
    seqid: "SRR779861",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.81,
    qlen: 500,
    lenght: 172,
    mismatch: 21,
    gapopen: 0,
    qstart: 391,
    qend: 365,
    sstart: 418,
    send: 349,
    evalue: 2.45e-234,
    bitscore: 391,
    Sequence: ""
  },
  {
    id: 18,
    seqid: "SRR779862",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.82,
    qlen: 500,
    lenght: 173,
    mismatch: 22,
    gapopen: 0,
    qstart: 392,
    qend: 366,
    sstart: 419,
    send: 350,
    evalue: 2.45e-233,
    bitscore: 392,
    Sequence: ""
  },
  {
    id: 19,
    seqid: "SRR779863",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.83,
    qlen: 500,
    lenght: 174,
    mismatch: 23,
    gapopen: 0,
    qstart: 393,
    qend: 367,
    sstart: 420,
    send: 351,
    evalue: 2.45e-232,
    bitscore: 393,
    Sequence: ""
  },
  {
    id: 20,
    seqid: "SRR779864",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.84,
    qlen: 500,
    lenght: 175,
    mismatch: 24,
    gapopen: 0,
    qstart: 394,
    qend: 368,
    sstart: 421,
    send: 352,
    evalue: 2.45e-231,
    bitscore: 394,
    Sequence: ""
  },
  {
    id: 21,
    seqid: "SRR779865",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.85,
    qlen: 500,
    lenght: 176,
    mismatch: 25,
    gapopen: 0,
    qstart: 395,
    qend: 369,
    sstart: 422,
    send: 353,
    evalue: 2.45e-230,
    bitscore: 395,
    Sequence: ""
  },
  {
    id: 22,
    seqid: "SRR779866",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.86,
    qlen: 500,
    lenght: 177,
    mismatch: 26,
    gapopen: 0,
    qstart: 396,
    qend: 370,
    sstart: 423,
    send: 354,
    evalue: 2.45e-229,
    bitscore: 396,
    Sequence: ""
  },
  {
    id: 23,
    seqid: "SRR779867",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.87,
    qlen: 500,
    lenght: 178,
    mismatch: 27,
    gapopen: 0,
    qstart: 397,
    qend: 371,
    sstart: 424,
    send: 355,
    evalue: 2.45e-228,
    bitscore: 397,
    Sequence: ""
  },
  {
    id: 24,
    seqid: "SRR779868",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.88,
    qlen: 500,
    lenght: 179,
    mismatch: 28,
    gapopen: 0,
    qstart: 398,
    qend: 372,
    sstart: 425,
    send: 356,
    evalue: 2.45e-227,
    bitscore: 398,
    Sequence: ""
  },
  {
    id: 25,
    seqid: "SRR779869",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.89,
    qlen: 500,
    lenght: 180,
    mismatch: 29,
    gapopen: 1,
    qstart: 399,
    qend: 373,
    sstart: 426,
    send: 357,
    evalue: 2.45e-226,
    bitscore: 399,
    Sequence: ""
  },
  {
    id: 26,
    seqid: "SRR779870",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.9,
    qlen: 500,
    lenght: 181,
    mismatch: 30,
    gapopen: 0,
    qstart: 400,
    qend: 374,
    sstart: 427,
    send: 358,
    evalue: 2.45e-225,
    bitscore: 400,
    Sequence: ""
  },
  {
    id: 27,
    seqid: "SRR779871",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.91,
    qlen: 500,
    lenght: 182,
    mismatch: 31,
    gapopen: 0,
    qstart: 401,
    qend: 375,
    sstart: 428,
    send: 359,
    evalue: 2.45e-224,
    bitscore: 401,
    Sequence: ""
  },
  {
    id: 28,
    seqid: "SRR779872",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.92,
    qlen: 500,
    lenght: 183,
    mismatch: 32,
    gapopen: 1,
    qstart: 402,
    qend: 376,
    sstart: 429,
    send: 360,
    evalue: 2.45e-223,
    bitscore: 402,
    Sequence: ""
  },
  {
    id: 29,
    seqid: "SRR779873",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.93,
    qlen: 500,
    lenght: 184,
    mismatch: 33,
    gapopen: 0,
    qstart: 403,
    qend: 377,
    sstart: 430,
    send: 361,
    evalue: 2.45e-222,
    bitscore: 403,
    Sequence: ""
  },
  {
    id: 30,
    seqid: "SRR779874",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.94,
    qlen: 500,
    lenght: 185,
    mismatch: 34,
    gapopen: 1,
    qstart: 404,
    qend: 378,
    sstart: 431,
    send: 362,
    evalue: 2.45e-221,
    bitscore: 404,
    Sequence: ""
  },
  {
    id: 31,
    seqid: "SRR779875",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.95,
    qlen: 500,
    lenght: 186,
    mismatch: 35,
    gapopen: 0,
    qstart: 405,
    qend: 379,
    sstart: 432,
    send: 363,
    evalue: 2.45e-220,
    bitscore: 405,
    Sequence: ""
  },
  {
    id: 32,
    seqid: "SRR779876",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.96,
    qlen: 500,
    lenght: 187,
    mismatch: 36,
    gapopen: 0,
    qstart: 406,
    qend: 380,
    sstart: 433,
    send: 364,
    evalue: 2.45e-219,
    bitscore: 406,
    Sequence: ""
  },
  {
    id: 33,
    seqid: "SRR779877",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.97,
    qlen: 500,
    lenght: 188,
    mismatch: 37,
    gapopen: 0,
    qstart: 407,
    qend: 381,
    sstart: 434,
    send: 365,
    evalue: 2.45e-218,
    bitscore: 407,
    Sequence: ""
  },
  {
    id: 34,
    seqid: "SRR779878",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.98,
    qlen: 500,
    lenght: 189,
    mismatch: 38,
    gapopen: 0,
    qstart: 408,
    qend: 382,
    sstart: 435,
    send: 366,
    evalue: 2.45e-217,
    bitscore: 408,
    Sequence: ""
  },
  {
    id: 35,
    seqid: "SRR779879",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 86.99,
    qlen: 500,
    lenght: 190,
    mismatch: 39,
    gapopen: 0,
    qstart: 409,
    qend: 383,
    sstart: 436,
    send: 367,
    evalue: 2.45e-216,
    bitscore: 409,
    Sequence: ""
  },
  {
    id: 36,
    seqid: "SRR779880",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87,
    qlen: 500,
    lenght: 191,
    mismatch: 40,
    gapopen: 0,
    qstart: 410,
    qend: 384,
    sstart: 437,
    send: 368,
    evalue: 2.45e-215,
    bitscore: 410,
    Sequence: ""
  },
  {
    id: 37,
    seqid: "SRR779881",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.01,
    qlen: 500,
    lenght: 192,
    mismatch: 41,
    gapopen: 1,
    qstart: 411,
    qend: 385,
    sstart: 438,
    send: 369,
    evalue: 2.45e-214,
    bitscore: 411,
    Sequence: ""
  },
  {
    id: 38,
    seqid: "SRR779882",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.02,
    qlen: 500,
    lenght: 193,
    mismatch: 42,
    gapopen: 0,
    qstart: 412,
    qend: 386,
    sstart: 439,
    send: 370,
    evalue: 2.45e-213,
    bitscore: 412,
    Sequence: ""
  },
  {
    id: 39,
    seqid: "SRR779883",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.03,
    qlen: 500,
    lenght: 194,
    mismatch: 43,
    gapopen: 0,
    qstart: 413,
    qend: 387,
    sstart: 440,
    send: 371,
    evalue: 2.45e-212,
    bitscore: 413,
    Sequence: ""
  },
  {
    id: 40,
    seqid: "SRR779884",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.04,
    qlen: 500,
    lenght: 195,
    mismatch: 44,
    gapopen: 0,
    qstart: 414,
    qend: 388,
    sstart: 441,
    send: 372,
    evalue: 2.45e-211,
    bitscore: 414,
    Sequence: ""
  },
  {
    id: 41,
    seqid: "SRR779885",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.05,
    qlen: 500,
    lenght: 196,
    mismatch: 45,
    gapopen: 1,
    qstart: 415,
    qend: 389,
    sstart: 442,
    send: 373,
    evalue: 2.45e-210,
    bitscore: 415,
    Sequence: ""
  },
  {
    id: 42,
    seqid: "SRR779886",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.06,
    qlen: 500,
    lenght: 197,
    mismatch: 46,
    gapopen: 0,
    qstart: 416,
    qend: 390,
    sstart: 443,
    send: 374,
    evalue: 2.45e-209,
    bitscore: 416,
    Sequence: ""
  },
  {
    id: 43,
    seqid: "SRR779887",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.07,
    qlen: 500,
    lenght: 198,
    mismatch: 47,
    gapopen: 0,
    qstart: 417,
    qend: 391,
    sstart: 444,
    send: 375,
    evalue: 2.45e-208,
    bitscore: 417,
    Sequence: ""
  },
  {
    id: 44,
    seqid: "SRR779888",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.08,
    qlen: 500,
    lenght: 199,
    mismatch: 48,
    gapopen: 0,
    qstart: 418,
    qend: 392,
    sstart: 445,
    send: 376,
    evalue: 2.45e-207,
    bitscore: 418,
    Sequence: ""
  },
  {
    id: 45,
    seqid: "SRR779889",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.09,
    qlen: 500,
    lenght: 200,
    mismatch: 49,
    gapopen: 0,
    qstart: 419,
    qend: 393,
    sstart: 446,
    send: 377,
    evalue: 2.45e-206,
    bitscore: 419,
    Sequence: ""
  },
  {
    id: 46,
    seqid: "SRR779890",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.1,
    qlen: 500,
    lenght: 201,
    mismatch: 50,
    gapopen: 0,
    qstart: 420,
    qend: 394,
    sstart: 447,
    send: 378,
    evalue: 2.45e-205,
    bitscore: 420,
    Sequence: ""
  },
  {
    id: 47,
    seqid: "SRR779891",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.11,
    qlen: 500,
    lenght: 202,
    mismatch: 51,
    gapopen: 1,
    qstart: 421,
    qend: 395,
    sstart: 448,
    send: 379,
    evalue: 2.45e-204,
    bitscore: 421,
    Sequence: ""
  },
  {
    id: 48,
    seqid: "SRR779892",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.12,
    qlen: 500,
    lenght: 203,
    mismatch: 52,
    gapopen: 0,
    qstart: 422,
    qend: 396,
    sstart: 449,
    send: 380,
    evalue: 2.45e-203,
    bitscore: 422,
    Sequence: ""
  },
  {
    id: 49,
    seqid: "SRR779893",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.13,
    qlen: 500,
    lenght: 204,
    mismatch: 53,
    gapopen: 0,
    qstart: 423,
    qend: 397,
    sstart: 450,
    send: 381,
    evalue: 2.45e-202,
    bitscore: 423,
    Sequence: ""
  },
  {
    id: 50,
    seqid: "SRR779894",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.14,
    qlen: 500,
    lenght: 205,
    mismatch: 54,
    gapopen: 0,
    qstart: 424,
    qend: 398,
    sstart: 451,
    send: 382,
    evalue: 2.45e-201,
    bitscore: 424,
    Sequence: ""
  },
  {
    id: 51,
    seqid: "SRR779895",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.15,
    qlen: 500,
    lenght: 206,
    mismatch: 55,
    gapopen: 1,
    qstart: 425,
    qend: 399,
    sstart: 452,
    send: 383,
    evalue: 2.45e-200,
    bitscore: 425,
    Sequence: ""
  },
  {
    id: 52,
    seqid: "SRR779896",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.16,
    qlen: 500,
    lenght: 207,
    mismatch: 56,
    gapopen: 0,
    qstart: 426,
    qend: 400,
    sstart: 453,
    send: 384,
    evalue: 2.45e-199,
    bitscore: 426,
    Sequence: ""
  },
  {
    id: 53,
    seqid: "SRR779897",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.17,
    qlen: 500,
    lenght: 208,
    mismatch: 57,
    gapopen: 0,
    qstart: 427,
    qend: 401,
    sstart: 454,
    send: 385,
    evalue: 2.45e-198,
    bitscore: 427,
    Sequence: ""
  },
  {
    id: 54,
    seqid: "SRR779898",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.18,
    qlen: 500,
    lenght: 209,
    mismatch: 58,
    gapopen: 0,
    qstart: 428,
    qend: 402,
    sstart: 455,
    send: 386,
    evalue: 2.45e-197,
    bitscore: 428,
    Sequence: ""
  },
  {
    id: 55,
    seqid: "SRR779899",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.19,
    qlen: 500,
    lenght: 210,
    mismatch: 59,
    gapopen: 0,
    qstart: 429,
    qend: 403,
    sstart: 456,
    send: 387,
    evalue: 2.45e-196,
    bitscore: 429,
    Sequence: ""
  },
  {
    id: 56,
    seqid: "SRR779900",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.2,
    qlen: 500,
    lenght: 211,
    mismatch: 60,
    gapopen: 1,
    qstart: 430,
    qend: 404,
    sstart: 457,
    send: 388,
    evalue: 2.45e-195,
    bitscore: 430,
    Sequence: ""
  },
  {
    id: 57,
    seqid: "SRR779901",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.21,
    qlen: 500,
    lenght: 212,
    mismatch: 61,
    gapopen: 0,
    qstart: 431,
    qend: 405,
    sstart: 458,
    send: 389,
    evalue: 2.45e-194,
    bitscore: 431,
    Sequence: ""
  },
  {
    id: 58,
    seqid: "SRR779902",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.22,
    qlen: 500,
    lenght: 213,
    mismatch: 62,
    gapopen: 0,
    qstart: 432,
    qend: 406,
    sstart: 459,
    send: 390,
    evalue: 2.45e-193,
    bitscore: 432,
    Sequence: ""
  },
  {
    id: 59,
    seqid: "SRR779903",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.23,
    qlen: 500,
    lenght: 214,
    mismatch: 63,
    gapopen: 0,
    qstart: 433,
    qend: 407,
    sstart: 460,
    send: 391,
    evalue: 2.45e-192,
    bitscore: 433,
    Sequence: ""
  },
  {
    id: 60,
    seqid: "SRR779904",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.24,
    qlen: 500,
    lenght: 215,
    mismatch: 64,
    gapopen: 0,
    qstart: 434,
    qend: 408,
    sstart: 461,
    send: 392,
    evalue: 2.45e-191,
    bitscore: 434,
    Sequence: ""
  },
  {
    id: 61,
    seqid: "SRR779905",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.25,
    qlen: 500,
    lenght: 216,
    mismatch: 65,
    gapopen: 0,
    qstart: 435,
    qend: 409,
    sstart: 462,
    send: 393,
    evalue: 2.45e-190,
    bitscore: 435,
    Sequence: ""
  },
  {
    id: 62,
    seqid: "SRR779906",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.26,
    qlen: 500,
    lenght: 217,
    mismatch: 66,
    gapopen: 0,
    qstart: 436,
    qend: 410,
    sstart: 463,
    send: 394,
    evalue: 2.45e-189,
    bitscore: 436,
    Sequence: ""
  },
  {
    id: 63,
    seqid: "SRR779907",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.27,
    qlen: 500,
    lenght: 218,
    mismatch: 67,
    gapopen: 1,
    qstart: 437,
    qend: 411,
    sstart: 464,
    send: 395,
    evalue: 2.45e-188,
    bitscore: 437,
    Sequence: ""
  },
  {
    id: 64,
    seqid: "SRR779908",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.28,
    qlen: 500,
    lenght: 219,
    mismatch: 68,
    gapopen: 0,
    qstart: 438,
    qend: 412,
    sstart: 465,
    send: 396,
    evalue: 2.45e-187,
    bitscore: 438,
    Sequence: ""
  },
  {
    id: 65,
    seqid: "SRR779909",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.29,
    qlen: 500,
    lenght: 220,
    mismatch: 69,
    gapopen: 0,
    qstart: 439,
    qend: 413,
    sstart: 466,
    send: 397,
    evalue: 2.45e-186,
    bitscore: 439,
    Sequence: ""
  },
  {
    id: 66,
    seqid: "SRR779910",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.3,
    qlen: 500,
    lenght: 221,
    mismatch: 70,
    gapopen: 0,
    qstart: 440,
    qend: 414,
    sstart: 467,
    send: 398,
    evalue: 2.45e-185,
    bitscore: 440,
    Sequence: ""
  },
  {
    id: 67,
    seqid: "SRR779911",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.31,
    qlen: 500,
    lenght: 222,
    mismatch: 71,
    gapopen: 0,
    qstart: 441,
    qend: 415,
    sstart: 468,
    send: 399,
    evalue: 2.45e-184,
    bitscore: 441,
    Sequence: ""
  },
  {
    id: 68,
    seqid: "SRR779912",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.32,
    qlen: 500,
    lenght: 223,
    mismatch: 72,
    gapopen: 1,
    qstart: 442,
    qend: 416,
    sstart: 469,
    send: 400,
    evalue: 2.45e-183,
    bitscore: 442,
    Sequence: ""
  },
  {
    id: 69,
    seqid: "SRR779913",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.33,
    qlen: 500,
    lenght: 224,
    mismatch: 73,
    gapopen: 0,
    qstart: 443,
    qend: 417,
    sstart: 470,
    send: 401,
    evalue: 2.45e-182,
    bitscore: 443,
    Sequence: ""
  },
  {
    id: 70,
    seqid: "SRR779914",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.34,
    qlen: 500,
    lenght: 225,
    mismatch: 74,
    gapopen: 0,
    qstart: 444,
    qend: 418,
    sstart: 471,
    send: 402,
    evalue: 2.45e-181,
    bitscore: 444,
    Sequence: ""
  },
  {
    id: 71,
    seqid: "SRR779915",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.35,
    qlen: 500,
    lenght: 226,
    mismatch: 75,
    gapopen: 0,
    qstart: 445,
    qend: 419,
    sstart: 472,
    send: 403,
    evalue: 2.45e-180,
    bitscore: 445,
    Sequence: ""
  },
  {
    id: 72,
    seqid: "SRR779916",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.36,
    qlen: 500,
    lenght: 227,
    mismatch: 76,
    gapopen: 0,
    qstart: 446,
    qend: 420,
    sstart: 473,
    send: 404,
    evalue: 2.45e-179,
    bitscore: 446,
    Sequence: ""
  },
  {
    id: 73,
    seqid: "SRR779917",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.37,
    qlen: 500,
    lenght: 228,
    mismatch: 77,
    gapopen: 1,
    qstart: 447,
    qend: 421,
    sstart: 474,
    send: 405,
    evalue: 2.45e-178,
    bitscore: 447,
    Sequence: ""
  },
  {
    id: 74,
    seqid: "SRR779918",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.38,
    qlen: 500,
    lenght: 229,
    mismatch: 78,
    gapopen: 0,
    qstart: 448,
    qend: 422,
    sstart: 475,
    send: 406,
    evalue: 2.45e-177,
    bitscore: 448,
    Sequence: ""
  },
  {
    id: 75,
    seqid: "SRR779919",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.39,
    qlen: 500,
    lenght: 230,
    mismatch: 79,
    gapopen: 0,
    qstart: 449,
    qend: 423,
    sstart: 476,
    send: 407,
    evalue: 2.45e-176,
    bitscore: 449,
    Sequence: ""
  },
  {
    id: 76,
    seqid: "SRR779920",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.4,
    qlen: 500,
    lenght: 231,
    mismatch: 80,
    gapopen: 0,
    qstart: 450,
    qend: 424,
    sstart: 477,
    send: 408,
    evalue: 2.45e-175,
    bitscore: 450,
    Sequence: ""
  },
  {
    id: 77,
    seqid: "SRR779921",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.41,
    qlen: 500,
    lenght: 232,
    mismatch: 81,
    gapopen: 0,
    qstart: 451,
    qend: 425,
    sstart: 478,
    send: 409,
    evalue: 2.45e-174,
    bitscore: 451,
    Sequence: ""
  },
  {
    id: 78,
    seqid: "SRR779922",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.42,
    qlen: 500,
    lenght: 233,
    mismatch: 82,
    gapopen: 1,
    qstart: 452,
    qend: 426,
    sstart: 479,
    send: 410,
    evalue: 2.45e-173,
    bitscore: 452,
    Sequence: ""
  },
  {
    id: 79,
    seqid: "SRR779923",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.43,
    qlen: 500,
    lenght: 234,
    mismatch: 83,
    gapopen: 0,
    qstart: 453,
    qend: 427,
    sstart: 480,
    send: 411,
    evalue: 2.45e-172,
    bitscore: 453,
    Sequence: ""
  },
  {
    id: 80,
    seqid: "SRR779924",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.44,
    qlen: 500,
    lenght: 235,
    mismatch: 84,
    gapopen: 0,
    qstart: 454,
    qend: 428,
    sstart: 481,
    send: 412,
    evalue: 2.45e-171,
    bitscore: 454,
    Sequence: ""
  },
  {
    id: 81,
    seqid: "SRR779925",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.45,
    qlen: 500,
    lenght: 236,
    mismatch: 85,
    gapopen: 0,
    qstart: 455,
    qend: 429,
    sstart: 482,
    send: 413,
    evalue: 2.45e-170,
    bitscore: 455,
    Sequence: ""
  },
  {
    id: 82,
    seqid: "SRR779926",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.46,
    qlen: 500,
    lenght: 237,
    mismatch: 86,
    gapopen: 0,
    qstart: 456,
    qend: 430,
    sstart: 483,
    send: 414,
    evalue: 2.45e-169,
    bitscore: 456,
    Sequence: ""
  },
  {
    id: 83,
    seqid: "SRR779927",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.47,
    qlen: 500,
    lenght: 238,
    mismatch: 87,
    gapopen: 1,
    qstart: 457,
    qend: 431,
    sstart: 484,
    send: 415,
    evalue: 2.45e-168,
    bitscore: 457,
    Sequence: ""
  },
  {
    id: 84,
    seqid: "SRR779928",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.48,
    qlen: 500,
    lenght: 239,
    mismatch: 88,
    gapopen: 0,
    qstart: 458,
    qend: 432,
    sstart: 485,
    send: 416,
    evalue: 2.45e-167,
    bitscore: 458,
    Sequence: ""
  },
  {
    id: 85,
    seqid: "SRR779929",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.49,
    qlen: 500,
    lenght: 240,
    mismatch: 89,
    gapopen: 0,
    qstart: 459,
    qend: 433,
    sstart: 486,
    send: 417,
    evalue: 2.45e-166,
    bitscore: 459,
    Sequence: ""
  },
  {
    id: 86,
    seqid: "SRR779930",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.5,
    qlen: 500,
    lenght: 241,
    mismatch: 90,
    gapopen: 0,
    qstart: 460,
    qend: 434,
    sstart: 487,
    send: 418,
    evalue: 2.45e-165,
    bitscore: 460,
    Sequence: ""
  },
  {
    id: 87,
    seqid: "SRR779931",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.51,
    qlen: 500,
    lenght: 242,
    mismatch: 91,
    gapopen: 0,
    qstart: 461,
    qend: 435,
    sstart: 488,
    send: 419,
    evalue: 2.45e-164,
    bitscore: 461,
    Sequence: ""
  },
  {
    id: 88,
    seqid: "SRR779932",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.52,
    qlen: 500,
    lenght: 243,
    mismatch: 92,
    gapopen: 0,
    qstart: 462,
    qend: 436,
    sstart: 489,
    send: 420,
    evalue: 2.45e-163,
    bitscore: 462,
    Sequence: ""
  },
  {
    id: 89,
    seqid: "SRR779933",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.53,
    qlen: 500,
    lenght: 244,
    mismatch: 93,
    gapopen: 0,
    qstart: 463,
    qend: 437,
    sstart: 490,
    send: 421,
    evalue: 2.45e-162,
    bitscore: 463,
    Sequence: ""
  },
  {
    id: 90,
    seqid: "SRR779934",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.54,
    qlen: 500,
    lenght: 245,
    mismatch: 94,
    gapopen: 0,
    qstart: 464,
    qend: 438,
    sstart: 491,
    send: 422,
    evalue: 2.45e-161,
    bitscore: 464,
    Sequence: ""
  },
  {
    id: 91,
    seqid: "SRR779935",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.55,
    qlen: 500,
    lenght: 246,
    mismatch: 95,
    gapopen: 0,
    qstart: 465,
    qend: 439,
    sstart: 492,
    send: 423,
    evalue: 2.45e-160,
    bitscore: 465,
    Sequence: ""
  },
  {
    id: 92,
    seqid: "SRR779936",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.56,
    qlen: 500,
    lenght: 247,
    mismatch: 96,
    gapopen: 0,
    qstart: 466,
    qend: 440,
    sstart: 493,
    send: 424,
    evalue: 2.45e-159,
    bitscore: 466,
    Sequence: ""
  },
  {
    id: 93,
    seqid: "SRR779937",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.57,
    qlen: 500,
    lenght: 248,
    mismatch: 97,
    gapopen: 0,
    qstart: 467,
    qend: 441,
    sstart: 494,
    send: 425,
    evalue: 2.45e-158,
    bitscore: 467,
    Sequence: ""
  },
  {
    id: 94,
    seqid: "SRR779938",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.58,
    qlen: 500,
    lenght: 249,
    mismatch: 98,
    gapopen: 0,
    qstart: 468,
    qend: 442,
    sstart: 495,
    send: 426,
    evalue: 2.45e-157,
    bitscore: 468,
    Sequence: ""
  },
  {
    id: 95,
    seqid: "SRR779939",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.59,
    qlen: 500,
    lenght: 250,
    mismatch: 99,
    gapopen: 0,
    qstart: 469,
    qend: 443,
    sstart: 496,
    send: 427,
    evalue: 2.45e-156,
    bitscore: 469,
    Sequence: ""
  },
  {
    id: 96,
    seqid: "SRR779940",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.6,
    qlen: 500,
    lenght: 251,
    mismatch: 100,
    gapopen: 0,
    qstart: 470,
    qend: 444,
    sstart: 497,
    send: 428,
    evalue: 2.45e-155,
    bitscore: 470,
    Sequence: ""
  },
  {
    id: 97,
    seqid: "SRR779941",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.61,
    qlen: 500,
    lenght: 252,
    mismatch: 101,
    gapopen: 0,
    qstart: 471,
    qend: 445,
    sstart: 498,
    send: 429,
    evalue: 2.45e-154,
    bitscore: 471,
    Sequence: ""
  },
  {
    id: 98,
    seqid: "SRR779942",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.62,
    qlen: 500,
    lenght: 253,
    mismatch: 102,
    gapopen: 0,
    qstart: 472,
    qend: 446,
    sstart: 499,
    send: 430,
    evalue: 2.45e-153,
    bitscore: 472,
    Sequence: ""
  },
  {
    id: 99,
    seqid: "SRR779943",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.63,
    qlen: 500,
    lenght: 254,
    mismatch: 103,
    gapopen: 0,
    qstart: 473,
    qend: 447,
    sstart: 500,
    send: 431,
    evalue: 2.45e-152,
    bitscore: 473,
    Sequence: ""
  },
  {
    id: 100,
    seqid: "SRR779944",
    sseqid: "gi[564464564]gb[DA5464645645]",
    pident: 87.64,
    qlen: 500,
    lenght: 255,
    mismatch: 104,
    gapopen: 0,
    qstart: 474,
    qend: 448,
    sstart: 501,
    send: 432,
    evalue: 2.45e-151,
    bitscore: 474,
    Sequence: ""
  }
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

  // const [Read_AGB, setRead_AGB] = useState([])
  // useEffect(() => {
  //   fetch("https://api.jsonbin.io/v3/b/61f1ce301960493ad1831957")
  //     .then((data) => data.json())
  //     .then((data) => setRead_AGB(data))

  // }, []);



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
      width: "110",
      headerClassName: "data-grid-header",
    },
    {

      field: "seqid",
      headerName: "seqid",
      headerAlign: "right",
      width: "110",
      // height: 'max-content',
      // error: true,
      editable: true,

    },
    {
      field: "sseqid",
      headerName: "sseqid",
      type: "string",
      headerAlign: "center",
      width: "110",
      editable: true,
      headerClassName: "data-grid-header",
    },
    {
      field: "pident",
      headerName: "pident",
      type: "string",
      // headerAlign: "center",
      width: "110",
      editable: true,
      headerClassName: "data-grid-header",

    },
    {
      field: "qlen",
      headerName: "qlen",
      headerAlign: "left",
      type: "string",
      width: "110",
      headerClassName: "data-grid-header",
      align: "left",

    },
    {
      field: "lenght",
      headerName: "lenght",
      headerAlign: "center",
      align: "left",
      width: "110",
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
      width: "110",
      headerClassName: "data-grid-header",
      align: "left",
    },
    {
      field: "gapopen",
      headerName: "gapopen",
      width: "110",
      editable: true,
      align: "left",
      type: "string",

    },
    {
      field: "qstart",
      headerName: "qstart",
      width: "110",
      editable: true,
      type: "string",
      align: "left",
    },
    {
      field: "qend",
      headerName: "qend",
      headeralign: "center",
      align: "left",
      width: "110",
      type: "string",
      editable: true,
    },
    {
      field: "sstart",
      headerName: "sstart",
      type: 'string',
      align: "left",
      width: "110",
      editable: true,



    },
    {
      field: "send",
      headerName: "send",
      width: "110",
      editable: true,
      type: "string",
    },
    {
      field: "evalue",
      headerName: "evalue",
      width: "110",
      editable: true,
      type: "string",
    },
    {
      field: "bitscore",
      headerName: "bitscore",
      width: "110",
      editable: true,
      type: "string",
    },

    {
      field: "Sequence",
      headerName: "Sequence",
      width: "110",
      editable: true,
      type: "string",
    },
    {
      field: "action",
      type: "string",
      width: "110",
      color: "red",
      headerName: "PREVIEW ",
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
        rowsPerPageOptions={[5, 10, 20, 40, 100]}
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