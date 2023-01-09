import React from "react";
import Spinner from "react-bootstrap/Spinner";


const Loading = () => {
    return(
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner animation="border" variant="warning" role="status">
            <span className="sr-only">صبر کنید ...</span>
          </Spinner>
        </div>
    )

};
export default Loading;
