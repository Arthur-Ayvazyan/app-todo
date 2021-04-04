import styles from './search.module.scss';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { getTasks } from '../../store/actions';
import ModalSearch from '../Modals/ModalSearch/ModalSearch';


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
        params[key] = value.toLocaleDateString();
      }
    }

    getTasks(params);

  };

  const getFilteredData = (filteredData) => {

    let countOfFilters = 0;

    const { status, sort, dates } = filteredData;

    sort.value && countOfFilters++;
    status.value && countOfFilters++;

    for (const key in dates) {
      const value = dates[key];
      if (value) {
        countOfFilters++;
      }
    }

    setFilterCount(countOfFilters);

    setData({
      ...data,
      ...filteredData,
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
          sendData={getFilteredData}
          filters={data}
        />
      }
    </div >
  )
}

const mapDispatchToProps = {
  getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
