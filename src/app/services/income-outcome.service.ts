import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  deleteAllIncomeOutcomeAction,
  deleteIncomeOutcomeAction,
  modifyIncomeOutcomeAction,
  newIncomeOutcomeAction,
} from "../ingreso-egreso/store/income-outcome.actions";
import { AppState } from "../state";
import { IncomeOutcome } from "../models/income-outcome.model";

import { AngularFirestore } from "@angular/fire/compat/firestore";
import { setLoading } from "../shared/store/ui.actions";
import { AuthService } from "./auth.service";
import { Subscription, map } from "rxjs";
import { snapshotChanges } from "@angular/fire/compat/database";

@Injectable({
  providedIn: "root",
})
export class IncomeOutcomeService {
  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}
  public createNewIncomeOutcome(incomeOutcome: IncomeOutcome) {
    this.store.dispatch(setLoading({ loading: true }));
    return this.angularFirestore
      .doc(`${this.authService.getUser.uid}/income-outcome`)
      .collection("items")
      .add({ ...incomeOutcome })
      .then((fire) => {
        this.store.dispatch(
          newIncomeOutcomeAction({ incomeOutcome: incomeOutcome })
        );
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      })
      .finally(() => {
        this.store.dispatch(setLoading({ loading: false }));
      });
  }
  public initiIncomeOutcomeListener(uid: string) {
    // this.store.dispatch(setLoading({ loading: true }));
    return this.angularFirestore
      .collection(`${uid}/income-outcome/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((doc: any) => {
            return {
              description: doc.payload.doc.data().description,
              amount: doc.payload.doc.data().amount,
              income: doc.payload.doc.data().income,
              uid: doc.payload.doc.id,
            };
          });
        })
      );
  }

  public changeIncomeOutcomeStatus(incomeOutcome: IncomeOutcome) {
    return this.angularFirestore
      .doc(
        `${this.authService.getUser.uid}/income-outcome/items/${incomeOutcome.uid}`
      )
      .update({ income: incomeOutcome.income })
      .then(() => {
        this.store.dispatch(
          modifyIncomeOutcomeAction({
            description: incomeOutcome.description,
            amount: incomeOutcome.amount,
            income: incomeOutcome.income,
            uid: incomeOutcome.uid,
          })
        );
      });
  }

  public deleteIncomeOutcome(incomeOutcome) {
    return this.angularFirestore
      .doc(
        `${this.authService.getUser.uid}/income-outcome/items/${incomeOutcome.uid}`
      )
      .delete()
      .then(() => {
        this.store.dispatch(
          deleteIncomeOutcomeAction({ uid: incomeOutcome.uid })
        );
      });
  }

  public deleteAllIncomeOutcome() {
    return this.store.dispatch(deleteAllIncomeOutcomeAction());
  }
}
