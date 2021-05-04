import axios from 'axios';

export default class AuthorizationService {
    static async authrize(idToken: string) {
        try {
            let response = await axios.post("/api/authorizations", {
                id_token: idToken
            });
        } catch (err) {
            if (err.response.status === 404) {
                return false;
            }
            throw err
        }
        
        return true;
    }

    static async authrizedUser() {
        return (await axios.get("/api/authorizations")).data;
    }
}
