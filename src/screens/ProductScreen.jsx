import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Col,
  Row,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FaOpencart } from 'react-icons/fa';
import Rating from '../components/Rating/Rating';
import { useGetProductsByIdQuery } from '../redux/slices/productApi.slice';
import { addToCart } from '../redux/slices/cart.slice';
import toast from 'react-hot-toast';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsByIdQuery(productId);
  // console.log([...Array(product.countInStock).keys()]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate('/cart');
    toast.success('Product added to cart!');
  };
  return (
    <>
      <Container>
        <Link to="/" className="btn btn-light my-3">
          Go back
        </Link>
        {isLoading ? (
          <h2>loading..</h2>
        ) : error ? (
          <div>{error?.data?.message || error?.error}</div>
        ) : (
          <Row>
            <Col md={5}>
              <Image src={product.image} fluid alt={product.name} />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <h3>{product.name}</h3>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>price: रु‎ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      <FaOpencart /> Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
