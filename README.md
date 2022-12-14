# YROUN Chat

@yroun/chat

Git: [https://github.com/yroun/chat-example](https://github.com/yroun/chat-example)

Guide: [https://yroun.notion.site/YROUN-OpenAPI-794ae110ffe749f5a049e157128cb24a](https://yroun.notion.site/YROUN-OpenAPI-794ae110ffe749f5a049e157128cb24a)

## Table of Contents
- [Install](#install)
- [Code Examples](#code-examples)
- [Components](#components)
  - [Chat Client](#Chat-Client)
  - [Chat Messages View](#Chat-Messages-View)
  - [Chat RTC Controller View](#Chat-RTC-Controller-View)
- [Usages](#usages)
  - [ChatClient preparing RTC with connecting with video/audio HTML elements](#chatclient-preparing-rtc-with-connecting-with-video-or-audio-html-elements)
  - [Send Message](#send-message)
  - [Handling media device permissions](#handling-media-device-permissions)
  - [Handling media device permission exceptions](#Handling-media-device-permission-exceptions)
- [Styling](#styling)
  - [Show Default Messages Only](#show-default-message-only)
  - [YROUNChatMessagesView](#yrounchatmessagesview)
  - [YROUNChatRtcControllerView](#yrounchatrtccontrollerview)

## Install
```
npm i @yroun/chat@latest
```

## Code Examples

#### Run
```
$ npm run dev
```

#### Files
- [./pages/index.tsx](pages/index.tsx)
- [./pages/another.tsx](pages/another.tsx)

You can see various usage examples in these files

## Components

The below are the main components

### Chat Client
```
const [chatClient] = useState(new YROUNChatClient());
```

### Chat Messages View
```
<YROUNChatMessagesView chatClient={chatClient} />
```

### Chat RTC Controller View
```
<YROUNChatRtcControllerView chatClient={chatClient} />
```

## Usages

### ChatClient preparing RTC with connecting with video or audio HTML elements
```
  const [videoElements] = useState<VideoElementDictionary>({});
  const [chatClient] = useState(new YROUNChatClient({}));
  useEffect(() => {
    chatClient.turnChatOnByUuid(
      chatUuid,
      videoElements
    );
    // or
    chatClient.prepareRtc({
      chatUuid,
      userUuid,
      passcode: userApiKey,
      videoElements,
      setLoading,
      ...
    });
  }, [])
  return <div>
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
  </div>
```

### Send Message
```
chatClient.sendMessage("Hello");
```

### Handling media device permissions

- Interfaces
```
export declare class YROUNChatClient {
  ...
  getPermissionAudio(): Promise<PermissionStatus | undefined>;
  getPermissionVideo(): Promise<PermissionStatus | undefined>;
  getPermissionGeolocation(): Promise<PermissionStatus | undefined>;
  getPermissionNotifications(): Promise<PermissionStatus | undefined>;
  getPermissionPersistentStorage(): Promise<PermissionStatus | undefined>;
  getPermissionPush(): Promise<PermissionStatus | undefined>;
  getPermissionScreenWakeLock(): Promise<PermissionStatus | undefined>;
  getPermissionXrSpatialTracking(): Promise<PermissionStatus | undefined>;
  ...
}
```
- Usage
```
useEffect(() => {
  chatClient.getPermissionAudio().then((permission) => {
    console.log(permission);
    permission.onchange = (e) => {
      console.log(permission)
      console.log(e)
    }
  });
  chatClient.getPermissionVideo().then((permission) => {
    // handle this permission and its change event
  });
  chatClient.getPermissionXXX().then()
  ...
}, []);
```
### Handling media device permission exceptions
```
chatClient.connect({
  chatUuid,
  userUuid,
  passcode: userApiKey,
  setLoading,
  ...
  onGetUserMediaError: (error: any) => {
    console.warn("permission denied");
    console.warn(error);
  },
});
```

## Styling

### Show default message only
```
const [chatClient] = useState(new YROUNChatClient({
  filterChatMessageTypes: [YROUNChatMessageType.DEFAULT]
}));
```

### YROUNChatMessagesView
```
<YROUNChatMessagesView
  chatClient={chatClient}
  containerStyle={{
    // CSS Properties
    background: 'gray'
  }}
  usernames={{
    "id1": "one",
    "id2": "another",
  }}
/>
```

### YROUNChatRtcControllerView
```
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
```
