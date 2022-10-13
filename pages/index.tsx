import { YROUNChatClient } from "@yroun/chat";
import { useEffect, useMemo, useRef, useState } from "react";

export default () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [chatClient] = useState(new YROUNChatClient());
  const [smartcenterUuid, setSmartcenterUuid] = useState("yroun");
  // const [chatUuid, setChatUuid] = useState("sc-yroun-us-sok6lbc8q2wn");
  const [apiKey, setApiKey] = useState("qdq000anq051qxw4x91vd10kvf0waadnr2w5");
  const [userUuid, setUserUuid] = useState("1hruaa2t830hd");
  const [otherUserUuid, setOtherUserUuid] = useState("1ji50k1692jw4");
  const [chatUuid, setChatUuid] = useState("");
  const [chatClients, setChatClients] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    chatClient.start({
      userUid: userUuid,
      userPasscode: apiKey,
      setLoading,
      localVideoRef,
      remoteVideoRef,
    });
  }, [userUuid, apiKey]);
  const emptyString = useMemo(() => {
    return "(empty)";
  }, []);
  return (
    <div>
      <div>{loading}</div>
      <div>
        API Key
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div style={{ margin: "14px 0 0" }}>
        smartcenter uuid
        <input
          defaultValue={smartcenterUuid}
          onChange={(e) => setSmartcenterUuid(e.target.value)}
        />
      </div>
      <div>
        user1 uuid
        <input value={userUuid} onChange={(e) => setUserUuid(e.target.value)} />
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
        <input
          value={otherUserUuid}
          onChange={(e) => setOtherUserUuid(e.target.value)}
        />
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
      <div style={{ marginTop: "32px" }}>
        <button
          onClick={async () => {
            await chatClient.callRtc();
          }}
        >
          call
        </button>
        <button
          onClick={async () => {
            await chatClient.cancelRtc();
          }}
        >
          cancel
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
