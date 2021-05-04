import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export default class FirebaseAuth {
  async getIdToken(): Promise<string> {
    let user = await this.onAuthStateChangedAsync();
    let idToken = await user?.getIdToken();
    return idToken ?? "";
  }

  async logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  private async onAuthStateChangedAsync(): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  }
}
