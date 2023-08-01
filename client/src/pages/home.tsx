import * as p from "@movingco/prelude";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Layout, Row, Col, Button, Spin, List, Checkbox, Input } from "antd";
import { moduleAddress } from "../store/module";
import { client } from "../store/client";
import axios from "axios";
function Home() {
  const { account, signAndSubmitTransaction } = useWallet();
  const update = async () => {
    if (!account) return;

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::example::update_list`,
      type_arguments: [],
      arguments: [p.serializers.hexString(moduleAddress), 1],
    };

    const response = await signAndSubmitTransaction(payload);
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
          <a href="/InvoiceRegistration">
            <Button size="large">택배 예약하러가기</Button>
          </a>
        </Col>
      </Row>
    </>
  );
}

export default Home;
