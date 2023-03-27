import React from "react";
import { Link, Navigate } from "react-router-dom";
import useLogout from "./authentication/useLogOut";
import { PATH_ROOT } from "./constants";

function Topmenu(props) {
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    Navigate(PATH_ROOT, { replace: true });
  };

  return (
    <>
      <div className="wrapper">
        <header className="main-header">
          <nav className="navbar navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to={PATH_ROOT}>
                  <b>Ledzer</b>
                </Link>
                {/* <a
                  href="<?php echo base_url();?>/ledzer"
                  className="navbar-brand"
                >
                  <b>Ledzer</b>
                </a> */}
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                >
                  <i className="fa fa-bars"></i>
                </button>
              </div>
              <div
                className="collapse navbar-collapse pull-left"
                id="navbar-collapse"
              >
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/products">
                      <i className="fa fa-address-book"></i> Product List
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoices">
                      <i className="fa fa-address-book"></i> Invoice List
                    </Link>
                  </li>
                  <li>
                    <Link to="/customers">
                      <i className="fa fa-address-book"></i> Customer List
                    </Link>
                  </li>
                  <li>
                    <Link to="/category">
                      <i className="fa fa-address-book"></i> Category List
                    </Link>
                  </li>

                  <li className="dropdown">
                    <a
                      href="/#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-wrench"></i>&nbsp;&nbsp; Setting{" "}
                      <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      <li className="divider"></li>
                      <li>
                        <Link to="/customers">
                          <i className="fa fa-address-book"></i> Customer List
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li onClick={() => signOut()}>
                    <a href="/">
                      <i className="fa fa-power-off"></i> <span></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Topmenu;
