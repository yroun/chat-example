# YROUN Chat

@yroun/chat

## Install
```
npm i @yroun/chat@latest
```

## Code Example

You can check more options such as styling or callback in the example code

```
./pages/index.tsx
```

## Components

Major components

### Chat Client
```
const [chatClient] = useState(new YROUNChatClient());
```

### Chat RTC Controller
```
<YROUNChatRtcControllerView chatClient={chatClient} />
```

### Chat Chat Messages
```
<YROUNChatMessagesView chatClient={chatClient} />
```

## Examples

### Get ChatClient connected with video/audio HTML elements for RTC
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
