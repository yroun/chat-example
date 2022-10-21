import {
  VideoElementDictionary,
  YROUNChatClient,
  YROUNChatMessagesView,
  YROUNChatRtcControllerView,
  // } from "@yroun/chat";
} from "../../chat";
import { useEffect, useMemo, useState } from "react";
import { YROUNChatParticipantView, YROUNChatUserType } from "@yroun/chat";

export default () => {
  const [videoElements] = useState<VideoElementDictionary>({});
  const [chatClient] = useState(new YROUNChatClient());
  // const [chatUuid, setChatUuid] = useState("sc-yroun-us-sok6lbc8q2wn");
  const [smartcenterUuid, setSmartcenterUuid] = useState("yroun");
  const [adminUserUuid, setAdminUserUuid] = useState<string>("vb6unjqee1q1");
  // const [apiKey, setApiKey] = useState("qdq000anq051qxw4x91vd10kvf0waadnr2w5");
  const [apiKey, setApiKey] = useState("rh7r64an6p0xt8f5dibh74v91jyjcllw3o8q8");
  const [clients, setClients] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState("yrounlabs@naver.com");
  const [otherUserEmail, setOtherUserEmail] = useState("yroun@naver.com");
  const [chatUuid, setChatUuid] = useState("");
  const [userApiKey, setUserApiKey] = useState("");
  const [chatClients, setChatClients] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    chatClient.start({
      userUid: adminUserUuid,
      userPasscode: apiKey,
      setLoading,
    });
  }, [adminUserUuid, apiKey]);
  const emptyString = useMemo(() => {
    return "(empty)";
  }, []);
  return (
    <div>
      <div>{loading}</div>
      <div>
        smartcenter uuid
        <input
          defaultValue={smartcenterUuid}
          onChange={(e) => setSmartcenterUuid(e.target.value)}
        />
      </div>
      <div>
        ADMIN USER UUID
        <input
          value={adminUserUuid}
          onChange={(e) => setAdminUserUuid(e.target.value)}
        />
      </div>
      <div>
        API Key
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div style={{ margin: "14px", color: "red" }}>
        chat uuid : {chatUuid || emptyString}
      </div>
      <div style={{ margin: "14px", color: "red" }}>
        chat clients : {chatClients || emptyString}
      </div>
      <div style={{ margin: "14px", color: "red" }}>
        user1 API Key : {userApiKey}
      </div>
      <div style={{ margin: "14px 0 0" }}>
        user1 email
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      1.{" "}
      <button
        onClick={async () => {
          const res: any = await chatClient
            .createSmartcenterChat(smartcenterUuid, userEmail)
            .catch(console.error);
          const chat = res?.data || {};
          console.log(chat);
          setChatUuid(chat.uid);
          await chatClient.turnChatOnByUuid(chat.uid, videoElements);
        }}
      >
        get or create chat
      </button>
      <div>
        user2 email
        <input
          value={otherUserEmail}
          onChange={(e) => setOtherUserEmail(e.target.value)}
        />
      </div>
      2.{" "}
      <button
        onClick={async () => {
          const res: any = await chatClient.addSmartcenterChatClient(
            chatUuid,
            otherUserEmail
          );
          const chat = res?.data || {};
          setClients(chat.clients);
          setChatClients(
            (chat.clients || [])
              .map((client) => `${client.uid}(${client.email})`)
              .join(", ")
          );
        }}
      >
        add client
      </button>
      <div />
      3.{" "}
      <button
        onClick={async () => {
          for (const client of clients) {
            if (client.email !== userEmail) {
              continue;
            }
            const res: any = await chatClient.getChatUserApiKeyForAdmin(
              smartcenterUuid,
              client.uid
            );
            const apiKey = res?.data?.value;
            setUserApiKey(apiKey);
            await chatClient.start({
              userType: YROUNChatUserType.OPEN_API,
              userUid: client.uid,
              userPasscode: apiKey,
              setLoading,
            });
            await chatClient.turnChatOnByUuid(chatUuid, videoElements);
          }
        }}
      >
        get User2 Api Key
      </button>
      <div style={{ width: "600px" }}>
        <YROUNChatRtcControllerView chatClient={chatClient} />
      </div>
      {(clients || []).map((client: any) => {
        // if (userEmail === client.email) {
        //   return <div />;
        // }
        return (
          <YROUNChatParticipantView
            key={`participant-${client.uid}`}
            ref={(el: HTMLVideoElement) => (videoElements[client.uid] = el)}
            chatClient={chatClient}
            participant={client}
          />
        );
      })}
      <div>
        <YROUNChatMessagesView
          containerStyle={{
            flex: "0 0 100%",
          }}
          chatClient={chatClient}
        />
      </div>
    </div>
  );
};
