import { useGetProductsQuery } from '../redux/slices/productApi.slice';
import { Row, Col, Container } from 'react-bootstrap';
// import { toast } from 'react-hot-toast';
import Products from '../components/Product/Products';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Loading from '../components/Loading/Loading';
// import Loading from '../components/Loading/Loading';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {/* <Loading /> */}
      {/* <Loading>
        <Skeleton count={8} />
      </Loading> */}
      {/* <Loading /> */}
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
