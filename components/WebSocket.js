import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    createHub() {
        return new HubConnectionBuilder()
            .withUrl("https://localhost:7001")
            .configureLogging(LogLevel.Information)
            .build();
    }
}
