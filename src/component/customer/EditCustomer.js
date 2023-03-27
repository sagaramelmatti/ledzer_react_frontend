import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerDataService from '../../services/CustomerDataService';
import {Link, Routes, Route, useParams, useNavigate} from 'react-router-dom'

function EditCustomer(props) {

    const { id }= useParams();
    let navigate = useNavigate();

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

    const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
    const [message, setMessage] = useState("");

    const getCustomer = id => {
        CustomerDataService.get(id)
        .then(response => {
            console.log('response ='+response.data);
            setCurrentCustomer(response.data);
           
        })
        .catch(e => {
            console.log(e);
        });
    };

  useEffect(() => {
    if (id)
      getCustomer(id);
  }, [id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then(response => {
            navigate('/customers');
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };


    return (
        <>
            {currentCustomer ? (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New Customer</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Customer Master</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Customer Name</label>
                                                <input type="text" className="form-control" name="name" value={currentCustomer.name} onChange={handleInputChange} />
                                                <input type="text" className="form-control" name="id" value={currentCustomer.id}  />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Contact Number</label>
                                                <input type="text" className="form-control" name="contactNo" value={currentCustomer.contactNo} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Address</label>
                                                <input type="text" className="form-control" name="address" value={currentCustomer.address }  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group required">
                                                <label className="control-label">City</label>
                                                <input type="text" className="form-control" name="city" value={currentCustomer.city} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Pin</label>
                                                <input type="text" className="form-control" name="pin" value={currentCustomer.pin} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" name="stateId" value={currentCustomer.stateId} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email" value={currentCustomer.email} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>PAN</label>
                                                <input type="text" className="form-control" name="pan" value={currentCustomer.pan}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Current Outstanding Balance</label>
                                                <input type="text" className="form-control" name="totalOutBal" value={currentCustomer.totalOutBal} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn" onClick={updateCustomer}>Save</button>
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
            ) : (
                <div>
                  <br />
                  <p>Please click on a Customer...</p>
                </div>
              )}
        </>
    );
}

export default EditCustomer;