import { Button, Descriptions, Form, Input, Select } from 'antd';
import { DGender, ItemDetail } from 'entity/member';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

import DateTime from 'components/DateTime';
import { connect } from 'react-redux';
import { getFormDecorators } from 'common/utils';
import styles from './index.m.less';
import useDetail from 'hooks/useDetail';
import { enumOptions } from 'common/utils';

const Option = Select.Option;
enum Status {
  '启用' = 'enable',
  '禁用' = 'disable',
}
const DStatus = enumOptions(Status);
console.log(8888, DStatus)
interface SearchRequest {
  username?: string;
  nickname?: string;
  // role?: { id: string; name: string };
  // roleId?: string;
  // email?: string;
  status?: Status;
}
type FormData = Required<SearchRequest>;
const initialValues: Partial<FormData> = {
  username: 'admin',
};

const Component: React.FC<DispatchProp> = ({ dispatch }) => {
  const [form] = Form.useForm();
  const onFinish = useCallback(
    (values: FormData) => {
      console.log(8899, values)
    },
    [dispatch]
  );
  return (
    <div className="g-adminPage">
      <Form form={form} onFinish={onFinish as any} initialValues={initialValues}>
        <Form.Item name="username" label="用户名">
          <Input size="large" allowClear placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="nickname" label="呢称">
          <Input size="large" allowClear placeholder="请输入呢称" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select allowClear placeholder="请选择用户状态">
            {DStatus.options.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="btns">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default connect()(React.memo(Component));
