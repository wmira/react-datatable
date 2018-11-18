
import * as React from 'react'

import { IColumnConfig } from './types/IColumnConfig';
import { IDataProvider } from './types/IDataProvider'

export interface IDataTableContext<D = {}> {
    dataProvider: IDataProvider<D>
    columnConfigs: IColumnConfig[]
}

const noopDataProvider: IDataProvider = {
    length: 0,
    slice(offset: number, length: number ) {
        return Promise.resolve([])
    }
}

const DEFAULT_CONFIG = {
    columnConfigs: [],    
    dataProvider: noopDataProvider
}
export const DatatableContext = React.createContext<IDataTableContext>(DEFAULT_CONFIG)