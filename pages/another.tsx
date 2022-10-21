import {
  VideoElementDictionary,
  YROUNChatClient,
  YROUNChatMessagesView,
  YROUNChatRtcControllerView,
} from "@yroun/chat";
import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [videoElements] = useState<VideoElementDictionary>({});
  const [chatClient] = useState(new YROUNChatClient());
  const [chatUuid, setChatUuid] = useState("sc-yroun-us-sok6lbc8q2wn");
  const [userUuid, setUserUuid] = useState("t4vq0cxie242");
  const [userApiKey, setUserApiKey] = useState(
    "skmtro8x74msqe3ujr4h9et01iexszp2k2uzl"
  );
  return (
    <div>
      <div>{loading}</div>
      <div>
        smartcenter uuid
        <input
          defaultValue={chatUuid}
          onChange={(e) => setChatUuid(e.target.value)}
        />
      </div>
      <div>
        user uuid
        <input
          defaultValue={userUuid}
          onChange={(e) => setUserUuid(e.target.value)}
        />
      </div>
      <div>
        user api key
        <input
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
        />
      </div>
      <div />
      <button
        onClick={() => {
          if (chatUuid && userUuid && userApiKey && setLoading) {
            // @ts-ignore
            chatClient.startRtc({
              chatUuid,
              userUuid,
              userPasscode: userApiKey,
              videoElements,
              setLoading,
            });
          } else {
            console.error("not enough information");
          }
        }}
      >
        connect
      </button>
      <button
        onClick={() => {
          chatClient.stop();
        }}
      >
        disconnect
      </button>
      <div style={{ width: "600px" }}>
        <YROUNChatRtcControllerView chatClient={chatClient} />
      </div>
      <video
        ref={(el: HTMLVideoElement) => (videoElements[userUuid] = el)}
        autoPlay={true}
        playsInline={true}
        muted={true}
        style={{
          backgroundColor: "black",
        }}
      />
      {chatClient.getActiveChatParticipants().map((client: any) => {
        if (userUuid === client.uid) {
          return <div />;
        }
        return (
          <video
            ref={(el: HTMLVideoElement) => (videoElements[client.uid] = el)}
            autoPlay={true}
            playsInline={true}
            muted={true}
            style={{
              backgroundColor: "black",
            }}
          />
        );
      })}
      <div>
        <button
          onClick={() => {
            chatClient.sendUserMessage("test message");
          }}
        >
          create message
        </button>
        <YROUNChatMessagesView chatClient={chatClient} />
      </div>
    </div>
  );
};
