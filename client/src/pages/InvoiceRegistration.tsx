import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Divider } from "antd";

import { AptosClient } from "aptos";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";

import {
  Row,
  Col,
  Button,
  Spin,
  List,
  Checkbox,
  Input,
  Modal,
  InputNumber,
  Select,
} from "antd";
export const moduleAddress =
  "0xa604279e6129beb5fa225673daa13f0fa87095e9a576687d1924120a7777b2be";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
function InvoiceRegistration() {
  const { TextArea } = Input;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          onClick={e => {
            setFromEmail2("naver.com");
          }}
          rel="noopener noreferrer"
        >
          naver.com
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          onClick={e => {
            setFromEmail2("gmail.com");
          }}
          rel="noopener noreferrer"
        >
          gmail.com
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          onClick={e => {
            setFromEmail2("daum.net");
          }}
          rel="noopener noreferrer"
        >
          daum.net
        </a>
      ),
    },
  ];

  /*  from */
  const [from_name, setFromName] = useState("");
  const [from_phone_number1_1, setFromPhoneNumber1_1] = useState("010");
  const [from_phone_number1_2, setFromPhoneNumber1_2] = useState("");
  const [from_phone_number1_3, setFromPhoneNumber1_3] = useState("");
  const [from_phone_number2_1, setFromPhoneNumber2_1] = useState("");
  const [from_phone_number2_2, setFromPhoneNumber2_2] = useState("");
  const [from_phone_number2_3, setFromPhoneNumber2_3] = useState("");
  const [daumAddress, setDaumAddress] = useState("");

  const [from_email, setFromEmail] = useState("");
  const [from_email2, setFromEmail2] = useState("");

  /* to  */
  const [to_name, setToName] = useState("");
  const [to_phone_number1_1, setToPhoneNumber1_1] = useState("");
  const [to_phone_number1_2, setToPhoneNumber1_2] = useState("");
  const [to_phone_number1_3, setToPhoneNumber1_3] = useState("");
  const [to_phone_number2_1, setToPhoneNumber2_1] = useState("");
  const [to_phone_number2_2, setToPhoneNumber2_2] = useState("");
  const [to_phone_number2_3, setToPhoneNumber2_3] = useState("");

  const [daumAddress2, setDaumAddress2] = useState("");
  /*물품정보 */
  const [box_name, setBoxName] = useState("");
  const [box_num, setBoxNum] = useState();
  /* */

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onCompletePost = (data: any) => {
    setDaumAddress(data.address);

    setOpen(false);
  };
  const onCompletePost2 = (data: any) => {
    setDaumAddress2(data.address);

    setOpen2(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const showModal2 = () => {
    setOpen2(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onChange = (value: number) => {
    console.log("changed", value);
  };
  const [value, setValue] = useState<string | number | null>("99");

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
          <h1>택배예약</h1>
        </Col>
        <Col xs={10} />
        <Col xs={4}>
          <img src={"/img/ujeong.jpeg"} style={{ width: "100%" }} />
        </Col>
        <Col xs={10} />
        <Divider plain style={{ fontSize: "25px" }}>
          보내는 분
        </Divider>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={{ textAlign: "center", alignItems: "top" }}
        >
          <h1>이름:</h1>
        </Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Input
            size="large"
            onChange={e => {
              setFromName(e.target.value);
            }}
          />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>연락처1</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber1_1(e.target.value);
            }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber1_2(e.target.value);
            }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber1_3(e.target.value);
            }}
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>연락처2</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber2_1(e.target.value);
            }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber2_2(e.target.value);
            }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setFromPhoneNumber2_3(e.target.value);
            }}
          />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>주소</h1>
        </Col>
        <Col xs={9} sm={9} md={9} lg={9} xl={9}>
          <Input size="large" value={daumAddress} />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          {" "}
          <Button style={{ width: "90%" }} onClick={showModal}>
            주소찾기
          </Button>
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>이메일:</h1>
        </Col>
        <Col xs={5} sm={5} md={5} lg={5} xl={5}>
          <Input
            size="large"
            onChange={e => {
              setFromEmail(e.target.value);
            }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          @
        </Col>
        <Col xs={5} sm={5} md={5} lg={5} xl={5}>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button style={{ width: "100%" }}>{`${from_email2}`}</Button>
          </Dropdown>
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>요청사항</h1>
        </Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <TextArea rows={4} />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
        <Divider plain style={{ fontSize: "25px", marginTop: "150px" }}>
          받는 분
        </Divider>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>이름</h1>
        </Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Input size="large" />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7} />
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>연락처</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber1_1(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber1_2(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber1_3(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>연락처2</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber2_1(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber2_2(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>-</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            size="large"
            onChange={e => {
              setToPhoneNumber2_3(e.target.value);
            }}
          />{" "}
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>주소</h1>
        </Col>
        <Col xs={9} sm={9} md={9} lg={9} xl={9}>
          <Input size="large" value={daumAddress2} />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          {" "}
          <Button style={{ width: "90%" }} onClick={showModal2}>
            주소찾기
          </Button>
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7} />
        <Divider plain style={{ fontSize: "25px", marginTop: "150px" }}>
          물품정보
        </Divider>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>물품명</h1>
        </Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Input size="large" />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>박스 수량</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            size="large"
            max={10}
            value={value}
            onChange={setValue}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1 style={{ fontSize: "25px" }}> BOX</h1>
        </Col>
        <Col xs={14} sm={14} md={14} lg={14} xl={14}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>물품가격</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input size="large" />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>원</h1>
        </Col>
        <Col xs={14} sm={14} md={14} lg={14} xl={14}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>물품크기</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            size="large"
            max={10}
            value={value}
            onChange={setValue}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>cm</h1>
        </Col>{" "}
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            size="large"
            max={10}
            value={value}
            onChange={setValue}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>cm</h1>
        </Col>{" "}
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            size="large"
            max={10}
            value={value}
            onChange={setValue}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1>cm</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>무게</h1>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            size="large"
            max={10}
            value={value}
            onChange={setValue}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <h1 style={{ fontSize: "25px" }}> KG</h1>
        </Col>
        <Col xs={14} sm={14} md={14} lg={14} xl={14}></Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h1>우임구분</h1>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Select
            defaultValue="선불"
            style={{ width: "100%" }}
            options={[
              { value: "선불", label: "선불" },
              { value: "착불", label: "착불" },
            ]}
          />
        </Col>
        <Col xs={14} sm={14} md={14} lg={14} xl={14}></Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1>유의사항</h1>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Button size="large" type="primary" style={{ width: "100%" }}>
            등록하기
          </Button>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
      </Row>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <DaumPostcode autoClose={false} onComplete={onCompletePost} />
      </Modal>
      <Modal
        open={open2}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <DaumPostcode autoClose={false} onComplete={onCompletePost2} />
      </Modal>
    </>
  );
}

export default InvoiceRegistration;
