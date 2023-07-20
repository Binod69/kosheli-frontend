import { useGetProductsQuery } from '../redux/slices/productApi.slice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Products from '../components/Product/Products';
import Loading from '../components/Loading/Loading';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
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
