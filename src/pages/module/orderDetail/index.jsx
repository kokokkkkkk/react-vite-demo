import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Image } from 'antd';
import axios from '@/api';
import './styles.less'

const prefix = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://backend-api-02.newbee.ltd${url}`
    return url
  }
}
const OrderDetail = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({
    createTime: '',
    orderStatusString: '',
    orderNo: '',
    newBeeMallOrderItemVOS: []
  })
  const columns = useMemo(() => {
    return ([
      {
        title: '商品图片',
        key: 'goodsCoverImg',
        render: (_, row) => {
          return (
            <Image src={ prefix(row.goodsCoverImg)} preview={false} width='100px'></Image>
          )
        }
      },
      {
        title: '商品编号',
        dataIndex: 'goodsId',
        key: 'goodsId'
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName'
      },
      {
        title: '价格',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice'
      }
    ])
  },[data])
  useEffect(() => {
    if (id) {
      axios.get(`/orders/${id}`).then((res) => {
        const { createTime, orderStatusString, orderNo, newBeeMallOrderItemVOS } = res
        setData({createTime,orderStatusString,orderNo,newBeeMallOrderItemVOS})
        console.log(res);
      });
    }
  }, []);
  return (
    <div className="order_detail">
      <div className="order_detail_header" style={{ display: 'flex',marginBottom: '50px', justifyContent: 'space-between', width: '100%' }}>
        <Card title="订单状态" style={{ width: 400 }} hoverable>
          <p>{ data.orderStatusString }</p>
        </Card>
        <Card title="创建时间" style={{ width: 400 }} hoverable>
          <p>{ data.createTime }</p>
        </Card>
        <Card title="订单号" style={{ width: 400 }} hoverable>
          <p>{ data.orderNo }</p>
        </Card>
      </div>
      <div className="order-detail_center">
        <Table rowKey='goodsId' pagination={false} bordered={false} columns={columns} dataSource={data.newBeeMallOrderItemVOS}></Table>
      </div>
    </div>
  );
};

export default OrderDetail;
