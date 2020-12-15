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
import api from '../api';
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
  const [fetching, setFetching] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [limit, setLimit] = useState<number>(1)
  const [lastFetchId, setLastFetchId] = useState<number>(0)
  useEffect(() => {
    fetch = debounce(fetch, 1000);
    popupScroll = debounce(popupScroll, 300);
  }, []);
  let fetch = (term: string, pageCurrent: number = 1) => {
    alert(2)
    console.log(6666, term, pageSize, pageCurrent)
    let tempFetchId = lastFetchId + 1;
    setLastFetchId(tempFetchId)
    const fetchId = lastFetchId;
    useCallback((term, pageSize, pageCurrent) => {
      api.searchList({ term, pageSize, pageCurrent }).then((result) => {
        if (fetchId !== lastFetchId) {
          return;
        }
        if (result) {
          let temp: { term: string; list: any[]; listSummary: BaseListSummary };
          if (pageCurrent > 1 && items) {
            temp = { ...result, list: [...items.list, ...result.list], term };
          } else {
            temp = { ...result, term };
          }
          setItems(temp)
          setFetching(false)
        } else {
          setFetching(false)
        }
      });
    }, [])
  };
  onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    popupScroll(e.target as HTMLDivElement);
  };
  popupScroll = (target: HTMLDivElement) => {
    if (items && !fetching && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const {
        term,
        listSummary: { pageCurrent, totalPages },
      } = items;
      if (pageCurrent < totalPages) {
        this.setState({ fetching: true });
        this.fetch(term, pageCurrent + 1);
      }
    }
  }
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
