import React, { useMemo, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import DataTable from "./pages/DataTable";

import {
  red

} from "@mui/material/colors";
import CircularProgress from '@mui/material/CircularProgress';
import About_Read_APTable from "./pages/About_Read_AP";
import Read_AGB from "./pages/Read_AGB";

import ErrorBoundary from "./components/ErrorBoundary";
import useFetch from "./components/customHooks/useFetch";
import reducer from "./components/reducer/reducer";
import initState  from "./components/reducer/initState";
// import { set_final_text_resp } from "./components/reducer/actions";

import TableData from "./pages/TableData";




function App() {

  

  const [state, dispatch] = useReducer(reducer, initState);
  const { finalTextResponse, postData, apiMethod, currentURLtoDB, baseURLtoDB , baseURLtoDBTableData,currentURLtoDBTableData} = state;

 
  const useFetchOptions = {baseURLtoDB, baseURLtoDBTableData, currentURLtoDB,currentURLtoDBTableData, apiMethod, postData, dispatch};

  const { data, isLoading, } = useFetch(useFetchOptions);
  
  const rows = useMemo(() => {
    if(data.length > 0) return data;
    else return [];
  }, [data]);



  useEffect(() => {
    console.log("finalTextResponse:");
    console.log(finalTextResponse);
  // });
  }, [finalTextResponse]);

  
const dataTableProps = { dispatch, finalTextResponse, baseURLtoDBTableData };
const TableDataProps2 = { dispatch, finalTextResponse,  baseURLtoDBTableData};



  return (
    <div className="App" >
      
        
      
      <ErrorBoundary>
      <Router>
        <Layout>
        
      
        
          <Routes>
           
            <Route
              exact
              path="/"
              element={
                isLoading ? <CircularProgress /> :
                  
                <DataTable
                  rows={rows}
                  dataTableProps={dataTableProps}
                  color = { red}
                
                />
                
                
                
              }
            />
              
           

            
            <Route exact path="/data" element={isLoading ? <CircularProgress /> :
                  
                  <TableData
                    rows={rows}
                    dataTableProps={TableDataProps2}
                  
                  />}></Route>

            <Route  path="/About_Read_AP" element={ <About_Read_APTable/>}></Route>
            <Route  path="/Read_AGB" element={ <Read_AGB/>}></Route>
          </Routes>
          

        </Layout>
      </Router>
      </ErrorBoundary>

          
    </div>
  );
}

export default App;

  