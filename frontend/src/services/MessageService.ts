import axios from 'axios';

export default class MessageService {
    static async post(body: string) {
        await axios.post("/api/messages", {
            body: body
        });
    }
}
