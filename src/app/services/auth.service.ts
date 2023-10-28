import { Injectable } from "@angular/core";
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { State, Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";
import { User } from "src/app/models/user.model";
import { AppState } from "../state";
import { removeUser, setUser } from "../auth/store/auth.actions";
import { deleteAllIncomeOutcomeAction } from "../ingreso-egreso/store/income-outcome.actions";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: Auth,
    public angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  private userFirebase: User | undefined;

  public get getUser(): User {
    return { ...this.userFirebase };
  }

  public userSubscription: Subscription;
  public initAuthLister() {
    return this.angularFireAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.userSubscription = this.angularFirestore
          .doc(`${firebaseUser.uid}/users`)
          .valueChanges()
          .subscribe((fuser: User) => {
            this.userFirebase = {
              email: fuser.email,
              name: fuser.name,
              uid: firebaseUser.uid,
            };
            this.store.dispatch(setUser({ user: fuser }));
          });
      } else {
        if (this.userSubscription) this.userSubscription.unsubscribe();
        this.userFirebase = undefined;
      }
    });
  }
  public getSessionStatus() {
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
