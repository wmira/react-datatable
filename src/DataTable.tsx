
import * as React from 'react'
import { findChild } from 'react-containers'
import Measure, { ContentRect } from 'react-measure'
import styled from 'styled-components';
import { Columns, IColumnProp } from './Columns';
import { DatatableContext, IDataTableContext } from './DataTableContext';
import { StaticDataProvider } from './StaticDataProvider';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { IColumnConfig } from './types/IColumnConfig';
import { IDataProvider } from './types/IDataProvider';

export interface IDatatableProp<D = {}> {
    dataProvider?: IDataProvider<D>
    data?: D[]
    ref?: React.RefObject<HTMLElement>
}

interface IDataTableState<D = {}> {
    dataProvider: IDataProvider<D>
    columnConfigs: IColumnConfig[],
    context: IDataTableContext
}

const { Provider } = DatatableContext
const Container = styled.div`
    width: 100%;
    height: 100%;
`
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
        this.state = { columnConfigs, context: {
            columnConfigs,
            data: [],
            viewport: { width: 0, height: 0 }
        }, dataProvider }

    }

    public componentDidMount() {

        // when suspense fetch is ready then..,for now we do this
        this.state.dataProvider.slice(0, 0)
            .then( data => {
                const { context } = this.state
                this.setState({ ...this.state, context: { ...context, data }})
            })
    }

    public onMeasureResize = (arg: ContentRect) => {
        const { state } = this
        const { context } = state
        if ( arg.bounds ) {
            this.setState({ ...state, context: {...context, viewport: { width: arg.bounds.width, height: arg.bounds.height } }})
        }
    }

    public renderDataTable = (arg: { measureRef: any }) => {
        return (
            <Provider value={this.state.context}>
                <Container ref={arg.measureRef}>
                    <TableHeader context={this.state.context}/>
                    <TableBody context={this.state.context} />
                </Container>
            </Provider>
        )
    }

    public render() {

        return (
            <Measure
                bounds={true}
                onResize={this.onMeasureResize}>
                { this.renderDataTable }
            </Measure>
        )

    }
}