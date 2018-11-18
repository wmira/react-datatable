
export interface IValueArg<D = {}> {
    data: D
    columnProp: IColumnConfig
}

export interface IColumnConfig<D = {}> {
    id: string
    width?: number
    title: string
    valueProvider?: (arg: IValueArg<D>) => React.ReactNode
}