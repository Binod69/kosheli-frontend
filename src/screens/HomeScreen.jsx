import { Row, Col, Container } from 'react-bootstrap';
import Products from '../components/Product/Products';
import productData from '../productsData';

const HomeScreen = () => {
  return (
    <>
      <div>Latest Gifts</div>
      <Container>
        <Row>
          {productData.map((item) => (
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
