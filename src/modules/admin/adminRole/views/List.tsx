import { Button, Descriptions, Form, Input, Select } from 'antd';
import { DGender, ItemDetail } from 'entity/member';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React, { useCallback, useState, useEffect } from 'react';
import { LabeledValue } from 'antd/lib/select';
import DateTime from 'components/DateTime';
import { connect } from 'react-redux';
import { getFormDecorators } from 'common/utils';
import styles from './index.m.less';
import useDetail from 'hooks/useDetail';
import { enumOptions } from 'common/utils';
import debounce from 'lodash/debounce';
const { Option, OptGroup } = Select;
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
interface BaseListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  categorys?: { id: string; name: string; list: string[] }[];
}
type FormData = Required<SearchRequest>;
const initialValues: Partial<FormData> = {
  username: 'admin',
};

const Component: React.FC<DispatchProp> = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<{ term: string; list: any[]; listSummary: BaseListSummary }>();
  const [fetching, setFetching] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [limit, setLimit] = useState(1)
  const [lastFetchId, setLastFetchId] = useState(0)
  useEffect(() => {

  }, []);
  const fetch = (term: string, pageCurrent = 1) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    const pageSize = this.props.pageSize || 10;
    this.props
      .fetch(term, pageSize, pageCurrent)
      .catch(() => {
        return null;
      })
      .then((result) => {
        if (fetchId !== this.lastFetchId) {
          return;
        }
        let items: { term: string; list: Resource[]; listSummary: BaseListSummary };
        if (result) {
          if (pageCurrent > 1 && this.state.items) {
            items = { ...result, list: [...this.state.items.list, ...result.list], term };
          } else {
            items = { ...result, term };
          }
          this.setState({ items, fetching: false });
        } else {
          this.setState({ fetching: false });
        }
      });
  };
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
        <Form.Item name="role" label="角色">

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
