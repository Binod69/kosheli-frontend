// import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useRegistersMutation } from '../redux/slices/userApi.slice';
import { setCredentials } from '../redux/slices/auth.slice';
import FormContainer from '../components/FormContainer/FormContainer';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registers, { isLoading }] = useRegistersMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log('userInfo', userInfo);

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
    if (data.password !== data.confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await registers(data).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Register successful!', {
          position: 'top-right',
          duration: 2000, // The toast will disappear after 2 seconds
        });
      } catch (err) {
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          'Register failed. Please try again.';

        toast.error(errorMessage, {
          position: 'top-center',
          duration: 2000,
        });
      }
    }
  };
  return (
    <FormContainer>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="my-3">
          <Form.Control
            type="text"
            placeholder="enter name"
            {...register('name', { required: true })}
            isInvalid={!!errors.name}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
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
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Control
            type="password"
            placeholder="confirm password"
            {...register('confirmPassword', { required: true })}
            isInvalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confrimPassword.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button type="submit" className="my-3" disabled={isLoading}>
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already a User?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
