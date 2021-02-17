import React from 'react';
import { connect } from 'react-redux';

function Increment(props) {

   return (

      <div>
         <button onClick={props.onChange}>Increment</button>
      </div>

   )

}

const mapDispatchToProps = (dispatch) => {

   return {

      onChange: () => {
         dispatch({ type: 'INCREMENT_COUNT' });
      }

   }

}

export default connect(null, mapDispatchToProps)(Increment);