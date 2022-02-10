export interface JwtPayloadInterface {
  userId: number,
  userName: string,
  firstName: string,
  lastName: string,
  isActive: boolean,
  iat?: Date,
}