import * as React from 'react'

import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import styled from 'styled-components'
import { DatatableContext } from './DataTableContext';
import { TableHeader } from './TableHeader';
import { IColumnConfig } from './types/IColumnConfig';
import { IContextProp } from './types/IContextProp';

const Container = styled.div`
    width: 100%;
    height: 100%;
`


export class ViewPort extends React.PureComponent {

    public static contextType = DatatableContext

    public render() {

        return (
            <Container>
               <TableHeader context={this.context}/>
            </Container>
        )
    }
}