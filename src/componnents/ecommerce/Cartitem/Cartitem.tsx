import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import { Tproduct } from "../../../types/product";
import styles from "./styles.module.css";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemProps = Tproduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const Cartitem = memo(
  ({
    id,
    title,
    img,
    price,
    quantity,
    max,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    // render option list
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default Cartitem;