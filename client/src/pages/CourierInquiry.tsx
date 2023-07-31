import { useEffect, useState } from "react";

import { AptosClient } from "aptos";
import type { MenuProps } from "antd";

import { Row, Col, Input } from "antd";
export const moduleAddress =
  "0xa604279e6129beb5fa225673daa13f0fa87095e9a576687d1924120a7777b2be";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
function CourierInquiry() {
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
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

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
          {" "}
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            style={{ height: "400px" }}
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </>
  );
}

export default CourierInquiry;
