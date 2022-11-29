import {
  VideoElementDictionary,
  YROUNChatClient,
  YROUNChatMessagesView,
  YROUNChatRtcControllerView,
} from "@yroun/chat";
import {useEffect, useState} from "react";
import { YROUNChatMessageType } from "@yroun/chat";

export default () => {
  const [loading, setLoading] = useState(false);
  const [videoElements] = useState<VideoElementDictionary>({});
  const [chatClient] = useState(
    new YROUNChatClient({
      filterChatMessageTypes: [YROUNChatMessageType.DEFAULT]
    })
  );
  const [chatUuid, setChatUuid] = useState(
    "sc-yroun-1667197742924-urp5gby5rskj"
  );
  const [userUuid, setUserUuid] = useState("1ib0ejkpl70hh");
  const [userApiKey, setUserApiKey] = useState(
    "t8f78z5eqq7tsl68hz66v4gxuvjnrdpa7rjp"
  );

  useEffect(() => {
    chatClient.getPermissionAudio().then((permission) => {
      console.log(permission);
      permission.onchange = (e) => {
        console.log(permission)
        console.log(e)
      }
    });
    chatClient.getPermissionVideo().then((permission) => {
      console.log(permission);
      permission.onchange = (e) => {
        console.log(permission)
        console.log(e)
      }
    });
  }, []);

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
      <div>
        RTC
        <button
          onClick={() => {
            if (chatUuid && userUuid && userApiKey && setLoading) {
              // @ts-ignore
              chatClient.prepareRtc({
                chatUuid,
                userUuid,
                passcode: userApiKey,
                videoElements,
                setLoading,
                onDisabled: () => {
                  console.log("chat disbled");
                },
                onRtcEnd: () => {
                  console.log("rtc ended");
                },
                onGetUserMedia: () => {
                  console.warn('media success')
                },
                onGetUserMediaError: (error: any) => {
                  console.warn("permission denied");
                  console.warn(error);
                }
              });
            } else {
              console.error("not enough information");
            }
          }}
        >
          prepare
        </button>
      </div>
      <div style={{ width: "600px" }}>
        <YROUNChatRtcControllerView
          chatClient={chatClient}
          containerStyle={{
            background: "whitesmoke",
          }}
          callCancelGuide={{
            title: "거는 중...",
            style: {
              color: "black",
              fontSize: "14px",
            },
          }}
          callCancel={{
            title: "취소",
            style: {
              fontSize: "14px",
            },
            onClick: () => {},
          }}
          callAcceptGuide={{
            title: "전화가 왔습니다",
            style: {
              color: "black",
              fontSize: "14px",
            },
          }}
          callAccept={{
            title: "받기",
            style: {
              backgroundColor: "lightseagreen",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("받았습니다");
            },
          }}
          callDecline={{
            title: "거절",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("거절했습니다");
            },
          }}
          callEndGuide={{
            title: "통화중",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
          }}
          callEnd={{
            title: "끝내기",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("끝냈습니다");
            },
          }}
        />
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
            muted={false}
            style={{
              backgroundColor: "black",
            }}
          />
        );
      })}
      <div>
        <button
          onClick={() => {
            chatClient.sendMessage("test message");
          }}
        >
          create message
        </button>
        <YROUNChatMessagesView
          chatClient={chatClient}
          usernames={{
            "1hruaa2t830hd": "somebody",
            "1ib0ejkpl70hh": "me",
          }}
        />
      </div>
    </div>
  );
};
