export class UserDto {
  constructor(
  public id: number,
  public firstName: string,
  public lastName: string) { }

  public mobilePhone: string;
  public email: string;
}
