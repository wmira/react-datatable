
import * as React from 'react'
import { GridChildComponentProps, VariableSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import { DatatableContext, IDataTableContext } from './DataTableContext';
import { IColumnConfig } from './types/IColumnConfig';
import { IContextProp } from './types/IContextProp';

const HeaderContainer = styled.div`
    overflow: hidden;
`


const Header: React.SFC<GridChildComponentProps<IDataTableContext>> = (props) => {
    const { data } = props
    const colConfig = data.columnConfigs[props.columnIndex]
    const title = colConfig.title ? colConfig.title : colConfig.id
    return (
        <div style={props.style}>
            { title }
        </div>
    )
}

const headerStyle = {
    overflow: 'hidden'
}



export class TableHeader extends React.PureComponent<IContextProp> {
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

        const autoSizeWidthLength = columnConfigs.length - withWidthLength
        const colWidth = columnConfigs[index].width || ( this.props.context.viewport.width - autoWidthSize ) / autoSizeWidthLength

        return colWidth
    }


    public getRowHeight = (index: number) => {
        return 22
    }

    public render() {
        const { columnConfigs } = this.props.context
        if ( this.props.context.viewport.width ) {
            return (
                <HeaderContainer>
                    <Grid<IDataTableContext>
                        itemData={this.context}
                        columnCount={columnConfigs.length}
                        rowCount={1}
                        columnWidth={this.getColumnWidth}
                        rowHeight={this.getRowHeight}
                        height={22}
                        width={this.props.context.viewport.width}
                        style={headerStyle}>
                            { Header }
                        </Grid>
                </HeaderContainer>
            )
        }
        return null
    }

}