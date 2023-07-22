import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetOrderDetailsQuery } from '../redux/slices/orderApi.slice';
import { Container } from 'react-bootstrap';
const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error.error}</p>
      ) : (
        <Container>
          <h2>Order {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.address},
                    {order.shippingAddress.city}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>order</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderScreen;
