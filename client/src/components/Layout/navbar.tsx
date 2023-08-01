import { Layout, Row, Col } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Link } from "react-router-dom";
import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
function Navbar() {
  const [condition, setCondition] = useState<boolean>(false);
  const { account } = useWallet();
  useEffect(() => {
    if (account == null) {
      setCondition(false);
    } else {
      setCondition(true);
    }
  }, [account]);
  console.log(account?.address);
  return (
    <>
      <Layout className="layout">
        <Row align="middle" style={{ backgroundColor: "white" }}>
          <Col span={2} offset={2}>
            <Link to={"/"}>
              <img src={"/img/ujeong.jpeg"} style={{ width: "100%" }} />
            </Link>
          </Col>
          <Col span={16}>
            <Row align="middle" style={{ backgroundColor: "white" }}>
              <Col span={2} offset={1}>
                <Link to={"/InvoiceRegistration"}>
                  <h1
                    className="fonts"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    택배예약
                  </h1>
                </Link>
              </Col>{" "}
              <Col span={2} offset={1}>
                <Link to={"/CourierInquiry"}>
                  <h1
                    className="fonts"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    택배조회
                  </h1>
                </Link>
              </Col>{" "}
            </Row>
          </Col>
          <Col span={1} style={{ textAlign: "right", paddingRight: "20px" }}>
            {condition ? (
              <Link to="/MyPage">
                <Badge count={1}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </Link>
            ) : (
              <div
                onClick={e => {
                  alert("로그인을 해주세요");
                }}
              >
                <Badge count={1}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </div>
            )}
          </Col>
          <Col span={3} style={{ textAlign: "right", paddingRight: "20px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default Navbar;
