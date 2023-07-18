import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';
import emptycart from '../../public/images/emptycart.jpg';
import { addToCart, removerFromCart } from '../redux/slices/cart.slice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const addtoCartHandler = async (product, qty) => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
  };

  const removefromCartHandler = async (id) => {
    dispatch(removerFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const { cartItem } = cart;
  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <h2 className="my-4">Shopping Cart</h2>
            {cartItem.length === 0 ? (
              <div className=" d-lg-flex justify-lg-content-center  align-items-lg-center">
                <Image src={emptycart} fluid />
                <div className=" flex-lg-row">
                  <p>Oops looks like your cart is empty!</p>
                  <Link to={'/'}>
                    <Button variant="outline-success">Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <ListGroup variant="flush">
                {cartItem.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>रु‎ {item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            addtoCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removefromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          {cartItem.length === 0 ? (
            ''
          ) : (
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>
                      Subtotal (
                      {cartItem.reduce((acc, item) => acc + item.qty, 0)}) items
                    </h4>
                    <p>
                      Total रु‎:
                      {cartItem
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItem.length === 0}
                      variant="dark"
                      onClick={checkoutHandler}
                    >
                      <FaPaperPlane /> Proceed to check out
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
