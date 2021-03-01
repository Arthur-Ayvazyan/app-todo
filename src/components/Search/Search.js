import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import ModalSearch from '../ModalSearch/ModalSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

function Search(props) {

   const [visibleFilters, setVisibilityFilters] = useState(false);

   const [search, setSearch] = useState('');

   const [data, setData] = useState({
      search,
      status: null,
      sort: null,
      dates: null
   });
   
   useEffect(() => {
      setData({
         ...data,
         search
      })
   }, [search]);

   const handleFilterModal = () => {
      setVisibilityFilters(!visibleFilters)
   };

   const handleSubmit = () => {
      console.log(data)
      setData({
         search,
         status: null,
         sort: null,
         dates: null
      })

   };

   const getData = (dataFromModal) => {
      setData({
         ...data,
         ...dataFromModal,
      })
   };

  return (
    <div className="mb-3">
      <InputGroup >
        <FormControl
          placeholder="Search. . ."
          onChange={(event) => setSearch(event.target.value)}
        />
           <InputGroup.Append>
              <Button
                 variant="outline-primary"
                 onClick={handleFilterModal}
              >
                 <FontAwesomeIcon icon={faSlidersH} />
              </Button>
              <Button
                 variant="outline-primary"
            onClick={handleSubmit}
          >
            Search
          </Button>

        </InputGroup.Append>
      </InputGroup>
        {
           visibleFilters &&
           <ModalSearch
              onClose={handleFilterModal}
              getData={getData}

           />
        }
    </div >
  )
}

export default connect()(Search);