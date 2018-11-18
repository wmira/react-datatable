

export interface IDataProvider<D = {}> {
    /** the total number of data */
    length: number

    /** get a slice of the data */
    slice(offset: number, length: number): Promise<D[]>
}