import "react-datepicker/dist/react-datepicker.css";
import styles from "./modalSearch.module.scss";
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Button, Modal, InputGroup, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { statusOptions, sortOptions, dateOptions } from '../../Search/options';

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
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Filters
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className={`${styles.greyText}`}>Status</span>
        <Row className="mt-1 mb-4 justify-content-center">
          {
            statusOptions.map((option, index) => {
              return (
                <Col key={index}>
                  <Form.Check
                    className={styles.greyText}
                    type="radio"
                    label={option.label}
                    name="status"
                    id={`status${index}`}
                    onChange={() => setStatus(option)}
                    checked={option.value === status.value}
                  />
                </Col>
              )
            })
          }
        </Row>
        <Row>
          <Col>
            <span className={styles.greyText} title="sort by"> Sort by</span>
            <DropdownButton
              className={`w-100 mt-2 mb-4 ${styles.dropdown}`}
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={sort.value ? sort.label : 'All'}
              id="input-group-dropdown-1"
            >
              {
                sortOptions.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    active={sort.value === option.value}
                    onClick={() => setSort(option)}
                  >
                    {option.label}
                  </Dropdown.Item>)
                )
              }
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col className={styles.dataPicerRow}>
            {
              dateOptions.map((option, index) => {

                const bool = index % 2;

                return (
                  <div key={index} className={styles.dataPicerBlock}>
                    {
                      !bool &&
                      <span className={styles.dataPicerTitile}>{option.label}</span>
                    }
                    <DatePicker
                      className={styles.dataPicer}
                      selected={dates[option.value]}
                      onChange={(value) => handleChangeDate(value, option.value)}
                      placeholderText={bool ? 'To' : 'From'}
                    />
                  </div>
                )
              })
            }
          </Col>
        </Row>
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