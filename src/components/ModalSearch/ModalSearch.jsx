import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button, Modal, InputGroup, DropdownButton, Dropdown, Form, Col } from 'react-bootstrap';
import { statusOptions, sortOptions, dateOptions } from '../Search/options';

function ModalSearch(props) {

   const [status, setStatus] = useState(props.filters.status);

   const [sort, setSort] = useState(props.filters.sort);

   const [dates, setDates] = useState(props.filters.dates);

   const handleChangeDate = (value, name) => {
      setDates({
         ...dates,
         [name]: value
      })
   };

   const handleSendData = () => {
      const filteredData = {
         status,
         sort,
         dates,
      }
      props.sendData(filteredData);
      props.onClose();
   }

   const handleResetFilters = () => {

      setStatus({
         value: ''
      });

      setSort({
         value: ''
      });

      setDates({
         create_lte: null,
         create_gte: null,
         complete_lte: null,
         complete_gte: null,
      });
   }

   return (
      <Modal
         show={true}
         onHide={props.onClose}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Filters
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <span>status</span>
            {
               statusOptions.map((option, index) => {
                  return (
                     <Form.Check
                        key={index}
                        type="radio"
                        label={option.label}
                        name="status"
                        id={`status${index}`}
                        onChange={() => setStatus(option)}
                        checked={option.value === status.value}
                     />
                  )
                 })
            }

            <DropdownButton
               as={InputGroup.Prepend}
               variant="outline-primary"
               title={sort.value ? sort.label : 'All'}
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
         </Modal.Body>


         <Modal.Footer>
            <Button
               variant={"light"}
               onClick={handleResetFilters}
            >
               Reset All
           </Button>
            <Button
               variant={"success"}

               onClick={handleSendData}
            >
               Save
           </Button>
         </Modal.Footer>
      </Modal>





   )
}

export default ModalSearch;