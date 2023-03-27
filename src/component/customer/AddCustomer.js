import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerDataService from '../../services/CustomerDataService';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

function AddCustomer(props) {

    const navigate = useNavigate();

    const initialCustomerState = {
        id: null,
        name: "",
        contactNo: "",
        address: "",
        city: "",
        pin: "",
        email: "",
        stateId: "",
        pan: "",
        totalOutBal: "",
      };

        const [customer, setCustomer] = useState(initialCustomerState);
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(null)

        const handleInputChange = event => {
            const { name, value } = event.target;
            setCustomer({ ...customer, [name]: value });
        };

        const saveCustomer = () => {
            var data = {
				name : customer.name,
				contactNo : customer.contactNo,
				address : customer.address,
				city : customer.city,
				pin : customer.pin,
				email : customer.email,
				stateId : customer.stateId,
				pan : customer.pan,
				totalOutBal : customer.totalOutBal,
            };

            CustomerDataService.create(data)
            .then(response => {
                console.log(response.data);
                navigate("/customers");
            })
            .catch(e => {
                console.log(e);
            });

            /*
            CustomerDataService.create(data)
              .then(response => {
                if (response.ok) {
                    console.log(response.data);
                    navigate('/customers');
                }
                console.log(response.data);
              })
              .catch(error => {
                  
                if (error.response) {
                    // Request made and server responded
                    setError(error.response.data.description);

                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log('2'+error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('3'+'Error', error.message);
                  }

                //setErrorMessage(e);
              });
              */
          };

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New Customer</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            {error && (
                                <p className="error"> {error} </p>
                            )}
                                <div className="box-header">
                                    <h3 className="box-title"> Customer Master</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Customer Name</label>
                                                <input type="text" className="form-control" name="name" required value={customer.name} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Contact Number</label>
                                                <input type="text" className="form-control" name="contactNo" required value={customer.contactNo} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Address</label>
                                                <input type="text" className="form-control" name="address" value={customer.address}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group required">
                                                <label className="control-label">City</label>
                                                <input type="text" className="form-control" name="city" value={customer.city} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Pin</label>
                                                <input type="text" className="form-control" name="pin" value={customer.pin} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" name="stateId" value={customer.stateId} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email" value={customer.email} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>PAN</label>
                                                <input type="text" className="form-control" name="pan" value={customer.pan}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Current Outstanding Balance</label>
                                                <input type="text" className="form-control" name="totalOutBal" value={customer.totalOutBal} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn" onClick={saveCustomer}>Save</button>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AddCustomer;