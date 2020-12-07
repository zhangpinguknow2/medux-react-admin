import {Button, Descriptions} from 'antd';
import {DGender, DStatus, ItemDetail} from 'entity/member';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';

import DateTime from 'components/DateTime';
import React from 'react';
import {connect} from 'react-redux';
import useDetail from 'hooks/useDetail';
import styles from './index.m.less';

const Component: React.FC<> = () => {
  return (
    <div className="g-adminPage">
      <div>ffffff</div>
    </div>
  );
};
export default connect()(React.memo(Component));
