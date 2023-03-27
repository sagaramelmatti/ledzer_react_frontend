import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function CategoryList(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    // get posts
    const getPosts = () => {
        axios
            .get("http://localhost:9191/masters/categories/")
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
        axios.delete(`http://localhost:9191/masters/categories/${id}`)
        .then(() => {
            getPosts();
        })
    }

    const setData = (data) => {
        let { id, name } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
    }


    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New Category</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Category List</h3>
                                </div>
                                <div className="box-body">
                                    <a href="/addCategory"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Category</button></a>
                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No </th>
                                                <th width="60%">Name</th>
                                                <th width="15%"></th>
                                                <th width="15%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts &&
                                                posts.map((category) => (
                                                    <tr key={category?.id} >
                                                        <td> {category?.id} </td>
                                                        <td>{category?.name}</td>
                                                        <td>    
                                                                <Link  to={"/addCategory"} title={"Edit"}> Edit </Link>
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={() => onDelete(category?.id)}><i className="fa fa-trash-o"></i> Delete </button></td>
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

export default CategoryList;