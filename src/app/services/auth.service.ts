import { Injectable } from "@angular/core";
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs";
import { User } from "src/app/models/user.model";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: Auth,
    public angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}
  public getSession() {
    return this.angularFireAuth.authState.pipe(
      map((fbuser) => {
        if (!!fbuser) return true;
        else return false;
      })
    );
  }
  public createUser(username: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        if (!user) return;
        const _newUser = new User(username, email, user.uid);
        return this.angularFirestore
          .doc(`${user.uid}/users`)
          .set({ ..._newUser });
      }
    );
  }
  public loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  public signOutSession() {
    return signOut(this.auth);
  }
}
