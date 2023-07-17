import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import {
  Col,
  Row,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';
import { FaOpencart } from 'react-icons/fa';
import Rating from '../components/Rating/Rating';
import apiEndPoints from '../config/api.endpoint';
import { useCallback } from 'react';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: productId } = useParams();

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        apiEndPoints.PRODUCTS + '/' + productId
      );
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  console.log(fetchProduct);

  //   console.log(product);

  return (
    <>
      <Container>
        <Link to="/" className="btn btn-light my-3">
          Go back
        </Link>
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
              <ListGroup.Item>price: ${product.price}</ListGroup.Item>
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
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    <FaOpencart /> Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
