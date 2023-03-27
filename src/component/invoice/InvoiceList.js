import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function InvoiceList(props) {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    // get invoices
    const getPosts = () => {
        axios
            .get("http://localhost:9191/invoices/")
            .then((response) => {
                if (response.status === 200) {
                    setInvoices(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // get invoices
    const getInvoiceDetails = () => {
        axios
            .get("http://localhost:9191/invoices/")
            .then((response) => {
                if (response.status === 200) {
                    setInvoices(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        alert('onDelete called');
        /*
        axios.delete(`http://localhost:9191/invoices/${id}`)
        .then(() => {
            getPosts();
        })
        */
    }


    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New Invoice</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Invoice List</h3>
                                </div>
                                <div className="box-body">
                                    <a href="addInvoice"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Invoice</button></a>
                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sr. No. </th>
                                                <th>Invoice No.</th>
                                                <th>Invoice Date.</th>
                                                <th>Invoice Year</th>
                                                <th>Customer Name</th>
                                                <th>Invoice Amount</th>
                                                <th>Total Tax</th>
                                                <th>Amount Paid</th>
                                                <th>Amount Due</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoices &&
                                                invoices.map((invoice) => (
                                                    <tr key={invoice?.id} >
                                                        <td> {invoice?.id} </td>
                                                        <td> <Link to={`/invoices/${invoice?.id}`}>{invoice?.name}</Link></td>
                                                        <td>{invoice?.invoiceDate}</td>
                                                        <td>{invoice?.invoiceYear}</td>
                                                        <td>{invoice?.customerName}</td>
                                                        <td>{invoice?.invoiceTotal}</td>
                                                        <td>{invoice?.invoiceTax}</td>
                                                        <td>{invoice?.amountPaid}</td>
                                                        <td>{invoice?.amountDue}</td>
                                                        <td>    
                                                                <Link  to={"/addInvoice"} title={"Edit"}> Edit </Link>
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={() => onDelete(invoice?.id)}><i className="fa fa-trash-o"></i> Delete </button></td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default InvoiceList;