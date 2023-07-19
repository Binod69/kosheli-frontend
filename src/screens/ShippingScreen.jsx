import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormContainer from '../components/FormContainer/FormContainer';
import { saveShippingAddress } from '../redux/slices/cart.slice';
import CheckoutStep from '../components/CheckpoutStep/CheckoutStep';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [phoneNumber, setPhoneNUmber] = useState(
    shippingAddress?.phoneNumber || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, phoneNumber, country })
    );
    navigate('/payment');
    console.log('submit');
  };
  return (
    <FormContainer>
      <Container>
        <CheckoutStep step1 step2 />
        <h2>Shipping</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="my-3">
            <Form.Label>Address :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city" className="my-3">
            <Form.Label>City :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postalCode" className="my-3">
            <Form.Label>Postal code :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="my-3">
            <Form.Label>Phone number :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNUmber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="country" className="my-3">
            <Form.Label>Country :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="success" className="my-2">
            Continue
          </Button>
        </Form>
      </Container>
    </FormContainer>
  );
};

export default ShippingScreen;
