import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import ModalSearch from '../ModalSearch/ModalSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../helpers/utils';
import { getTasks } from '../../store/actions';
 
function Search({ getTasks }) {

   const [visibleFilters, setVisibilityFilters] = useState(false);

   const [search, setSearch] = useState('');

   const [data, setData] = useState({
      search,
      status: {},
      sort: {},
      dates: {}
   });

   const handleFilterModal = () => {
      setVisibilityFilters(!visibleFilters)
   };

   const handleSubmit = () => {

      const { status, sort, dates } = data;
      let params = {};

      search && (params.search = search);
      sort.value && (params.sort = sort.value);
      status.value && (params.status = status.value);

      for (const key in dates) {
         const value = dates[key];
         if (value) {
            params[key] = formatDate(value.toISOString());
         }
      }

      getTasks(params);

      //setData({
      //   search,
      //   status: {},
      //   sort: {},
      //   dates: {}
      //})

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

const mapDispatchToProps = {
   getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
