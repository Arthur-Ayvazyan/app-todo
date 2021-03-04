import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import ModalSearch from '../ModalSearch/ModalSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../helpers/utils';
import { getTasks } from '../../store/actions';
import styles from './search.module.scss';


function Search({ getTasks }) {

   const [visibleFilters, setVisibilityFilters] = useState(false);

   const [search, setSearch] = useState('');

   const [data, setData] = useState({
      search,
      status: {
         value: ''
      },
      sort: {
         value: ''
      },
      dates: {
         create_lte: null,
         create_gte: null,
         complete_lte: null,
         complete_gte: null,
      }
   });

   const [filterCount, setFilterCount] = useState(0);

   const handleFilterModal = () => {
      setVisibilityFilters(!visibleFilters)
   };

   const handleSubmit = () => {

      let params = {};

      const { status, sort, dates } = data;

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

   };

   const getData = (dataFromModal) => {

      let num = 0;

      const { status, sort, dates } = dataFromModal;

      sort.value && num++;
      status.value && num++;

      for (const key in dates) {
         const value = dates[key];
         if (value) {
            num++;
         }
      }

      setFilterCount(num);
      
      setData({
         ...data,
         ...dataFromModal,
      });
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
                 className={styles.filterButton}
                 variant="outline-primary"
                 onClick={handleFilterModal}
              >
                 {
                    filterCount ?
                       <span className={styles.filterCount}>
                          {filterCount}
                       </span>
                       : ''
                 }
                 <FontAwesomeIcon icon={faSlidersH} />
              </Button>
              <Button
                 className={styles.searchButton}
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
              setData={data}

           />
        }
    </div >
  )
}

const mapDispatchToProps = {
   getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
