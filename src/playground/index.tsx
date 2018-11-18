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
    padding: 18px 122px;
    width: 100%;
    height: 420px;
`

interface IRow {
    name: { first: string, last: string }
}

const firstnameValue = (arg: IValueArg<IRow>) => {
    return arg.data.name.first
}

const lastnameValue = (arg: IValueArg<IRow>) => {
    return arg.data.name.last
}

const Index: React.SFC = () => {

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
                            width={210}

                        />
                        <Column
                            id='firstname'
                            title='Firstname'
                            valueProvider={firstnameValue}
                        />
                        <Column
                            id='lastname'
                            title='Lastname'
                            valueProvider={lastnameValue}
                        />
                    </Columns>
                </DataTable>
            </Container>
            <GLobalStyle />
        </>
    )
}

ReactDOM.render(<Index/>, mountPoint)

