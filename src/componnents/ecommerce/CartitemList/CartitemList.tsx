import Cartitem from "../Cartitem/Cartitem";
import { Tproduct } from "../../../types/product";

type CartItemListProps = {
  products: Tproduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartitemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemListProps) => {
  const renderList = products.map((el) => (
    <Cartitem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <div>{renderList}</div>;
};

export default CartitemList;