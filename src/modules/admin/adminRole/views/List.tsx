import { Button, Descriptions, Form } from 'antd';
import { DGender, DStatus, ItemDetail } from 'entity/member';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

import DateTime from 'components/DateTime';
import { connect } from 'react-redux';
import { getFormDecorators } from 'common/utils';
import styles from './index.m.less';
import useDetail from 'hooks/useDetail';

export enum Status {
  '启用' = 'enable',
  '禁用' = 'disable',
}
interface SearchRequest {
  username?: string;
  nickname?: string;
  role?: { id: string; name: string };
  roleId?: string;
  email?: string;
  status?: Status;
}
type FormData = Required<SearchRequest>;
const initialValues: Partial<FormData> = {
  username: 'admin',
};
// const fromDecorators = getFormDecorators<FormData>({
//   username: { rules: [{ required: true, message: '请输入用户名!', whitespace: true }] },
// });
const Component: React.FC<DispatchProp> = () => {
  // const [form] = Form.userForm();
  return (
    <div className="g-adminPage">
      <div>ffffff</div>
    </div>
  );
};
export default connect()(React.memo(Component));
