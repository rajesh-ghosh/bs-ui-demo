import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { renderRoutes } from "react-router-config";
import { Link, useLocation } from "react-router-dom";
import useWindowSize from "../components/useWindowSizer";
import Logo from '../icons/bs-logo_black.svg';
import DashboardImage from "../icons/dashboard.png";
import "./style.css";

export default function MainLayout(props) {

  const { route, history } = props;

  const { height, width } = useWindowSize();
  const [collapsed, setCollapsed] = useState(width < 991 ? false : true);
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState(`/${pathname.split("/")[1]}`);

  const [searchText, setsearchText] = useState("");

  const onClickNav = (key) => {
    setActiveKey(key);
    history.push(key);
    if (width < 991) {
      setCollapsed(false);
    }
  };

  const toggleSlider = () => {
    setCollapsed(!collapsed);
  };

  const toggleMenu = () => {
    
    var sidemenu = document.getElementById('xx-side-nav-bar');
    var currDisp = sidemenu?.style.display;
    if (currDisp === 'none' || currDisp === 'None') {
      sidemenu.style.display = 'block';
      sidemenu.style.zIndex = 10;
    } else {
      sidemenu.style.display = 'none';
    }
    
  };

  const handleChange = (e) => {
    setsearchText(e.target.value);
  };

  const searchKeyword = (e) => {
    if (e.key === "Enter" && searchText !== "") {
      console.log('search term - ' + searchText);
      history.push(`/cards?q=${searchText}`);
      setsearchText("");
    }
  };

  const onSubmitHandler = (e) => {
    //if (e.key === 'Enter')
    console.log("### form submitted ... " + e.target.value);
    //e.preventDefault();
  };

  return (
    <Container fluid>
      
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top navbar-custom-organization">
        <div className="container gx-0">
          <div className="d-flex">
            
            <Navbar.Brand>
              <div className="nav-hide-show-alt gx-0">
                <Link to="/" onClick={() => toggleMenu() }>
                    <img
                      src="https://img.icons8.com/ios/50/000000/menu-squared-2--v1.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top mx-1"
                      alt="Global Menu"
                    />
                    
                </Link>
              </div>
              <Link to="/">
                <img
                  src="/logo192.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Link>
            </Navbar.Brand>
            {/* width : {width} xl-10 */}
          </div>

          <div className="d-flex">
            {/* <Form className="d-flex justify-content-end"> */}
              <FormControl
                type="search"
                placeholder="Search anything ..."
                className="mr-2"
                aria-label="Search anything"
                onChange={handleChange}
                onKeyDown={searchKeyword}
                value={searchText}
              />
            {/* </Form> */}
            <img
              src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
              className="avtar-img"
            />
          </div>

        </div>
	    </nav>
    
      <Container>
        <Row>
        {collapsed && (
            <Col id="xx-side-nav-bar" bsPrefix="sidebar" className="nav-hide-show">
              <Nav activeKey={activeKey} className="flex-column">
                {/* <Nav.Link eventKey="/" onClick={() => onClickNav("/")}>
                  Dashboard
                </Nav.Link> */}
                <NavLink eventKey="/" onClick={() => onClickNav("/")}>
                  <img src="https://img.icons8.com/material-sharp/50/000000/home.png" className="nav-item-image"/> Home
                </NavLink>
                <NavLink eventKey="/cards" onClick={() => onClickNav("/cards")}>
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/bank-card-back-side.png" className="nav-item-image"/> Cards
                </NavLink>
                <NavLink eventKey="/cardsets" onClick={() => onClickNav("/cardsets")}>
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/card-exchange.png" className="nav-item-image"/> Cardsets
                </NavLink>
                <NavLink eventKey="/language" onClick={() => onClickNav("/language")}>
                  <img src="https://img.icons8.com/material-rounded/24/000000/globe--v2.png" className="nav-item-image"/> Languages
                </NavLink>
              </Nav>
            </Col>
          )}
          <Col className="main-content">{renderRoutes(route.routes)}</Col>
        </Row>
      </Container>
      
        <footer className="bg-primary fixed-bottom">
          <div className="d-flex justify-content-center">
            <span className="footer-content">@Copyright 2020-21 XYZ Corp.</span>
          </div>
        </footer>
      
      
    </Container>
  );
}
