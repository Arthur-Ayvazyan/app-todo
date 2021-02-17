import React from 'react';

import Increment from "../Increment/Increment";
import Decrement from "../Decrement/Decrement";

function SetCounter(props) {

   return (

      <div>
         <Increment />
         <Decrement />
      </div>

   )
}

export default SetCounter;