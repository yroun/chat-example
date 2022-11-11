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