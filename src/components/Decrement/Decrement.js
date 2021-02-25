import React from 'react';
import { connect } from 'react-redux';

function Decrement(props) {

   return (

      <div>
         <button onClick={props.onChange}> Decrement</button>
      </div>

   )
}

const mapDispatchToProps = (dispatch) => {

   return {

      onChange: () => {
         dispatch({ type: 'DECREMENT_COUNT' });
      }

   }
}

export default connect(null, mapDispatchToProps)(Decrement);