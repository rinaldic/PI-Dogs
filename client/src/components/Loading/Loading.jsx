import React from 'react';
import sty from "./Loading";

const Loading = () => {
    return (
        <div className= {sty.loading}>
           <img src="https://barfdeshidratado.com/wp-content/uploads/2022/02/piq-loading.gif" alt="loading" />
        </div>
    );
};

export default Loading;