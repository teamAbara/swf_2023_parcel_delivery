import { useEffect, useState } from "react";
import { Divider } from "antd";
import ClipboardJS from "clipboard";
import CopyButton from "../components/copy";
import { AptosClient } from "aptos";
import { Tabs } from "antd";
import { moduleAddress } from "../store/module";
import { client } from "../store/client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import * as p from "@movingco/prelude";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  Layout,
  Row,
  Col,
  Button,
  Spin,
  List,
  Checkbox,
  Input,
  Avatar,
  Badge,
  Space,
} from "antd";

function MyPage() {
  const { account } = useWallet();
  const v = [{ header: "보낸 택배" }, { header: "받은 택배" }];
  const [tasksArr, setTaskArr] = useState<any>([]);
  const [to_addresses, setToAddresses] = useState<DataType[]>([]);
  const [from_addresses, setfromAddresses] = useState<DataType[]>([]);
  /*  from */
  interface DataType {
    key: string;
    parcel_id: string;
    from_address: string;
    to_address: string;
    parcel_progress: String;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "parcel_id",
      key: "parcel_id",
      render: text => <a>{text}</a>,
    },

    {
      title: "보내는사람",
      dataIndex: "from_address",
      key: "from_address",
    },
    {
      title: "받는사람",
      dataIndex: "to_address",
      key: "to_address",
    },
    {
      title: "현황",
      dataIndex: "parcel_progress",
      key: "parcel_progress",
      render: text => (
        <a>
          {text == "1"
            ? "집화처리"
            : text == "2"
            ? "간선상차"
            : text == "3"
            ? "간선하차"
            : text == "4"
            ? "배송출고"
            : text == "5"
            ? "배송완료"
            : null}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (i, record) => (
        <Space size="middle">
          <a href={`/item/${record.parcel_id}`}>상세보기</a>
        </Space>
      ),
    },
  ];

  const { signAndSubmitTransaction } = useWallet();

  const genRandomKey = async () => {
    if (!account) return [];

    const todoListResource = await client.getAccountResource(
      moduleAddress,
      `${moduleAddress}::example::ParcelList`
    );
    const taskCounter = (todoListResource as any).data?.parcel_counter;
    console.log(taskCounter);
    const tableHandle = (todoListResource as any).data.parcels.handle;
    let tasks = [];
    let counter = 1;
    while (counter <= taskCounter) {
      const tableItem = {
        key_type: "u64",
        value_type: `${moduleAddress}::example::Parcel`,
        key: `${counter}`,
      };
      const task = await client.getTableItem(tableHandle, tableItem);
      console.log(task);
      tasks.push(task);
      counter++;
    }
    setTaskArr(tasks);

    // console.log(taskCounter);
  };
  useEffect(() => {
    genRandomKey();
  }, []);
  console.log(tasksArr);
  useEffect(() => {
    if (!account) return;
    const from_arr = tasksArr.filter(
      (item: any) =>
        item.from_address == p.serializers.hexString(account?.address)
    );
    console.log(from_arr);
    const to_arr = tasksArr.filter(
      (item: any) =>
        item.to_address == p.serializers.hexString(account?.address)
    );
    setToAddresses(to_arr);
    setfromAddresses(from_arr);
  }, [tasksArr]);
  return (
    <>
      <Row style={{ textAlign: "center", backgroundColor: "white" }}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ fontSize: "30px" }}
        >
          <h1>마이페이지</h1>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} />
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <img
            src="/img/profile.jpeg"
            style={{ width: "100%", borderRadius: "10%" }}
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <CopyButton textToCopy={account?.address} />
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} />
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Tabs
            defaultActiveKey="1"
            centered
            items={v.map((item, i) => {
              const id = String(i + 1);
              return {
                label: `${item.header}`,
                key: id,
                children: (
                  <div>
                    {item.header == "보낸 택배" ? (
                      <>
                        <Table columns={columns} dataSource={from_addresses} />
                      </>
                    ) : (
                      <>
                        <Table columns={columns} dataSource={to_addresses} />
                      </>
                    )}
                  </div>
                ),
              };
            })}
          />
        </Col>
      </Row>
    </>
  );
}

export default MyPage;
