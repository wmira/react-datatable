
import * as React from 'react'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import styled from 'styled-components';
import { DatatableContext, IDataTableContext } from './DataTableContext';
import { IContextProp } from './types/IContextProp';

const HeaderContainer = styled.div`
    overflow: hidden;
`


const Header: React.SFC<GridChildComponentProps<IDataTableContext>> = (props) => {
    const { data } = props
    const colConfig = data.columnConfigs[props.columnIndex]
    return (
        <div style={props.style}>
            { colConfig.id }
        </div>
    )
}

const headerStyle = {
    overflow: 'hidden'
}


export class TableHeader extends React.PureComponent<IContextProp> {
    public static contextType = DatatableContext


    public render() {
        const { columnConfigs } = this.props.context
        return (
            <HeaderContainer>
                <FixedSizeGrid<IDataTableContext>
                    itemData={this.context}
                    columnCount={columnConfigs.length}
                    rowCount={1}
                    columnWidth={110}
                    rowHeight={22}
                    height={22}
                    width={500}
                    style={headerStyle}>
                        { Header }
                    </FixedSizeGrid>
            </HeaderContainer>
        )
    }

}