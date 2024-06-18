import { useAppDispatch,useAppSelector } from "../store/hocjs";
import actgetproducts from "../store/cart/act/actgetproducts";
import {cartItemChangeQuantity,cartItemRemove} from "../store/cart/cartslice"
import { useEffect , useCallback} from "react";
import CartSubtotalPrice from "../componnents/ecommerce/CartSubtotalprice/CartSubtotalprice";

import CartitemList from "../componnents/ecommerce/CartitemList/CartitemList";

const Cart = () => {
  const dispatch = useAppDispatch();
  const {items,productFullInfo} = useAppSelector((state)=>state.cart)

  
  useEffect(() => {
    dispatch(actgetproducts());
  }, [dispatch]);

  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  return (
    <div>
         {products.length ? (
          <>
            <CartitemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          "Your Cart is empty"
        )}

    </div>
  )
}

export default Cart