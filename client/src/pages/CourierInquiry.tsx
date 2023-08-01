import { useEffect, useState } from "react";
import { moduleAddress } from "../store/module";
import { client } from "../store/client";
import { AptosClient } from "aptos";
import type { MenuProps } from "antd";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { Row, Col, Input } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
function CourierInquiry() {
  const [task, setTask] = useState<DataType[]>([]);
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

  const [tasksArr, setTaskArr] = useState<any>([]);

  const { account, signAndSubmitTransaction } = useWallet();
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
      tasks.push(task);
      counter++;
    }
    setTask(tasks);

    // console.log(taskCounter);
  };
  useEffect(() => {
    genRandomKey();
  }, [account]);
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
          <h1>택배조회</h1>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table columns={columns} dataSource={task} />
        </Col>
      </Row>
    </>
  );
}

export default CourierInquiry;
