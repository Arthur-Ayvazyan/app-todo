import React from 'react';
import { connect } from 'react-redux';

function ShowCounter(props) {

   return (
      <h2>
         Conunt: {props.value}
      </h2>
   )
}

const mapSateToProps = (state) => {
   return {
      value: state.count
   };
}

export default connect(mapSateToProps, null)(ShowCounter);