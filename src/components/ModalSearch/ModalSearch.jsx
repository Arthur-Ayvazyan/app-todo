import React, { useState } from 'react';
import { Button, Modal, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { statusOptions, sortOptions, dateOptions } from '../Search/options';

function ModalSearch(props) {

   const [status, setStatus] = useState({
      value: ''
   });

   const [sort, setSort] = useState({
      value: ''
   });

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

   const handleSendData = () => {
      const data = {
         status,
         sort,
         dates,
      }
      props.getData(data);
      props.onClose();

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