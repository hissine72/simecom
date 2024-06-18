import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
// const { product, productImg, maximumNotice, wishlistBtn } = styles;
import Like from "../../../assets/svg/like.svg?react"
import Likefill from "../../../assets/svg/like-fill.svg?react"
const { product, productImg, wishlistBtn } = styles;
import { addToCart } from "../../../store/cart/cartslice";
import { Tproduct } from "../../../types/product";
import { useAppDispatch } from "../../../store/hocjs";

const Product = ({ title, price, img, id }: Tproduct) => {
  const dispatch= useAppDispatch();
   const addTocarthandller = ()=>{
    dispatch(addToCart(id))
   }

    return (
      <div className={product}>
        <div className={wishlistBtn}>
          <Like/>
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price} EGP</h3>
        <Button variant="info" style={{ color: "white" }} onClick={addTocarthandller}>
          Add to cart
        </Button>
      </div>
    );
  };
  
  export default Product;
