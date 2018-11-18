
import * as React from 'react'
import { findChild } from 'react-containers'
import { Columns, IColumnProp } from './Columns';
import { DatatableContext } from './DataTableContext';
import { StaticDataProvider } from './StaticDataProvider';
import { IDataProvider } from './types';
import { IColumnConfig } from './types/IColumnConfig';
import { ViewPort } from './ViewPort';

export interface IDatatableProp<D = {}> {
    dataProvider?: IDataProvider<D>
    data?: D[]
}

interface IDataTableState<D = {}> {
    dataProvider: IDataProvider<D>
    columnConfigs: IColumnConfig[]
}

const { Provider } = DatatableContext

export class DataTable<D> extends React.PureComponent<IDatatableProp<D>, IDataTableState<D>> {

    constructor(props: IDatatableProp<D>) {
        super(props)

        if ( Boolean(props.data) && Boolean(props.dataProvider) ) {
            // tslint:disable-next-line
            console.warn(`data and dataProvider is provided, 
                will only use dataProvider`)
        }
        const dataProvider: IDataProvider<D> = props.dataProvider ? props.dataProvider
                                                : StaticDataProvider.from(props.data || [])
        const columnsRElement = findChild(Columns, this.props)
        const columnConfigs = React.Children.toArray(columnsRElement.props.children).map( (child: React.ReactElement<IColumnProp>) => {
            return { ...child.props }
        })
        this.state = { dataProvider, columnConfigs }

    }



    public render() {
        return (
            <Provider value={this.state}>
                <ViewPort>{ this.props.children }</ViewPort>
            </Provider>
        )
    }
}