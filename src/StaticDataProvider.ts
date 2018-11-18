import { IDataProvider } from './types/IDataProvider';

const createStaticDataProvider = <D = {}>(data: D[]): IDataProvider<D> => {

    function  slice(offset: number, length: number) {
        return Promise.resolve(data)
    }

    return {
        length: data.length,
        slice
    }
}

export const StaticDataProvider = Object.freeze({
    from<D = {}>(data: D[]): IDataProvider<D> {
        return createStaticDataProvider(data)
    }
})