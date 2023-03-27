import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


function CustomerList(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    // get posts
    const getPosts = () => {
        axios
            .get("http://localhost:9191/customers/")
            .then((response) => {
                if (response.status === 200) {
                    setPosts(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:9191/customers/${id}`)
        .then(() => {
            getPosts();
        })
    }

    const setData = (data) => {
        let { id, customerName, mobno, address , city , pin, email , stateId , pan, totalOutBal } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('mobno', mobno);
        localStorage.setItem('address', address);
        localStorage.setItem('city', city);
        localStorage.setItem('pin', pin);
        localStorage.setItem('email', email);
        localStorage.setItem('stateId', stateId);
        localStorage.setItem('pan', pan);
        localStorage.setItem('totalOutBal', totalOutBal);
        
    }


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
                                <div className="box-header">
                                    <h3 className="box-title"> Customer List</h3>
                                </div>
                                <div className="box-body">
                                    <a href="addCustomer"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Customer</button></a>
                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No </th>
                                                <th width="40%">Name</th>
                                                <th width="10%">Contact No.</th>
                                                <th width="10%">City</th>
                                                <th width="10%">Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts &&
                                                posts.map((post) => (
                                                    <tr key={post?.id} >
                                                        <td> {post?.id} </td>
                                                        <td>{post?.name}</td>
                                                        <td>{post?.contactNo}</td>
                                                        <td>{post?.city}</td>
                                                        <td>{post?.totalOutBal}</td>
                                                        <td>    
                                                                <Link  to={"/customers/"+ post?.id} title={"Edit"}> Edit </Link>
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={() => onDelete(post?.id)}><i className="fa fa-trash-o"></i> Delete </button></td>
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

export default CustomerList;