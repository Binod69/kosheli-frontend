import { Container, Row, Col } from 'react-bootstrap';

const Loading = () => {
  return (
    <>
      <Container>
        <Row>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((id) => (
            <Col className="my-lg-5" key={id} sm={12} md={6} lg={4} xl={3}>
              <div>
                <div className="cardLoading loading">
                  <div className="imageLoading"></div>
                  <div className="content">
                    <h4 />
                    <div className="description"></div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Loading;
