import React from "react";
import { Nav, NavLink, NavMenu, Img } from "./NavbarElements";
import caterpillarLogo from '../assets/caterpillar_logo.png'

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <Img src={caterpillarLogo} alt="Caterpillar Logo" />
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/catalog" activeStyle>
                    Catalog
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/contact" activeStyle>
                    Contact Us
                </NavLink>
                <NavLink to="/blogs" activeStyle>
                    Blogs
                </NavLink>
                <NavLink to="/sign-up" activeStyle>
                    Sign Up
                </NavLink>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
