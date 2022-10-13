import { YROUNChatClient } from "@yroun/chat";
import { useEffect, useMemo, useRef, useState } from "react";

export default () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [chatClient] = useState(new YROUNChatClient());
  const [smartcenterUuid, setSmartcenterUuid] = useState("yroun");
  // const [chatUuid, setChatUuid] = useState("sc-yroun-us-sok6lbc8q2wn");
  const [chatUuid, setChatUuid] = useState("");
  const [userUuid, setUserUuid] = useState("vb6unjqee1q1");
  const [otherUserUuid, setOtherUserUuid] = useState("sok6lbc8q2wn");
  const [otherUserApiKey, setOtherUserApiKey] = useState("");
  const [chatClients, setChatClients] = useState("");
  const [apiKey, setApiKey] = useState("qhhs8wawm0ddt4fjstd9n1icurmeds3fnnfo");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    chatClient.start({
      userUid: userUuid,
      userPasscode: apiKey,
      setLoading,
      localVideoRef,
      remoteVideoRef,
    });
  }, []);
  const emptyString = useMemo(() => {
    return "(empty)";
  }, []);
  return (
    <div>
      <div>{loading}</div>
      <div>
        API Key
        <input value={apiKey} />
      </div>
      <div style={{ margin: "14px 0 0" }}>
        smartcenter uuid
        <input defaultValue={smartcenterUuid} />
      </div>
      <div>
        user1 uuid
        <input value={userUuid} />
      </div>
      1.{" "}
      <button
        onClick={async () => {
          const res: any = await chatClient
            .createSmartcenterChat(smartcenterUuid, userUuid)
            .catch(console.error);
          const chat = res?.data || {};
          setChatUuid(chat.uid);
          await chatClient.turnChatOnByUuid(
            chat.uid,
            localVideoRef,
            remoteVideoRef
          );
        }}
      >
        get or create chat
      </button>
      <div style={{ margin: "14px", color: "red" }}>
        chat uuid : {chatUuid || emptyString}
      </div>
      <div>
        user2 uuid
        <input value={otherUserUuid} />
      </div>
      2.{" "}
      <button
        onClick={async () => {
          const res: any = await chatClient.addSmartcenterChatClient(
            chatUuid,
            otherUserUuid
          );
          const chat = res?.data || {};
          setChatClients(
            (chat.clients || []).map((client) => client.userUid).join(", ")
          );
        }}
      >
        add client
      </button>
      <div style={{ margin: "14px", color: "red" }}>
        chat clients : {chatClients || emptyString}
      </div>
      3.{" "}
      <button
        onClick={async () => {
          const res: any = await chatClient.getChatUserApiKeyForAdmin(
            smartcenterUuid,
            otherUserUuid
          );
          const othApiKey = res?.data?.value;
          setOtherUserApiKey(othApiKey);
          chatClient.start({
            userUid: otherUserUuid,
            userPasscode: othApiKey,
            setLoading,
            localVideoRef,
            remoteVideoRef,
          });
        }}
      >
        get User2 Api Key
      </button>
      <div style={{ margin: "14px", color: "red" }}>
        user2 API Key : {otherUserApiKey}
      </div>
      <div style={{ marginTop: "32px" }}>
        <button
          onClick={async () => {
            await chatClient.acceptRtc();
          }}
        >
          accept
        </button>
        <button
          onClick={async () => {
            await chatClient.declineRtc();
          }}
        >
          decline
        </button>
      </div>
      <div>Local</div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay={true}
          playsInline={true}
          width={100}
          style={{ background: "red" }}
        />
      </div>
      <div>Remote</div>
      <div>
        <video
          ref={remoteVideoRef}
          autoPlay={true}
          playsInline={true}
          width={100}
          style={{ background: "blue" }}
        />
      </div>
    </div>
  );
};
