import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import "firebase/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import * as moment from "moment";
import { Activity } from "../models/health.model";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private snapshotChangesSubscription: any;

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

  testUpdate() {
    this.afs
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        points: 2
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

  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs
            .collection("people")
            .doc(currentUser.uid)
            .collection("tasks")
            .snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs
            .doc<any>("people/" + currentUser.uid + "/tasks/" + taskId)
            .valueChanges()
            .subscribe(
              snapshots => {
                resolve(snapshots);
              },
              err => {
                reject(err);
              }
            );
        }
      });
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    // this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("people")
        .doc(currentUser.uid)
        .collection("tasks")
        .doc(taskKey)
        .set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("people")
        .doc(currentUser.uid)
        .collection("tasks")
        .doc(taskKey)
        .delete()
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("people")
        .doc(currentUser.uid)
        .collection("tasks")
        .add({
          title: value.title,
          description: value.description,
          image: value.image
        })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
}
