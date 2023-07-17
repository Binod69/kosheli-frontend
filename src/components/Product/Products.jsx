import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Products = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variation="top" />
        </Link>

        <Card.Body>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">{product.name}</Tooltip>}
          >
            <Link to={`/product/${product._id}`}>
              <Card.Title className="product-title" as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
          </OverlayTrigger>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Products;
