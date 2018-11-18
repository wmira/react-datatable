
import * as React from 'react'

export interface IValueArg<D = {}> {
    data: D
    columnProp: IColumnProp
}

export interface IColumnProp<D = {}> {
    id: string
    title: string
    value?: (arg: IValueArg<D>) => React.ReactNode
}

export interface IColumnsProp {
    children: React.ReactElement<IColumnProp> | Array<React.ReactElement<IColumnProp>>
}


export const Columns: React.SFC<IColumnsProp> = React.memo(() => {
    throw new Error("Columns should not render")
})

export const Column: React.SFC<IColumnProp> = React.memo(() => {
    throw new Error("Column should not render")
})

