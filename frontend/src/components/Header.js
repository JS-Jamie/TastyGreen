import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onClickHandler = () => {
    setKeyword('');
    navigate('/');
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Button onClick={onClickHandler} className='TastyGreen-button'>
            🐢 TastyGreen
          </Button>
          {/*LinkContainer issue ---  https://stackoverflow.com/questions/70090030/is-there-a-solution-for-linkcontainer-component-from-react-router-bootstrap-erro */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={() => <SearchBox />} /> */}
            <SearchBox keyword={keyword} setKeyword={setKeyword} />
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link
                      as={Link}
                      to='/profile'
                      style={{ color: 'black' }}
                    >
                      Profile
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item>
                    <Nav.Link
                      as={Link}
                      to='/admin/userlist'
                      style={{ color: 'black' }}
                    >
                      Users
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link
                      as={Link}
                      to='/admin/productlist'
                      style={{ color: 'black' }}
                    >
                      Products
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link
                      as={Link}
                      to='/admin/orderlist'
                      style={{ color: 'black' }}
                    >
                      Orders
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
