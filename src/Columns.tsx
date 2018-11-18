
import * as React from 'react'
import { IColumnConfig } from './types/IColumnConfig';

export interface IColumnProp<D = {}> extends IColumnConfig<D> {}


export interface IColumnsProp {
    children: React.ReactElement<IColumnProp> | Array<React.ReactElement<IColumnProp>>
}


export const Columns: React.SFC<IColumnsProp> = React.memo(() => {
    throw new Error("Columns should not render")
})

export const Column: React.SFC<IColumnProp> = React.memo(() => {
    throw new Error("Column should not render")
})

