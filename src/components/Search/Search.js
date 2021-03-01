import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { textCutter } from '../../helpers/utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { statusOptions, sortOptions, dateOptions } from './options';

function Search(props) {

  const [status, setStatus] = useState({
    value: ''
  });

  const [sort, setSort] = useState({
    value: ''
  });

  const [search, setSearch] = useState('');

  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });

  const handleChangeDate = (value, name) => {
    setDates({
      ...dates,
      [name]: value
    })
  };

  const handleSubmit = () => {
    console.log('status', status);
    console.log('sort', sort);
    console.log('searchs', search);
    console.log('dates', dates);
  }

  return (
    <div className="mb-3">
      <InputGroup >
        <FormControl
          placeholder="Search. . ."
          onChange={(event) => setSearch(event.target.value)}
        />

        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-primary"
          title={status.value ? status.label : 'Status'}
          id="input-group-dropdown-1"
        >
          {
            statusOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                active={status.value === option.value}
                onClick={() => setStatus(option)}
              >{option.label}
              </Dropdown.Item>)
            )
          }
        </DropdownButton>

        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-primary"
          title={sort.value ? textCutter(sort.label, 6) : 'Status'}
          id="input-group-dropdown-1"
        >
          {
            sortOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                active={sort.value === option.value}
                onClick={() => setSort(option)}
              >{option.label}
              </Dropdown.Item>)
            )
          }
        </DropdownButton>

        <InputGroup.Append>
          <Button
            variant="outline-primary"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {
        dateOptions.map((option, index) => {
          return (
            <div key={index}>
              <span>{option.label} </span>
              <DatePicker
                selected={dates[option.value]}
                onChange={(value) => handleChangeDate(value, option.value)}
              />
            </div>
          )
        })
      }
    </div >
  )
}

export default connect()(Search);