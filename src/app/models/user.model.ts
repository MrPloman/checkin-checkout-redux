export class User {
  name: string;
  email: string;
  uid: string;
  constructor(name: string, email: string, uid: string) {
    this.name = name;
    this.email = email;
    this.uid = uid;
  }
}
