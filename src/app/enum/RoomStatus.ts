export class RoomStatus {

  readonly key: string;
  readonly value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public static Booked = new RoomStatus("Booked", "Booked");
  public static Occupied = new RoomStatus("Occupied", "Occupied");
  public static Unoccupied = new RoomStatus("Unoccupied", "Unoccupied");
  public static Ready = new RoomStatus("Ready", "Ready");

  static getAllEnumList(): Array<RoomStatus> {
    return [
      RoomStatus.Booked,
      RoomStatus.Occupied,
      RoomStatus.Unoccupied,
      RoomStatus.Ready,
    ];
  }
}