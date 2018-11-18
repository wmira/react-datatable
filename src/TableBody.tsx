
import * as React from 'react'
import { GridChildComponentProps, VariableSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import { DatatableContext, IDataTableContext } from './DataTableContext';

import { IContextProp } from './types/IContextProp';

const Container = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
`


const Cell: React.SFC<GridChildComponentProps<IDataTableContext>> = (props) => {
    const { data: context } = props
    const colConfig = context.columnConfigs[props.columnIndex]
    const { valueProvider } = colConfig
    const { data } = context
    const row = data[props.rowIndex]
    const value = valueProvider
                    ? valueProvider({ data: row, columnProp: colConfig })
                    : row[colConfig.id]

    return (
        <div style={props.style}>
            <Container>{ value }</Container>
        </div>
    )
}

const headerStyle = {

}


export class TableBody extends React.PureComponent<IContextProp> {
    public static contextType = DatatableContext


    public getColumnWidth = (index: number) => {
        const { columnConfigs } = this.props.context
        const withWidthLength = columnConfigs.filter( col => Boolean(col.width) ).length
        const autoWidthSize = columnConfigs.filter( col => Boolean(col.width) ).reduce( (a: number, b: IColumnConfig) => {
            if ( b.width ) {
                return a + b.width
            }
            return a
        }, 0)
        console.log('auto width size ', autoWidthSize)
        const autoSizeWidthLength = columnConfigs.length - withWidthLength
        const colWidth = columnConfigs[index].width || ( this.props.context.viewport.width - autoWidthSize ) / autoSizeWidthLength
        console.log('colwidth ', colWidth)
        return colWidth
    }


    public getRowHeight = (index: number) => {
        return 22
    }

    public render() {
        const { columnConfigs, data } = this.props.context
        if ( this.props.context.viewport.width ) {
            return (
                <Container>
                    <Grid<IDataTableContext>
                        itemData={this.context}
                        columnCount={columnConfigs.length}
                        rowCount={data.length}
                        columnWidth={this.getColumnWidth}
                        rowHeight={this.getRowHeight}
                        height={this.props.context.viewport.height}
                        width={this.props.context.viewport.width}
                        style={headerStyle}>
                            { Cell }
                        </Grid>
                </Container>
            )
        }
        return null
    }

}