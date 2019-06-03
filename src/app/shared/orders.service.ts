import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  private readonly COLLECTION = "coffeeOrders";

  constructor(private firestore: AngularFirestore) {}
  form = new FormGroup({
    customerName: new FormControl(""),
    orderNumber: new FormControl(""),
    coffeeOrder: new FormControl(""),
    completed: new FormControl("")
  });

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.COLLECTION)
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  getCoffeOrders() {
    return this.firestore.collection(this.COLLECTION).snapshotChanges();
  }

  updateCoffeOrder(data) {
    return this.firestore
      .collection(this.COLLECTION)
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  deleteCoffeeOrder(data) {
    return this.firestore
      .collection(this.COLLECTION)
      .doc(data.payload.doc.id)
      .delete();
  }
}
