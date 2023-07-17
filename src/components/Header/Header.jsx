import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// import { ThemeContext } from '../../context/ThemeContext';
// import { useContext } from 'react';
const Header = () => {
  // const { theme, handleThemeChange } = useContext(ThemeContext);
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Gift Kosheli</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart /> Cart
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Login
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <button
          className="theme-toggle-button"
          onClick={handleThemeChange}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </button> */}
      </header>
    </>
  );
};

export default Header;
