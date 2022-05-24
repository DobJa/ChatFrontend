import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    createHub() {
        return new HubConnectionBuilder()
            .withUrl("http://relay.test/chat")
            .configureLogging(LogLevel.Information)
            .build();
    }
}
