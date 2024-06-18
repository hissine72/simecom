import Logo from '../../../assets/svg/cart.svg?react'

import styles from "./styles.module.css";
const { container, totalNum } = styles;
import { getcarttotalquatntityselector } from '../../../store/cart/selectors';
import { useAppSelector } from '../../../store/hocjs';
import { useNavigate } from 'react-router-dom';

const HeaderBasket = () => {
  const navigate = useNavigate();
   const totalquantity = useAppSelector(getcarttotalquatntityselector);
  
  return (
    <div className={container} onClick={()=> navigate("/cart")}>
      <Logo title="basket icon" />
      <div className={totalNum}>{totalquantity}</div>
    </div>
  );
};

export default HeaderBasket;