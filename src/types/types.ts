export type TMatrixItem = {
  id: string
  amount: number
}
export type TMatrix = TMatrixItem[][]

export type TAction = {
  type: string
  payload: any
}
