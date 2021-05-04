import axios from 'axios';

export default class SignUpService {
    static async signUp(idToken: string, name: string) {
        await axios.post("/api/users", {
            id_token: idToken,
            name: name
        });
    }
}
