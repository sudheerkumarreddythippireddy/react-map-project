import { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  padding:0 20px;
  color: white;
  cursor: pointer;
  height:10vh;
`;

const Logo = styled.h2`
  margin: 0;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: #0073e6;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  border:1px solid transparent;
  transition: all 1s ease-in-out;

  &:hover {
    background-color:transparent;
    border:1px solid white;

  }
`;

class Navbar extends Component {
  handleLogoClick = () => {
    this.props.history.push("/dashboard");
    window.location.reload();
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
    window.location.reload();
  };

  render() {
    return (
      <Nav>
        <Logo onClick={this.handleLogoClick}>MAPS</Logo>
        <LogoutButton onClick={this.handleLogout}>Logout</LogoutButton>
      </Nav>
    );
  }
}

export default withRouter(Navbar);
