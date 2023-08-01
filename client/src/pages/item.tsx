import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moduleAddress } from "../store/module";
import { client } from "../store/client";
import type { MenuProps } from "antd";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
import QRCode from "qrcode"; // qrcode 라이브러리 불러오기

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

function Item() {
  let { id } = useParams();
  const [from_name, setFromName] = useState("");
  const [from_phone_number1, setFromPhoneNumber1] = useState("");
  const [from_phone_number2, setFromPhoneNumber2] = useState("");
  const [daumAddress, setDaumAddress] = useState("");
  const [requst, setRequest] = useState("");
  const [from_email, setFromEmail] = useState("");

  /* to  */
  const [to_name, setToName] = useState("");
  const [to_phone_number1, setToPhoneNumber1] = useState("");
  const [to_phone_number2, setToPhoneNumber2] = useState("");

  const [daumAddress2, setDaumAddress2] = useState("");
  /*물품정보 */
  const [item_name, setItemnName] = useState("");
  const [item_price, setItemPrice] = useState();
  const [item_size, setItemSize] = useState();
  const [item_kg, setItemKg] = useState();
  const [item_type, setItemType] = useState();
  const [parcel_price, setParcelPrice] = useState();
  const [tasksArr, setTaskArr] = useState<any>([]);
  const [ipfsData, setIpfsData] = useState([]);
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
      console.log(task);
      tasks.push(task);
      counter++;
    }
    setTaskArr(tasks.filter((item: any) => item?.parcel_id == id)[0]);
  };

  useEffect(() => {
    genRandomKey();
  }, [account]);

  useEffect(() => {
    const dada = async () => {
      await axios
        .get(`https://winner.mypinata.cloud/ipfs/${tasksArr.meta_data}`)
        .then(res => {
          console.log(res);
          setFromName(res?.data?.from_name);
          setFromPhoneNumber1(res.data.to_phone_number);
          setFromPhoneNumber2(res.data.to_phone_number2);
          setFromEmail(res.data.from_email);
          setDaumAddress(res.data.from_address);
          setRequest(res.data.request);
          setToName(res.data.to_name);
          //
          setToPhoneNumber1(res.data.from_phone_number);
          setToPhoneNumber2(res.data.from_phone_number2);
          setDaumAddress2(res.data.to_address);
          //
          setItemnName(res.data.item_name);
          setText(res.data);
        });
    };
    dada();
  }, [tasksArr]);
  const [text, setText] = useState({});
  const [qrCodeData, setQRCodeData] = useState("");

  const generateQRCode = async () => {
    try {
      // QR 코드 생성

      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(text));
      setQRCodeData(qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  console.log(tasksArr);
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
          <h1>택배</h1>
        </Col>
      </Row>
      <Row
        style={{
          textAlign: "left",
          backgroundColor: "white",
        }}
      >
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 보낸사람:{from_name}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />

        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}>
            {" "}
            보낸사람핸드폰번호:{from_phone_number1}
          </h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}>
            {" "}
            보낸사람핸드폰번호2:{from_phone_number2}
          </h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 보낸사람주소:{daumAddress}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 보낸사람이메일:{from_email}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 보낸사람요구사항:{requst}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}>받는사람이름:{to_name}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}>
            {" "}
            받는사람폰번호:{to_phone_number1}
          </h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}>
            {" "}
            받는사람폰번호2:{to_phone_number2}
          </h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 받는사람주소:{daumAddress2}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontSize: "25px" }}> 물품이름:{item_name}</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} />
      </Row>
      <Row style={{ textAlign: "center", backgroundColor: "white" }}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} />

        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Button onClick={generateQRCode}>Generate QR Code</Button>
          {qrCodeData && <img src={qrCodeData} width="100%" alt="QR Code" />}
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} />
      </Row>
    </>
  );
}

export default Item;
