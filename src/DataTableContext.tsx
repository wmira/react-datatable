
import * as React from 'react'

import { IColumnConfig } from './types/IColumnConfig';
// import { IDataProvider } from './types/IDataProvider'

export interface IDataTableContext<D = {}> {
    data: D[]
    columnConfigs: IColumnConfig[]
    viewport: { width: number, height: number }
}

// const noopDataProvider: IDataProvider = {
//     length: 0,
//     slice(offset: number, length: number ) {
//         return Promise.resolve([])
//     }
// }

const DEFAULT_CONFIG = {
    columnConfigs: [],
    data: [],
    viewport: { width: 0, height: 0 }
}
const { createContext } = React
export const DatatableContext = createContext<IDataTableContext>(DEFAULT_CONFIG)