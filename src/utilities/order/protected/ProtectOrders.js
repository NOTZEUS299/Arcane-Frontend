import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { orderData } from "../../../helper/Jotai";

const ProtectOrders = ({ children }) => {
  const [order] = useAtom(orderData);
  const param = useParams();
  const navigate = useNavigate();

  if (order[1]?.id === param?.id) {
    return children;
  } else {
    return navigate("/home");
  }
};

export default ProtectOrders;
