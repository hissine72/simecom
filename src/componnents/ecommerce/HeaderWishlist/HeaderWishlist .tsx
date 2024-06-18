import Logo from '../../../assets/svg/wishlist.svg?react'

import styles from "./styles.module.css";
const { container, totalNum } = styles;
// import { getcarttotalquatntityselector } from '../../../store/cart/selectors';
// import { useAppSelector } from '../../../store/hocjs';
import { useNavigate } from 'react-router-dom';

const HeaderWishlist  = () => {
  const navigate = useNavigate();
   const totalquantity = 0
  
  return (
    <div className={container} onClick={()=> navigate("/cart")}>
      <Logo title="basket icon" />
      <div className={totalNum}>{totalquantity}</div>
      {/* <h3>wishlist</h3> */}
    </div>
  );
};

export default HeaderWishlist ;