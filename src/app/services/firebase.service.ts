import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import "firebase/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import * as moment from "moment";
import { Activity, User, Act } from "../models/health.model";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  getUserRef() {
    return this.afs.collection("users").doc(firebase.auth().currentUser.uid);
  }

  getDataRef() {
    return this.afs
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("data");
  }

  updateActivities(date: string, activities: Activity[]) {
    this.afs
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("data")
      .doc(date)
      .update({
        activities: activities
      });
  }

  updateCategories(cats: string[]) {
    this.afs
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        categories: cats
      });
  }

  initUserData(uid: string) {
    const today = moment().format("YYYY-MM-DD");
    const userFields = {
      points: 0,
      onboardDate: today,
      categories: ["Sleep", "Mindfulness", "Nutrition", "Exercise"],
      calculateDate: moment()
        .subtract(1, "day")
        .format("YYYY-MM-DD")
    };
    const userData = {
      point: 0,
      activities: []
    };

    const userRef = this.afs.collection("users").doc(uid);

    userRef.set(userFields);
    userRef
      .collection("data")
      .doc(today)
      .set(userData);
  }

  addOnePoint() {
    this.getUserRef()
      .ref.get()
      .then(res => {
        const newPoints = res.data().points + 1;
        this.getUserRef().update({
          points: newPoints
        });
      });
  }

  getActs(cat: string) {
    let cats: Act[] = [];
    let theEnd = false;
    for (let i = 0; i < 30; i++) {
      const date = moment()
        .subtract(i, "day")
        .format("YYYY-MM-DD");
      this.getDataRef()
        .doc(date)
        .ref.get()
        .then(res => {
          if (res.exists) {
            const act = res.data().activities.find(a => a.category == cat);
            if (act) {
              cats.push({
                date,
                category: act.category,
                content: act.content
              });
            }
          } else {
            theEnd = true;
          }
        });

      if (theEnd || i === 29) {
        break;
      }
    }
    return cats;
  }
}
