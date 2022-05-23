import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    createHub() {
        return new HubConnectionBuilder()
            .withUrl("http://localhost:8080/relay/chat")
            .configureLogging(LogLevel.Information)
            .build();
    }
}
