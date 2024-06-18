import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../store/hocjs";
import { actproducts } from "../store/products/productSlice";
import { productsCleanUp } from "../store/products/productSlice";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../componnents/ecommerce/product/Product";


const Products = () => {
  const params = useParams();
  const dispatcsh = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.produc);

  useEffect(() => {
    dispatcsh(actproducts(params.prefix as string))
   

    return () => {
     dispatcsh(productsCleanUp())
    };
  }, [dispatcsh,params]);

  const productsList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...record} />
          </Col>
        ))
      : "there are no categories";
      console.log(productsList)

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  );
};



export default Products;