interface Vehicle {
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | undefined,
  buyValue: number,
}
    
export default Vehicle;