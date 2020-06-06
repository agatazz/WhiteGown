export class Booking {
  constructor(
    public id: string,
    public dressId: string,
    public userId: string,
    public dressTitle: string,
    public dressImage: string,
    public firstName: string,
    public lastName: string,
   // public guestNumber: number,
    public bookedFrom: Date,
    public bookedTo: Date
  ) {}
}
