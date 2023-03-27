import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InvoiceDataService from '../../services/InvoiceDataService';

function ViewInvoice(props) {
    
    const params = useParams();
    const [currentInvoice, setInvoice] = useState("");

    useEffect(() => {
        getPosts(params.id);
    }, []);

    // get invoices
    const getPosts = (id) => {
        axios
            .get(`http://localhost:9191/invoices/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setInvoice(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /*
  const initialInvoiceState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  */


    return (
        <>
            {currentInvoice ? (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Invoice
                        <small>
                            <h4>: &nbsp;<b>{currentInvoice.name}</b></h4>
                        </small>
                    </h1>
                </section>
                <section className="invoice">
                <div className="row">
                        <div className="col-xs-12">
                            <h2 className="page-header">
                                <i className="fa fa-globe"></i> {currentInvoice.businessName}, {currentInvoice.businessCity}.
                                <small className="pull-right">Date: &nbsp; {currentInvoice.invoiceDate} </small>
                            </h2>
                        </div>
                    </div>
                    <div className="row invoice-info">
                        <div className="col-sm-4 invoice-col">
                            From
                            <address>
                                <strong>{currentInvoice.businessName}.</strong><br />
                                {currentInvoice.businessAddress}<br />
                                {currentInvoice.businessCity}, {currentInvoice.businessStateName} 444606<br />
                                Phone: {currentInvoice.businessContactNo}<br />
                                GSTIN: {currentInvoice.businessGstno}<br />
                                State Code: {currentInvoice.businessStateId}
                            </address>
                        </div>
                        <div className="col-sm-4 invoice-col">
                            To
                            <address>
                                <strong>{currentInvoice.customerName}</strong><br />
                                {currentInvoice.customerAddress}<br />
                                {currentInvoice.customerCity}, {currentInvoice.customerState} 444606<br />
                                Phone: {currentInvoice.customerContactNo}<br />
                                Email: {currentInvoice.customerEmail}<br />
                                GSTIN: {currentInvoice.customerGstin}<br />
                            </address>
                        </div>
                        <div className="col-sm-4 invoice-col">
                            <b>Invoice : </b>{currentInvoice.invoiceName}<br />
                            <br />
                            <b>Total Outstanding Balance:</b> {currentInvoice.customerTotalOutBal}<br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Product Description</th>
                                        <th>HSN Code</th>
                                        <th>Rate</th>
                                        <th>CGST Amt</th>
                                        <th>SGST Amt</th>
                                        <th>IGST Amt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentInvoice.invoiceDetailsDTOList &&
                                        currentInvoice.invoiceDetailsDTOList.map((invoiceDetail) => (
                                            <tr key={invoiceDetail.id} >
                                                <td> {invoiceDetail.id} </td>
                                                <td>{invoiceDetail.description}</td>
                                                <td>{invoiceDetail.hsnCode}</td>
                                                <td>{invoiceDetail.rate}</td>
                                                <td>{invoiceDetail.cgstAmt}</td>
                                                <td>{invoiceDetail.sgstAmt}</td>
                                                <td>{invoiceDetail.igstAmt}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-7">
                        </div>
                        <div className="col-xs-5">
                            <p className="lead">Amount Due : {currentInvoice.amountDue}</p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th >Sub Total :</th>
                                            <td>Rs. {currentInvoice.itemTotal} </td>
                                        </tr>
                                        <tr>
                                            <th>Total item_tax:</th>
                                            <td>Rs. {currentInvoice.itemTax} </td>
                                        </tr>
                                        <tr>
                                            <th>Total Billed Value:</th>
                                            <td>Rs. {currentInvoice.billTotal} </td>
                                        </tr>
                                        <tr>
                                            <th>Grand Total :</th>
                                            <td>Rs. {currentInvoice.invoiceTotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount Paid:</th>
                                            <td>Rs. {currentInvoice.amountPaid}</td>
                                        </tr>
                                        <tr>
                                            <th>Due Amount:</th>
                                            <td>Rs. {currentInvoice.amountDue}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row no-print">
                        <div className="col-xs-10">
                            <a href="#">
                                <button type="button" className="btn btn-primary pull-right">
                                    <i className="fa fa-download"></i>&nbsp;Generate Invoice&nbsp;&nbsp;
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
                
                <div className="clearfix"></div>
            </div>
             ) : (
                <div>
                  <br />
                  <p>Please click on a Tutorial...</p>
                </div>
              )}
        </>
    );
}

export default ViewInvoice;