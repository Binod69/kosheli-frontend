import { useGetProductsQuery } from '../redux/slices/productApi.slice';
import { Row, Col, Container } from 'react-bootstrap';
import Products from '../components/Product/Products';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>loading..</h2>
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
      ) : (
        <>
          <div>Latest Gifts</div>
          <Container>
            <Row>
              {products.map((item) => (
                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                  <Products product={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
