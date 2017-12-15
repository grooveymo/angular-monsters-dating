export class Monster {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  imageFile: string;

  constructor(firstName: string, lastName: string, email: string, imgFile: string, username: string, _id?: string ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.imageFile = imgFile
  }
}
