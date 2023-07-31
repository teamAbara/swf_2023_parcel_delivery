import { useEffect, useState } from "react";
import { Divider } from "antd";

import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Layout, Row, Col, Button, Spin, List, Checkbox, Input } from "antd";
export const moduleAddress =
  "0xa604279e6129beb5fa225673daa13f0fa87095e9a576687d1924120a7777b2be";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
function Home() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [newTask, setNewTask] = useState<any>("");
  useEffect(() => {
    const genRandomKey = async () => {
      if (!account) return [];
      const todoListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::counter::Counter`
      );
      const taskCounter = (todoListResource as any).data.counter;
      setNewTask(taskCounter);
    };
    genRandomKey();
  }, [account]);
  const add = async () => {
    if (!account) return;

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::counter::plus_counter`,
      type_arguments: [],
      arguments: [],
    };
    console.log(payload);
    const response = await signAndSubmitTransaction(payload);
    console.log(response);
    await client.waitForTransaction(response.hash);
    window.location.reload();
  };
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
          <h1>홈</h1>
        </Col>
      </Row>
    </>
  );
}

export default Home;
