export default interface IResponse {
  status: number,
  data: { message: string } | object,
}
