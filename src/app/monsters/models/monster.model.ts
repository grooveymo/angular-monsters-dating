export class Monster {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  catchline: string;
  imageFile: string;

  constructor(firstName: string, lastName: string, email: string, username: string, imgFile: string, catchline: string, _id?: string ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.catchline = catchline;
    this.imageFile = imgFile
  }
}
