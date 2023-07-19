// import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/slices/userApi.slice';
import { setCredentials } from '../redux/slices/auth.slice';
import FormContainer from '../components/FormContainer/FormContainer';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful!', {
        position: 'top-right',
        duration: 2000, // The toast will disappear after 2 seconds
      });
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.error || 'Login failed. Please try again.';

      toast.error(errorMessage, {
        position: 'top-center',
        duration: 2000,
      });
    }
  };
  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email" className="my-3">
          <Form.Control
            type="email"
            placeholder="enter email"
            {...register('email', { required: true })}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Control
            type="password"
            placeholder="enter password"
            {...register('password', { required: true })}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button type="submit" className="my-3" disabled={isLoading}>
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Dont have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
