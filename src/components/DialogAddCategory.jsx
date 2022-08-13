import PropTypes from 'prop-types';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useEffect } from 'react';

import axios from '@/api';
import UploadImg from './uploadImg';

const DialogAddCategory = (props) => {
  const { dialog, onAdd } = props;
  const [form] = Form.useForm();
  const forminitVal = {
    carouselUrl: '',
    redirectUrl: '',
    carouselRank: ''
  };
  useEffect(() => {
    const getDetail = async () => {
      try {
        if (dialog.id) {
          const res = await axios.get(`/carousels/${dialog.id}`);
          if ((!res.carouselUrl, !res.redirectUrl, !res.carouselRank)) {
            throw res;
          }
          const { carouselUrl, redirectUrl, carouselRank } = res;
          form.setFieldsValue({ carouselUrl, redirectUrl, carouselRank });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDetail();
  }, [dialog.id]);

  useEffect(() => {
    console.log(forminitVal, '----forminitVal');
  }, [forminitVal]);

  // 确定
  const handleOk = () => {
    const fetch = () => {
      const formData = form.getFieldsValue();
      if (dialog.type) {
        axios
          .post('/carousels', {
            ...formData
          })
          .then(() => {
            message.success('添加成功');
            form.resetFields();
            onAdd();
          });
      } else {
        axios
          .put('/carousels', {
            carouselId: dialog.id,
            ...formData
          })
          .then(() => {
            message.success('修改成功');
            form.resetFields();
            onAdd();
          });
      }
    };
    fetch();
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    onAdd();
  };

  return (
    <div className="dialog">
      <Modal
        width={400}
        title={dialog.type ? '添加轮播图' : '修改轮播图'}
        visible={dialog.flag}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form initialValues={forminitVal} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
          <Form.Item name="carouselUrl" label="商品图片" rules={[{ required: true, message: '商品图片是必填字段' }]}>
            <UploadImg />
          </Form.Item>
          <Form.Item name="redirectUrl" label="跳转链接" rules={[{ required: true, message: '跳转链接是必填信息!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="carouselRank" label="排序值" rules={[{ required: true, message: '排序值是必填信息!' }]}>
            <InputNumber min={1} max={200} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

DialogAddCategory.propTypes = {
  onAdd: PropTypes.func,
  dialog: PropTypes.object
};

DialogAddCategory.defaultProps = {
  onAdd: () => {},
  dialog: {}
};
export default DialogAddCategory;
