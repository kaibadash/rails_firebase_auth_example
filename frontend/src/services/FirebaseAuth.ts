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

  emailVerified(): boolean {
    var user = firebase.auth().currentUser;
    return user?.emailVerified === true
  }

  async sendEmailVerificationIfNeed() {
    var user = firebase.auth().currentUser;
    if (!user) return;
    try {
      await user.sendEmailVerification();
    } catch (e) {
      alert(e);
    }
  }

  async sendPasswordReminder(email: string) {
    var auth = firebase.auth();
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (e) {
      alert(e);
    }
  }

  async resetPassword(newPassword: string) {
    var user = firebase.auth().currentUser;
    if (!user) return;
    try {
      await user.updatePassword(newPassword);
    } catch (e) {
      alert(e);
    }
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
