import React from "react";
import { Button, message } from "antd";
import ClipboardJS from "clipboard";
import { Typography } from "antd";

const CopyButton = ({ textToCopy }: any) => {
  // 클립보드 객체 생성
  const { Text } = Typography;

  const clipboard = new ClipboardJS(".copy-button", {
    text: () => textToCopy,
  });

  // 복사가 성공적으로 완료될 때의 처리
  clipboard.on("success", () => {
    message.success("주소가 복사되었습니다.");
    clipboard.destroy(); // 클립보드 객체 해제
  });

  // 복사 실패 시 처리
  clipboard.on("error", () => {
    message.error("복사를 실패했습니다.");
    clipboard.destroy(); // 클립보드 객체 해제
  });

  return (
    <Button
      className="copy-button"
      size="large"
      data-clipboard-text={textToCopy}
      style={{ width: "100", textOverflow: "ellipsis" }}
    >
      <Text
        className="text-with-ellipsis"
        style={{
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%" /* 원하는 최대 너비를 설정하세요. */,
        }}
      >
        {textToCopy}
      </Text>
    </Button>
  );
};

export default CopyButton;
