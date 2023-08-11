import React from 'react';
import loadingImage from '../../assets/giphy.gif';
const Loading = () => {
  return (
    <div>
      <img style={{width:200,height:200}}
        src={loadingImage}
        alt="Loading animation"
      />

    </div>
  );
};




export default Loading;