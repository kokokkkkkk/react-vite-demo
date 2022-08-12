import PropTypes from 'prop-types';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import { localGet } from '@/utils';

const UploadImg = (props) => {
  const { value, onChange } = props;
  const [loading, setLoading] = useState(false);

  const handleBefor = (file) => {
    const arr = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!arr.includes(file.type)) {
      message.error('只支持 png / jpg / jpeg 图片');
      // console.log(file);
      return Promise.reject(file);
    }
    return Promise.resolve(file);
  };

  const handleChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (file.status === 'done') {
      const { data } = file.response;
      setLoading(false);
      onChange(data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </div>
  );

  return (
    <div className="upload_img">
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        action="http://backend-api-02.newbee.ltd/manage-api/v1/upload/file"
        onChange={handleChange}
        beforeUpload={handleBefor}
        headers={{ token: localGet('token') }}>
        {value ? (
          <img
            src={value}
            alt="avatar"
            style={{
              width: '100%'
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

UploadImg.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

UploadImg.defaultProps = {
  onChange: () => {},
  value: ''
};

export default UploadImg;
