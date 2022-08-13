import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/api';

const OrderDetail = () => {
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      axios.get(`/orders/${id}`).then((res) => {
        console.log(res);
      });
    }
  }, []);
  return <div className="order_detail">订单详情</div>;
};

export default OrderDetail;
