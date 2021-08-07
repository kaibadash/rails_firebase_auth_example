import axios from 'axios';

export default class MessageService {
    static async post(body: string) {
        await axios.post("/api/messages", {
            body: body
        });
    }
    static async getMessages() {
        let response = await axios.get("/api/messages")
        return response.data;
    }
}
