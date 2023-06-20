import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  getDocs,
  getFirestore,
  query,
  where,
  collection,
  addDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  db = getFirestore();
  userData: any;
  constructor(public firestore: Firestore) {}

  async createUser(userName: string, password: string): Promise<any> {
    const user = userName;
    const pass = password;
    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), {
        userName: user,
        password: pass,
      });
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      return e;
    }
  }

  async getUser(user: string): Promise<any> {
    console.log('value of user given by login form', user);
    const userName = user;
    const userquery = query(
      collection(this.firestore, 'users'),
      where('userName', '==', userName)
    );
    try {
      const user = await getDocs(userquery);
      console.log(user);
      user.forEach((doc) => {
        if (user.docs.length != 0) {
          this.userData = doc.data();
        } else {
          console.log('user does not exits');
        }
      });
      return this.userData;
    } catch (e) {
      return e;
    }
  }
}
