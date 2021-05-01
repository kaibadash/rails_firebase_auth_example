import axios from 'axios';

export default class AuthorizationService {
    static async authrize(idToken: string) {
        let response = await axios.post("/authorizations", {
            id_token: idToken
        });
        if (response.status === 404) {
            return false;
        }
        if (response.status !== 200) {
            throw Error("authorization failed");
        }
        // TODO: save session
        return true;
    }
}
