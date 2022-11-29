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

### Permissions of Media Devices
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
- Handling events of permission requests denied such as Camera or Audio
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
