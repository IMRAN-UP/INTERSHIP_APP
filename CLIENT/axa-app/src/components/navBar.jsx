import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { axa_Logo } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

function NavScrollExample({ situation }) {
  const navigate = useNavigate();

  const handleUrl = (e) => {
    e.preventDefault();
    navigate('/' + e.target.id);
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary navBar">
      <Container fluid className='navbar-container'>
        <Navbar.Brand href="#">
          <img
            src={axa_Logo}
            alt=""
            style={{
              width: '50px',
            }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link id={situation ? 'dashboard' : ''} onClick={handleUrl}>Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <NavDropdown title="Contact" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#social-media">Social Media</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Call Phone
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Real Time
              </NavDropdown.Item>
            </NavDropdown>
            {
              situation && <NavDropdown title="Profil" id="navbarScrollingDropdown">
                <NavDropdown.Item id='vehicle' onClick={handleUrl}>
                  Vehicles
                </NavDropdown.Item>

                <NavDropdown.Item>
                  Notifacations
                </NavDropdown.Item>

                <NavDropdown.Item >
                  Payments
                </NavDropdown.Item>
                <NavDropdown.Item id='insurance' onClick={handleUrl}>
                  Insurances
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  Account
                </NavDropdown.Item>
              </NavDropdown>
            }

            <Nav.Link onClick={handleUrl} id={ situation ? '' : 'register&login'} >
              {situation ? 'Logout' : 'Login'}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              variant="outline-success"
              style={{
                backgroundColor: 'var(--btn-color)',
                color: 'var(--white-color)',
                border: 'none',
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;