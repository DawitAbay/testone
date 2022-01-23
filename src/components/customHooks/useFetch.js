import { useState, useEffect, useRef } from "react";
// import { set_final_text_resp, set_current_url, set_api_method } from '../reducer/actions';
import {
  final_text_resp,
  api_method,
  current_url,
  current_url2,
  post_data,
} from "../reducer/types";
import axios from "axios";

// const useFetch = (
//   url_to_db,
//   method,
//   formData,
// dispatch
// ) => {
const useFetch = ({
  baseURLtoDB,
  currentURLtoDB,
  baseURLtoDBTableData,
  currentURLtoDBTableData,
  apiMethod,
  postData,
  dispatch,
}) => {
 
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err_msg, set_err_msg] = useState("");
  const [isError, setIsError] = useState(false);


  const options = {
    method: apiMethod,
    url: currentURLtoDB,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(postData),
  };

  useEffect(() => {
    let isMounted = true;
    const abortContr = new AbortController();
 
    if (isMounted) {
      set_err_msg("");
      setIsLoading(true);

   
      setTimeout(() => {
        axios(options, { signal: abortContr.signal })
          
          .then(
            (res) => {
              
              console.log("AXIOS done");
              if (isMounted) {
                if (res.status < 200 || res.status > 299) {
                  throw new Error("Could not fetch data from that resource!");
                }
           
                setData(res.data);
                setIsError(false);
                set_err_msg("");
                setIsLoading(false);

                if (apiMethod === "GET") {
                  dispatch({
                    type: final_text_resp,
                    payload: "The DATA have been Fetched",
                  });
                } else if (apiMethod === "DELETE") {
                  dispatch({ type: api_method, payload: "GET" });
                  dispatch({ type: current_url, payload: baseURLtoDB });
                  dispatch({ type: current_url2, payload: baseURLtoDBTableData });
                  
                } else if (apiMethod === "POST" || apiMethod === "PUT") {
                  dispatch({
                    type: final_text_resp,
                    payload: "The record has been updated",
                  });
                  setTimeout(() => {
                    dispatch({ type: api_method, payload: "GET" });
                    dispatch({ type: current_url, payload: baseURLtoDB });
                    dispatch({ type: current_url2, payload: baseURLtoDBTableData });
                  }, 1000);
                 
                }
               
              }
            },
            (error) => {
              console.log(error);
              console.log(error.message);
              throw new Error(
                "Could not fetch data from the url! " + error.message
              );
            }
          )
          .catch((err) => {
            console.log(err);
            console.log(err.name);
            console.log(err.message);
            if (err.name === "AbortError") {
              console.log("fetch aborted");
            } else {
              if (isMounted) {
                setIsLoading(false);
                setIsError(true);
                set_err_msg(err.message);
              }
            }
          });
      }, 700);
    }

  
    return () => {
     
      isMounted = false;
      abortContr.abort();
    };
  
  }, [currentURLtoDB,currentURLtoDBTableData]);

  return { data, err_msg, isLoading, isError };
 
};

export default useFetch;
