import { Button, Table, Image, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import axios from '@/api';

// createTime: "2022-08-11 20:32:24"
// createUser: 0
// goodsCarousel: "/admin/dist/img/no-img.png"
// goodsCategoryId: 1991
// goodsCoverImg: "http://backend-api-02.newbee.ltd/upload/20220811_20321668.png"
// goodsDetailContent: null
// goodsId: 15860
// goodsIntro: "达瓦达瓦1"
// goodsName: "达瓦"
// goodsSellStatus: 0
// originalPrice: 1321
// sellingPrice: 4234
// stockNum: 123
// tag: "阿斯顿"
// updateTime: "2022-08-12 13:23:06"
// updateUser: 0

const Good = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableList, setTableList] = useState({ list: [], totalCount: 0 });
  const [setTabcofing, setSetTabcofing] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGood = async () => {
      setLoading((state) => !state);
      await axios
        .get('/goods/list', {
          params: {
            ...setTabcofing
          }
        })
        .then((res) => {
          const { list, totalCount } = res;
          setTableList({ list, totalCount });
          setLoading((state) => !state);
          console.log(res);
        });
    };
    fetchGood();
  }, [setTabcofing]);

  useEffect(() => {
    console.log(tableList, '---tableList');
  }, [tableList]);
  useEffect(() => {
    console.log(setTabcofing);
  }, [setTabcofing]);

  const columns = useMemo(() => {
    console.log('memo');
    return [
      {
        width: '200px',
        align: 'center',
        title: '商品编号',
        dataIndex: 'goodsId',
        key: 'goodsId'
      },
      {
        width: '200px',
        align: 'center',
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName'
      },
      {
        width: '200px',
        align: 'center',
        title: '商品简介',
        dataIndex: 'goodsIntro',
        key: 'goodsIntro'
      },
      {
        width: '200px',
        align: 'center',
        title: '商品图片',
        key: 'goodsCoverImg',
        render: (_, row) => {
          return (
            <div>
              <Image src={row.goodsCoverImg} preview={false} style={{ width: '100px', height: '100px' }}></Image>
            </div>
          );
        }
      },
      {
        width: '200px',
        align: 'center',
        title: '商品库存',
        dataIndex: 'stockNum',
        key: 'stockNum'
      },
      {
        width: '200px',
        align: 'center',
        title: '商品售价',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice'
      },
      {
        width: '200px',
        align: 'center',
        title: '上架状态',
        key: 'sellingPrice',
        render: (_, row) => {
          return (
            <div style={{ color: row.goodsSellStatus === 0 ? 'green' : 'red' }}>
              {row.goodsSellStatus === 0 ? '销售中' : '已下架'}
            </div>
          );
        }
      },
      {
        title: '操作',
        key: '操作',
        width: '200px',
        align: 'center',
        render: (_, row) => {
          return (
            <div>
              <Button type="link">修改</Button>
              {row.goodsSellStatus === 0 ? (
                <Button type="link" onClick={() => handleStatus(row.goodsId, 1)}>
                  {' '}
                  下架{' '}
                </Button>
              ) : (
                <Button type="link" onClick={() => handleStatus(row.goodsId, 0)}>
                  {' '}
                  上架{' '}
                </Button>
              )}
            </div>
          );
        }
      }
    ];
  }, [tableList]);

  // 表头
  const randerHader = () => {
    return <Button>添加商品</Button>;
  };
  // 分页器
  const paginationChange = (pageNumber, pageSize) => {
    setSetTabcofing({
      pageNumber,
      pageSize
    });
  };

  const sizeChange = (_, pageSize) => {
    setSetTabcofing({
      pageNumber: 1,
      pageSize
    });
  };

  // 当前选中行
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 上下架
  const handleStatus = (id, status) => {
    console.log(id, status);
    axios
      .put(`/goods/status/${status}`, {
        ids: id ? [id] : []
      })
      .then(() => {
        message.success('修改成功');
        setSetTabcofing((state) => {
          return { ...state };
        });
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <div>
      <Table
        rowKey="goodsId"
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableList.list}
        title={() => randerHader()}
        pagination={{
          total: tableList.totalCount,
          current: setTabcofing.pageNumber,
          pageSize: setTabcofing.pageSize,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: paginationChange,
          onShowSizeChange: sizeChange
        }}
      />
    </div>
  );
};

export default Good;
