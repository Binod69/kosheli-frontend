import { useEffect, useState } from 'react';
import axiosInstance from '../config/axios.config';
import { Row, Col, Container } from 'react-bootstrap';
import apiEndpoint from '../config/api.endpoint';
import Products from '../components/Product/Products';

const HomeScreen = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get(apiEndpoint.PRODUCTS);
      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(fetchProducts);

  return (
    <>
      <div>Latest Gifts</div>
      <Container>
        <Row>
          {product.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
