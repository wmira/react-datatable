import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DataTable } from '../DataTable';
import { StaticDataProvider } from '../StaticDataProvider'

import styled, { createGlobalStyle } from 'styled-components'
import { Column, Columns, IValueArg } from '../Columns';
import data from './data'
const GLobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    html,body {
        padding: 0px;
        margin: 0px;
        font-family: 'Roboto', sans-serif;
    }
    * {
        box-sizing: border-box;
    }
`

const mountPoint = document.getElementById('app')


const Container = styled.div`
    padding: 4px;
    width: 420px;
    height: 220px;
`

interface IRow {
    name: { firstname: string, lastname: string }
}

const firstnameValue = (arg: IValueArg<IRow>) => {
    return arg.data.name.firstname
}

const lastnameValue = (arg: IValueArg<IRow>) => {
    return arg.data.name.lastname
}

const Index: React.SFC = (props) => {

    return (
        <>
            <Container>
                <DataTable
                    dataProvider={StaticDataProvider.from(data)}>
                    <Columns>
                        <Column
                            id='company'
                            title='Company'
                        />
                        <Column
                            id='email'
                            title='Email'
                        />
                        <Column
                            id='firstname'
                            title='Firstname'
                            value={firstnameValue}
                        />
                        <Column
                            id='lastname'
                            title='Lastname'
                            value={lastnameValue}
                        />
                    </Columns>
                </DataTable>
            </Container>
            <GLobalStyle />
        </>
    )
}

ReactDOM.render(<Index/>, mountPoint)

