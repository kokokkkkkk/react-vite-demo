import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import WangEditor from 'wangeditor';
import { Form, Cascader, Input, InputNumber, Radio, Button, message } from 'antd';
import axios from '@/api';
import UploadImg from '@/components/uploadImg';
const { TextArea } = Input;

import { localGet, hasEmoji } from '@/utils';

const defaultFormData = {
  goodsIntro: '',
  goodsName: '',
  goodsSellStatus: 0,
  originalPrice: '',
  sellingPrice: '',
  stockNum: '',
  tag: '',
  editor: '1231',
  current: ''
};

const GoodAdd = () => {
  const styleWidth = { width: '300px' };
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const id = search.get('id');
  const [options, setOptions] = useState([]);
  const [current, setCurrent] = useState(null);
  const editor = useRef(null);
  const wangeditor = useRef(null);

  const fetchOptions = async (level = 1, id) => {
    try {
      let res = await axios.get('/categories', {
        params: {
          pageNumber: 1,
          pageSize: 10,
          categoryLevel: level,
          parentId: 0
        }
      });
      if (!res.list) {
        throw res;
      }
      console.log('2----2');
      const { list } = res;
      const option = list.map((item) => ({
        value: item.categoryId,
        label: item.categoryName,
        isLeaf: false,
        current: 1
      }));
      setOptions(option);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    wangeditor.current = new WangEditor(editor.current);
    wangeditor.current.config.showLinkImg = false;
    wangeditor.current.config.showLinkImgAlt = false;
    wangeditor.current.config.showLinkImgHref = false;
    wangeditor.current.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    wangeditor.current.config.uploadFileName = 'file';
    wangeditor.current.config.uploadImgHeaders = {
      token: localGet('token') || ''
    };
    // 图片返回格式不同，需要自定义返回格式
    wangeditor.current.config.uploadImgHooks = {
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        console.log('result', result);
        // result 即服务端返回的接口
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        if (result.data && result.data.length) {
          result.data.forEach((item) => insertImgFn(item));
        }
      }
    };
    wangeditor.current.config.uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'; //上传地址
    Object.assign(wangeditor.current.config, {
      onchange(value) {
        console.log('change');
      }
    });
    wangeditor.current.create();
    console.log(wangeditor);
    return () => {
      wangeditor.current = null;
    };
  }, []);

  useEffect(() => {
    console.log(1, '1---');
    fetchOptions();
    console.log(3, '3---');
    if (id) {
      axios.get(`/goods/${search.get('id')}`).then((res) => {
        const { goods, firstCategory, secondCategory, thirdCategory } = res;
        form.setFieldsValue({
          goodsName: goods.goodsName,
          goodsIntro: goods.goodsIntro,
          originalPrice: goods.originalPrice,
          sellingPrice: goods.sellingPrice,
          stockNum: goods.stockNum,
          goodsSellStatus: goods.goodsSellStatus,
          goodsCoverImg: goods.goodsCoverImg,
          tag: goods.tag,
          categoryId: goods.goodsCategoryId,
          current: `${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`
        });
        if (wangeditor.current) {
          wangeditor.current.txt.html(goods.goodsDetailContent);
        }
        setCurrent(goods.goodsCategoryId);
      });
    }
  }, []);

  const onChange = (value, selectedOptions) => {
    if (value && selectedOptions) {
      const id = value[value.length - 1] || 0;
      setCurrent(id);
    } else {
      setCurrent('');
    }
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { current, value } = targetOption;
    targetOption.loading = true; // load options lazily
    axios
      .get('/categories', {
        params: {
          pageNumber: 1,
          pageSize: 1000,
          categoryLevel: current + 1,
          parentId: value
        }
      })
      .then((res) => {
        targetOption.loading = false;
        const { list } = res;
        if (!list.length) {
          targetOption.disabled = true;
        }
        const children = list.map((item) => ({
          value: item.categoryId,
          label: item.categoryName,
          isLeaf: current > 1,
          current: current + 1
        }));
        targetOption.children = children;
        setOptions([...options]);
      });
  };

  const onFinish = (values) => {
    console.log(values);
    let httpOption = axios.post;
    let params = {
      goodsCategoryId: current,
      goodsDetailContent: wangeditor.current.txt.html(),
      ...values
    };
    if (
      hasEmoji(params.goodsIntro) ||
      hasEmoji(params.goodsName) ||
      hasEmoji(params.tag) ||
      hasEmoji(params.goodsDetailContent)
    ) {
      message.error('不要输入表情包，再输入就打死你个龟孙儿~');
      return;
    }
    if (params.goodsName.length > 128) {
      message.error('商品名称不能超过128个字符');
      return;
    }
    if (params.goodsIntro.length > 200) {
      message.error('商品简介不能超过200个字符');
      return;
    }
    if (params.tag.length > 16) {
      message.error('商品标签不能超过16个字符');
      return;
    }
    if (id) {
      params.goodsId = id;
      // 修改商品使用 put 方法
      httpOption = axios.put;
    }
    httpOption('/goods', params).then(() => {
      message.success(id ? '修改成功' : '添加成功');
      navigate('/module/good', { replace: true });
      form.resetFields();
      wangeditor.current.txt.clear();
    });
  };
  return (
    <div className="goodAdd" style={{ backgroundColor: '#fff', padding: '20px' }}>
      <Form
        form={form}
        labelCol={{
          span: 3
        }}
        wrapperCol={{
          span: 21
        }}
        onFinish={onFinish}
        initialValues={{ ...defaultFormData }}>
        <Form.Item label="商品分类" name="current" rules={[{ required: true, message: '商品分类必填选项!' }]}>
          <Cascader options={options} loadData={loadData} onChange={onChange} style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品名称" name="goodsName" rules={[{ required: true, message: '商品名称必填!' }]}>
          <Input placeholder="请输入商品名称" style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品简介" name="goodsIntro" rules={[{ required: true, message: '商品简介必填!' }]}>
          <TextArea placeholder="请输入商品简介" style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品价格" name="originalPrice" rules={[{ required: true, message: '商品价格必填!' }]}>
          <InputNumber placeholder="请输入商品价格" style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品售卖价格" name="sellingPrice" rules={[{ required: true, message: '商品售卖价格必填!' }]}>
          <InputNumber placeholder="商品售卖价格" style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品库存" name="stockNum" rules={[{ required: true, message: '商品库存必填!' }]}>
          <InputNumber placeholder="商品库存" style={styleWidth} />
        </Form.Item>
        <Form.Item label="商品标签" name="tag" rules={[{ required: true, message: '商品标签必填!' }]}>
          <Input placeholder="请输入商品小标签" style={styleWidth} />
        </Form.Item>
        <Form.Item label="上下架状态" name="goodsSellStatus">
          <Radio.Group>
            <Radio value={0}>上架</Radio>
            <Radio value={1}>下架</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="商品主图" name="goodsCoverImg" rules={[{ required: true, message: '商品主图必填!' }]}>
          <UploadImg />
        </Form.Item>
        <Form.Item label="详情内容" rules={[{ required: true, message: '详情内容必填!' }]}>
          <div ref={editor}></div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit">
            {id ? '立即修改' : '立即提交'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GoodAdd;
