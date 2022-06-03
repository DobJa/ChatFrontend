import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    createHub(relayURL) {
        return new HubConnectionBuilder()
            .withUrl(relayURL + "/chat")
            .configureLogging(LogLevel.Information)
            .build();
    }
}
