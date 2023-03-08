interface Car {
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | undefined,
  buyValue: number,
  doorsQty: number,
  seatsQty: number
}
  
export default Car;