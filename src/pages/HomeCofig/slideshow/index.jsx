import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { Button, Table, Image, message, Popconfirm } from 'antd'
import DialogAddCategory from '@/components/DialogAddCategory'
import axios from '@/api'

// carouselId: 1080
// carouselRank: 200
// carouselUrl: "http://backend-api-02.newbee.ltd/upload/20220406_16430472.png"
// createTime: "2022-04-06 16:43:53"
// createUser: 0
// isDeleted: 0
// redirectUrl: "http://du.com"
// updateTime: "2022-08-11 09:35:08"
// updateUser: 0

const Slideshow = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableList, setTableList] = useState({ list: [], totalCount: 0 })
  const [setTabcofing, setSetTabcofing] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [loading, setLoading] = useState(false)
  const [isDialog, setIsDialog] = useState({
    flag: false,
    type: true,
    id: ''
  })

  useEffect(() => {
    const fetchTabList = async () => {
      setLoading(state => !state)
      axios.get('/carousels', {
        params: {
          pageNumber: setTabcofing.pageNumber,
          pageSize: setTabcofing.pageSize
        }
      }).then(res => {
        const { list, totalCount } = res
        setTableList({ list, totalCount })
        setLoading(state => !state)
      })
    }
    fetchTabList()
  }, [setTabcofing])
  const columns = useMemo(() => {
    return (
      [
        {
          title: '轮播图',
          key: 'carouselId',
          render: (_, row) => {
            return (
              <div>
                <Image src={row.carouselUrl} preview={false} style={{ width: '150px', height: '150px' }}></Image>
              </div>
            )
          }
        },
        {
          title: '跳转连接',
          // dataIndex: 'redirectUrl',
          key: 'redirectUrl',
          render: (_, row) => {
            return (
              <a href={row.redirectUrl}>{ row.redirectUrl }</a>
            )
          }
        },
        {
          title: '排序值',
          dataIndex: 'carouselRank',
          key: 'carouselRank'
        },
        {
          title: '添加时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: (a, b) => moment(a.createTime).unix() - moment(b.createTime).unix()
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          sorter: (a, b) => moment(a.updateTime).unix() - moment(b.updateTime).unix()
        },
        {
          title: '操作',
          key: '操作',
          render: (_, row) => {
            return (
              <div className="operation">
                <Button type='link' onClick={() => Add('show', row.carouselId)}>修改</Button>
                <Popconfirm
                  title="您确定要删除吗?"
                  okText="确定"
                  cancelText="取消"
                  placement="top"
                  onConfirm={() => handleDeleteOne(row.carouselId)}
                >
                <Button type='link'>删除</Button>
                </Popconfirm>
              </div>
            )
          }
        }
      ]
    )
  }, [tableList])

  // 分页器
  const paginationChange = (pageNumber, pageSize) => {
    setSetTabcofing({
      pageNumber,
      pageSize
    })
  }

  const sizeChange = (_, pageSize) => {
    setSetTabcofing({
      pageNumber: 1,
      pageSize
    })
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  // 当前选中行
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  // Add 控制对话框是否显示
  const Add = (type, id) => {
    console.log(id, '--id')
    if (type === 'show') {
      setIsDialog({ flag: true, type: true, id: id || '' })
    } else {
      setIsDialog({ flag: false, type: true, id: '' })
      setTabcofing(state => { return { ...state } })
    }
  }

  // 单删
  const handleDeleteOne = (id) => {
    axios.delete('/carousels', {
      data: {
        ids: [id]
      }
    }).then(() => {
      message.success('删除成功')
      setTableList(state => { return { ...state } })
    })
  }
  // 多删
  const handleDelete = () => {
    if (!selectedRowKeys.length) {
      return message.error('请先选择')
    }
    axios.delete('/carousels', {
      data: {
        ids: setSelectedRowKeys
      }
    }).then(() => {
      message.success('删除成功')
      setTableList(state => { return { ...state } })
    })
    setSelectedRowKeys([])
  }

  return (
    <div className="slideshow">
      <div className="slideshow_header">
        <Button type="primary" onClick={() => Add('show')}>增加</Button>
        <Button onClick={() => handleDelete()}>批量删除</Button>
      </div>
      <div className="slideshow_content">
        <Table
          rowSelection={rowSelection}
          loading={loading}
          position={['bottomCenter']}
          rowKey='carouselId'
          columns={columns}
          dataSource={tableList.list}
          pagination={{
            total: tableList.totalCount,
            current: setTabcofing.pageNumber,
            pageSize: setTabcofing.pageSize,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: paginationChange,
            onShowSizeChange: sizeChange
          }}
        />
        <DialogAddCategory dialog={isDialog} onAdd={Add}></DialogAddCategory>
      </div>
    </div>
  )
}

export default Slideshow
