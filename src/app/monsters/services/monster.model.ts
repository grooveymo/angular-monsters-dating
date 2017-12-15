export class Monster {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageFile: string;

  constructor(firstName: string, lastName: string, email: string, imgFile: string, _id?: string ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.imageFile = imgFile
  }
}
