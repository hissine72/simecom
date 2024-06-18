import { Badge, Navbar, Nav, Container, NavDropdown  } from "react-bootstrap";
import styles from "./styles.module.css";
const { headerContainer, headerLogo,headerLeftBar } = styles;
import { NavLink } from "react-router-dom";
import HeaderBasket  from "../../ecommerce/HeaderBasket/HeaderBasket";
import HeaderWishlist from "../../ecommerce/HeaderWishlist/HeaderWishlist ";
import { useAppDispatch,useAppSelector } from "../../../store/hocjs";
import { authLogout } from "../../../store/auth/authSlice";
const Header = () => {
  const dispatch = useAppDispatch();

  const { accessToken, user } = useAppSelector((state) => state.auth);
    return (
      <header>
        <div className={headerContainer}>
          <h1 className={headerLogo}>
            <span>our</span> <Badge bg="info">Ecom</Badge>
          </h1>
               <div className={headerLeftBar}>
            
               <HeaderWishlist />
               <HeaderBasket />

               </div>
            
        </div>
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          bg="dark"
          data-bs-theme="dark"
        >
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link  as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link  as={NavLink} to="categories" >
                  Categories
                </Nav.Link>
                
                <Nav.Link  as={NavLink} to="Apout-us">
                  About
                </Nav.Link>
              </Nav>
              <Nav>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register 
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    onClick={() => dispatch(authLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
                <Nav.Link as={NavLink} to="google">
                 google
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  };
  export default Header;