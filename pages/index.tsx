import {
  VideoElementDictionary,
  YROUNChatClient,
  YROUNChatMessagesView,
  YROUNChatRtcControllerView,
  } from "@yroun/chat";
import { useEffect, useState } from "react";
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
  const [userUuid, setUserUuid] = useState("1hruaa2t830hd");
  const [userApiKey, setUserApiKey] = useState(
    "s1gn3khy9r93urpo30llb7eavbnhdlb600mx"
  );
  const micEnabled = chatClient.micEnabled();

  useEffect(() => {
    chatClient.getPermissionAudio().then((permission) => {
      console.log(permission);
      permission.onchange = (e) => {
        console.log(permission.state === 'denied')
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
        chat uuid
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
                  console.warn("chat disbled");
                },
                onRtcEnd: () => {
                  console.warn("rtc ended");
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
        <button
          onClick={() => {
            chatClient.callRtc();
          }}
        >
          call
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            if (micEnabled) {
              chatClient.disableMic();
            } else {
              chatClient.enableMic();
            }
          }}
        >
          {micEnabled ? "mic on" : "mic off"}
        </button>
      </div>
      <div style={{ width: "600px" }}>
        <YROUNChatRtcControllerView
          chatClient={chatClient}
          containerStyle={{
            background: "whitesmoke",
            padding: "14px",
          }}
          callCancelGuide={{
            title: "???????????? ???...",
            style: {
              color: "black",
              fontSize: "14px",
            },
          }}
          callCancel={{
            title: "??????",
            style: {
              fontSize: "14px",
            },
            onClick: () => {
              console.log("??????????????????");
            },
          }}
          callAcceptGuide={{
            title: "????????? ????????????",
            style: {
              color: "black",
              fontSize: "14px",
            },
          }}
          callAccept={{
            title: "??????",
            style: {
              backgroundColor: "lightseagreen",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("???????????????");
            },
          }}
          callDecline={{
            title: "??????",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("??????????????????");
            },
          }}
          callEndGuide={{
            title: "?????????",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
          }}
          callEnd={{
            title: "?????????",
            style: {
              backgroundColor: "indianred",
              fontSize: "14px",
            },
            onClick: () => {
              console.log("???????????????");
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
            chatClient.sendMessage("test message");
          }}
        >
          create message
        </button>
        <YROUNChatMessagesView
          chatClient={chatClient}
          containerStyle={
            {
              // background: 'red'
            }
          }
          usernames={{
            "1hruaa2t830hd": "me",
            "1ib0ejkpl70hh": "somebody",
          }}
        />
      </div>
    </div>
  );
};
