import React, { useState, useEffect } from 'react';
import moment from 'moment';
import InvoiceDataService from '../../services/InvoiceDataService';
import MasterDataService from '../../services/MasterDataService';
import CustomerDataService from '../../services/CustomerDataService';
import { useNavigate } from 'react-router-dom'

function AddInvoice() {

    const navigate = useNavigate() // <-- hooks must be INSIDE the component

    const initialBusinessData = {
        id: null,
        businessName: "",
        address: "",
        city: "",
        pin: "",
        stateId: "",
        phoneNo: ""
      };

      const invoiceInitialData = {
        invoiceName: "",
        invoiceNumber: ""
      };

    const [products, setProducts] = React.useState([]);
    const [customers, setCustomers] = React.useState([]);
    const [businessDetail, setBusinessDetail] = useState(initialBusinessData);
    const [invoiceInitial, setInvoiceInitial] = useState(invoiceInitialData);

    const getBusinessDetails = id => {
        MasterDataService.getBusinessDetails(id)
        .then(response => {
            console.log('response ='+response.data);
            setBusinessDetail(response.data);
           
        })
        .catch(e => {
            console.log(e);
        });
    };


    const getInvoiceInitial= () => {
        InvoiceDataService.getInvoiceInitial()
        .then(response => {
            console.log('response ='+response.data);
            setInvoiceInitial(response.data);
           
        })
        .catch(e => {
            console.log(e);
        });
    };

    React.useEffect(() => {

        async function getProducts() {
          const response = await fetch("http://localhost:9191/products/");
          const body = await response.json();
          setProducts(body.map(item => {
              return { value: item.id, label: item.name , rate : item.rate , gstPer : item.gstPer};
            }));
        }

        async function getCustomers() {
            const response = await fetch("http://localhost:9191/customers/");
            const body = await response.json();
            setCustomers(body.map(item => {
                return { value: item.id, label: item.name , rate : item.rate , gstPer : item.gstPer};
              }));
        }

        getProducts();
        getCustomers();
        getBusinessDetails(1);
        getInvoiceInitial();
      }, []);


    const [invoiceDetails, setInvoiceDetails] = useState([
        {
          productId: "-1",
          description: "",
          rate: 0,
          quantity: 1,
          gstPer: 0,
          gstAmt: 0,
        },
    ]);

    

    const setInvoiceFinalAmount = (e) => {
        setInvoice({ ...invoice, 
            [e.target.name]: e.target.value,
        }
        );
    };

    const [invoice, setInvoice] = useState([
        {
            invoiceNumber: 0,
            itemTotal: 0.00,
            itemTax: 0.00,
            billTotal: 0.00,
            roundValue: 0.00,
            invoiceTotal: 0.00,
            amountPaid: 0.00,
            amountDue: 0.00,
        },
    ]);

    const saveInvoice = () => {
        var data = {
            pan : invoice.pan,
            totalOutBal : invoice.totalOutBal,
            itemTotal : invoice.itemTotal,
            itemTax : invoice.itemTax,
            billTotal : invoice.billTotal,
            roundValue : invoice.roundValue,
            invoiceTotal : invoice.invoiceTotal,
            amountPaid : invoice.amountPaid,
            amountDue : invoice.amountDue,
            
        };

        CustomerDataService.create(data)
        .then(response => {
            console.log(response.data);
            navigate("/customers");
        })
        .catch(e => {
            console.log(e);
        });
      };


    useEffect(() => {
        if (invoiceDetails?.length) {
            let itemTotalValue = 0;
            let itemTaxValue = 0;
            let billTotalValue = 0;
            let roundTotalValue = 0;
            invoiceDetails?.forEach((element) => {
                itemTotalValue = itemTotalValue + element.rate * element.quantity;
                itemTaxValue = parseFloat(itemTaxValue) + parseFloat(element.gstAmt);
                billTotalValue = parseFloat(itemTotalValue) + parseFloat(itemTaxValue);
                roundTotalValue = 0.00;
            });
           
            setInvoice({
                ...invoice,
                itemTotal: itemTotalValue,
                itemTax: itemTaxValue,
                billTotal: itemTotalValue + itemTaxValue,
                roundValue: roundTotalValue,
                invoiceTotal : billTotalValue + roundTotalValue,
                amountPaid : billTotalValue + roundTotalValue,
                amountDue : 0.00,
            });
        }
    }, [invoiceDetails]);
    
    const deleteProduct = (productIndex) => {
        const tempInvoiceDetails = invoiceDetails?.filter(
            (item, index) => index !== productIndex
        );
        setInvoiceDetails(tempInvoiceDetails);
    };
    
    const handleChange = (index, event) => {
        const tempInvoiceDetails = [...invoiceDetails];
        
        if(event.target.name === "productId")
        {
            // tempInvoiceTotalDetails[index][event.target.name] = event.target.value;
            const selectedProductId = products.find((item) => item.value === event.target.value);
            tempInvoiceDetails[index].rate = selectedProductId?.rate ? selectedProductId?.rate : "0";
            tempInvoiceDetails[index].gstPer = selectedProductId?.gstPer ? selectedProductId?.gstPer : "0.00";
        }
        tempInvoiceDetails[index][event.target.name] = event.target.value;
        tempInvoiceDetails[index].gstAmt = ((tempInvoiceDetails[index].rate * tempInvoiceDetails[index].quantity) / 100 )  * tempInvoiceDetails[index].gstPer;
        setInvoiceDetails(tempInvoiceDetails);
    };

    const renderTablerows = () => {
        if (invoiceDetails?.length) {
          return invoiceDetails?.map((invoiceDetail, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <select  name="productId" className='form-control select2' onChange={(event) => handleChange(index, event)} >
                        <option key="-1" value="-1">Select Product</option>
                        {products.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </td>
                <td> 
                    <input type="text" 
                        name="description"
                        className="form-control input-sm number" 
                        placeholder="Description" 
                        value={invoiceDetail?.description} 
                        onChange={(event) => handleChange(index, event)} 
                    />
                </td>
                <td>
                  <input
                    name="rate"
                    type="number"
                    value={invoiceDetail?.rate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    name="quantity"
                    type="number"
                    value={invoiceDetail?.quantity}
                    onChange={(event) => handleChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    name="gstPer"
                    type="text"
                    value={invoiceDetail?.gstPer}
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="gstAmt"
                    type="text"
                    value={invoiceDetail?.gstAmt}
                    disabled
                  />
                </td>
                <td
                  onClick={() => deleteProduct(index)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Delete
                </td>
              </tr>
            );
          });
        }
    };

    const addProduct = () => {
        const dummyProduct = {
            productId: "1",
            description: "",
            rate: "0",
            quantity: "1",
            gstPer: "0",
            gstAmt: "0",
        };
        const tempInvoiceTotalDetails = [...invoiceDetails, dummyProduct];
        setInvoiceDetails(tempInvoiceTotalDetails);
      };

    return (
        <div>

            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        <div className="col-xs-12">
                            Add Invoice
                        </div>
                    </h1>
                </section>
                <section className="invoice">
                    <form method ="POST" className='form'>
                        <div class="row invoice-info">
                            <div class="col-sm-5 invoice-col">
                            From
                            <address>
                                <strong>Business Name : {businessDetail.businessName}.</strong><br/>
                                Address {businessDetail.address}<br/>
                                {businessDetail.city}, {businessDetail.stateId} {businessDetail.pin}<br/>
                                Phone: {businessDetail.phoneNo}<br/>
                            </address>
                            </div>
                            <div class="col-sm-2 invoice-col">
                                <strong>Customer Details :</strong><br/><br/>
                            </div>
                            <div class="col-sm-3 invoice-col">
                                <address>
                                    <div class="form-horizontal">
                                            <div class="form-group" >
                                                <div class="col-md-8">
                                                    <select className='form-control select2'>
                                                        {customers.map(o => (
                                                            <option key={o.value} value={o.value}>{o.label}</option>
                                                        ))}
                                                    </select>
                                                    <input class="form-control input-sm" type="text" placeholder="Invoice Name" value={invoiceInitial?.invoiceName} />
                                                    <input type="text" class="form-control" placeholder="invoiceNumber" name="invoiceNumber" value={invoiceInitial?.invoiceNumber} />
                                                </div>
                                            </div>
                                        
                                    </div>
                                </address>
                            </div>
                            <div className="col-xs-2">
                                <small> Invoice Number</small>
                                <input className="form-control" type="text" name="invoiceNumberLabel"  value={invoice?.invoiceNumberLabel} width="100" />
                            </div>
                            <div className="col-xs-2">
                                <small className="pull-right">Invoice Date: <input type="text" className="form-control pull-right"  name="invoiceDate"  placeholder="Enter Invoice Date" value={invoice?.businessStateId} required /></small>
                                <input className="form-control" type="hidden" name="businessStateId" value={invoice?.businessStateId} />
                                <input className="form-control" type="hidden" name="businessId" value={invoice?.businessStateId} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 table-responsive">
                                <table className="table table-striped table-bordered dataTable" id="editable-sample" aria-describedby="editable-sample_info">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>Product</th>
                                            <th>Description</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Gst %</th>
                                            <th>GST Amt</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderTablerows()}</tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-2">
                                <br /><br />
                                <button type="button" id="addmore" className="btn btn-primary" onClick={() => addProduct()} >
                                    <i className="fa fa-plus"></i> Add Row
                                </button>
                            </div>
                            <div className="col-xs-5">
                                <br />
                                <div className="box box-info">
                                    <div className="form-horizontal">
                                        <div className="box-body">
                                            <div className="form-group" id="amount_paid_div">
                                                <label className="col-sm-4 control-label">Amount Paid</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" placeholder="Amount Paid" name="amountPaid" value={invoice?.amountPaid} />
                                                    
                                                </div>
                                            </div>
                                            <div className="form-group" id="amount_due_div">
                                                <label className="col-sm-4 control-label">Amount Due</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" placeholder="Amount Due" name="amountDue" value={invoice?.amountDue} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                                <tr>
                                                    <th >Item Total Amount:</th>
                                                    <td>
                                                        { 
                                                            invoiceDetails?.length ? (
                                                                <div className="col-5">
                                                                    <input type="text" name="itemTotal" value={invoice?.itemTotal} onChange={(e) => setInvoiceFinalAmount(e.target.value)} />&nbsp;&nbsp;&nbsp;Rs.
                                                                </div>
                                                            ) : (0)
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th >Item Tax Amount:</th>
                                                    <td>
                                                        { 
                                                            invoiceDetails?.length ? (
                                                                <div className="col-5">
                                                                    <input type="text" name="itemTax" value={invoice?.itemTax} onChange={(e) => setInvoiceFinalAmount(e.target.value)} />&nbsp;&nbsp;&nbsp;Rs.
                                                                </div>
                                                            ) : (0)
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Billled Amount: </th>
                                                    <td>
                                                        { 
                                                            invoiceDetails?.length ? (
                                                                <div className="col-5">
                                                                    <input type="text" name="billTotal" value={invoice?.billTotal} onChange={(e) => setInvoiceFinalAmount(e.target.value)} />&nbsp;&nbsp;&nbsp;Rs.
                                                                </div>
                                                            ) : (0)
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Round Value : </th>
                                                    <td>
                                                        { 
                                                            invoiceDetails?.length ? (
                                                                <div className="col-5">
                                                                    <input type="text" name="roundValue" value={invoice?.roundValue} />&nbsp;&nbsp;&nbsp;Rs.
                                                                </div>
                                                            ) : (0)
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Grand Total (Net Amount) : </th>
                                                    <td>
                                                        { 
                                                            invoiceDetails?.length ? (
                                                                <div className="col-5">
                                                                    <input type="text" name="invoiceTotal" value={invoice?.invoiceTotal}  />&nbsp;&nbsp;&nbsp;Rs.
                                                                </div>
                                                            ) : (0)
                                                        }
                                                    </td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row no-print">
                            <div className="col-xs-12">
                                <input type="submit" className="btn btn-success pull-right" value="Save Payment" onClick={saveInvoice} />
                            </div>
                        </div>
                    </form>
                </section>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
export default AddInvoice;