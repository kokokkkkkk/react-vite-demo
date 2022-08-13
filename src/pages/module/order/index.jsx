import { Button, Table, Input, Row, Col, Select, message} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import axios from '@/api';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const OrderStatus = {
  0: '待支付',
  1: '已支付',
  2: '配货完成',
  3: '出库成功',
  4: '交易成功',
  '-1': '手动关闭',
  '-2': '超时关闭',
  '-3': '商家关闭'
};

const payStatus = ['未支付', '微信支付', '支付宝支付'];

// createTime: "2022-02-02 13:11:30"
// extraInfo: ""
// isDeleted: 0
// orderId: 8417
// orderNo: "16437786882462497"
// orderStatus: 0
// payStatus: 0
// payTime: null
// payType: 0
// totalPrice: 19597
// updateTime: "2022-02-02 13:11:30"
// userId: 7

const Order = () => {
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tabList, setTabList] = useState({ list: [], totalCount: 0 });
  const [setTabcofing, setSetTabcofing] = useState({
    pageNumber: 1,
    pageSize: 10,
    orderNo: '',
    orderStatus: ''
  });
  useEffect(() => {
    console.log(setTabcofing, 'setTabcofing');
    axios
      .get('/orders', {
        params: {
          ...setTabcofing
        }
      })
      .then((res) => {
        // console.log(res);
        const { list, totalCount } = res;
        setTabList({ list, totalCount });
      });
  }, [setTabcofing]);

  const columns = useMemo(() => {
    return [
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo'
      },
      {
        title: '订单总价',
        dataIndex: 'totalPrice',
        key: 'totalPrice'
      },
      {
        title: '订单状态',
        key: 'orderStatus',
        render: (_, row) => {
          return <span>{OrderStatus[row.orderStatus]}</span>;
        }
      },
      {
        title: '支付方式',
        key: 'payStatus',
        render: (_, row) => {
          return (
            <span>
              {row.payStatus === 0 && '未支付'}
              {row.payStatus === 1 && '微信支付'}
              {row.payStatus === 2 && '支付宝支付'}
            </span>
          );
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '操作',
        key: '操作',
        render: (_, row) => {
          return (
            <div>
              { row.orderStatus == 1 &&  <Button type="link" onClick={() => handleConfig(row.orderId)}>配货完成</Button>}
              { row.orderStatus == 2 &&  <Button type="link" onClick={() => handleSend(row.orderId)}>出库</Button>}
              { row.orderStatus !== 4 && row.orderStatus >= 0 && <Button type="link" onClick={() => handleClose(row.orderId)}>关闭订单</Button>}
              <Button type="link" onClick={() => pushDetail(row.orderId)}>订单详情</Button>
            </div>
          );
        }
      }
    ];
  }, [tabList]);

  const randerHeader = (currentPageData) => {
    return (
      <div className="tab_header">
        <Row>
          <Col span={4} style={{ marginRight: '10px' }}>
            <Input
              onPressEnter={(e) => {
                setSetTabcofing((state) => {
                  return { ...state, orderNo: e.target.value };
                });
              }}
              placeholder="请输入订单号"></Input>
          </Col>
          <Col span={4} style={{ marginRight: '10px' }}>
            <Select
              defaultValue=""
              style={{
                width: '100%'
              }}
              onChange={handleChange}>
              <Option value="">全部</Option>
              <Option value={0}>待支付</Option>
              <Option value={1}>已支付</Option>
              <Option value={2}>配货完成</Option>
              <Option value={3}>出库成功</Option>
              <Option value={4}>交易成功</Option>
              <Option value={-1}>手动关闭</Option>
              <Option value={-2}>超时关闭</Option>
              <Option value={-3}>商家关闭</Option>
            </Select>
          </Col>
          <Col span={5}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={() => handleConfig()}>配货完成</Button>
              <Button type="primary" onClick={() => handleSend()}>出库</Button>
              <Button onClick={() => handleClose()}>关闭订单</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  // 配货完成
  const handleConfig = (id) => {
    let params = null;
    if (id) {
      params = [id]
    } else {
      if (!selectedRowKeys.length) {
        console.log('state.selectedRowKeys', selectedRowKeys.length)
        message.error('请选择项')
        return
      }
      params = selectedRowKeys
    }
    axios.put('/orders/checkDone', {
      ids: params
    }).then(() => {
      setSelectedRowKeys([])
      setSetTabcofing(state => {return {...state}})
      message.success('配货成功')
    })
  }

  // 出库
  const handleSend = (id) => {
    let params = null;
    if (id) {
      params = [id]
    } else {
      if (!selectedRowKeys.length) {
        console.log('state.selectedRowKeys', selectedRowKeys.length)
        message.error('请选择项')
        return
      }
      params = selectedRowKeys
    }
    axios.put('/orders/checkOut', {
      ids: params
    }).then(() => {
      setSelectedRowKeys([])
      setSetTabcofing(state => {return {...state}})
      message.success('出库成功')
    })
  }

  // 关闭订单
  const handleClose = (id) => {
    let params = null;
    if (id) {
      params = [id]
    } else {
      if (!selectedRowKeys.length) {
        console.log('state.selectedRowKeys', selectedRowKeys.length)
        message.error('请选择项')
        return
      }
      params = selectedRowKeys
    }
    axios.put('/orders/close', {
      ids: params
    }).then(() => {
      setSelectedRowKeys([])
      setSetTabcofing(state => {return {...state}})
      message.success('关闭成功')
    })
  }

  const pushDetail = (id) => {
    console.log(id);
    navigate('/module/orderdetail/'+id)
  }

  // 分页器
  const paginationChange = (pageNumber, pageSize) => {
    if (pageSize === setTabcofing.pageSize) {
      setSetTabcofing(state => {
        return {...state,pageNumber,
          pageSize}
      })
    } else {
      setSetTabcofing(state => {
        return {...state,pageNumber: 1,
          pageSize}
      })
    }
  };

  const handleChange = (value) => {
    setSetTabcofing((state) => {
      return {...state,orderStatus:value,pageNumber:1}
    })
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <div className="order" style={{ padding: '20px', backgroundColor: '#fff' }}>
      <Table
        rowKey="orderId"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tabList.list}
        title={(currentPageData) => randerHeader(currentPageData)}
        pagination={{
          total: tabList.totalCount,
          current: setTabcofing.pageNumber,
          pageSize: setTabcofing.pageSize,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: paginationChange
        }}
      />
    </div>
  );
};

export default Order;
