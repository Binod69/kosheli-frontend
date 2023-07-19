import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormContainer from '../components/FormContainer/FormContainer';
import CheckoutStep from '../components/CheckpoutStep/CheckoutStep';
import { savePaymentMethod } from '../redux/slices/cart.slice';
const PaymentScreen = () => {
  const [payment, setPayment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const shippindAddress = cart;

  useEffect(() => {
    if (!shippindAddress) {
      navigate('/shipping');
    }
  }, [shippindAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate('/placeorder');
  };
  return (
    <FormContainer>
      <Container>
        <CheckoutStep animated step1 step2 step3 />
        <h2>Payment Method</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                className="my-2"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethods"
                value="PayPal"
                checked
                onChange={(e) => setPayment(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type="radio"
                className="my-2"
                label="Cash on Delivery"
                id="PayPal"
                name="paymentMethods"
                value="cashonDelivery"
                onChange={(e) => setPayment(e.target.value)}
              ></Form.Check> */}
            </Col>
          </Form.Group>
          <Button type="submit" variant="success">
            Continue
          </Button>
        </Form>
      </Container>
    </FormContainer>
  );
};

export default PaymentScreen;
