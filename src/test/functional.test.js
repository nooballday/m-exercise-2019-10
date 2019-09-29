import { load, store } from '../exercises/1'
import { Graph, Vertex, Edge } from '../exercises/2'
import { User, Item, Transaction } from '../exercises/3'
import moment from 'moment'

const graph = new Graph()

graph.addVertex(new Vertex('A', 1))
graph.addVertex(new Vertex('B', 2))
graph.addVertex(new Vertex('C', 2))
graph.addVertex(new Vertex('D', 5))
graph.addVertex(new Vertex('E', 6))
graph.addVertex(new Vertex('F', 26))

graph.addEdges(new Edge('A', 'B'))
graph.addEdges(new Edge('B', 'C'))
graph.addEdges(new Edge('B', 'D'))
graph.addEdges(new Edge('D', 'E'))
graph.addEdges(new Edge('A', 'F'))

console.log(graph.print())
// console.log('Sum of optimal path : ', graph.getOptimalPath('A'))

describe('#1 When parsing and loaded', () => {
    const MOCK_ARRAY_STRING = 'firstname="achmad";lastname="naufal"\nfirstname="abdul";lastname="jabar"'
    const EXPECTED_ARRAY = [{ firstname: 'achmad', lastname: 'naufal' }, { firstname: 'abdul', lastname: 'jabar' }]
    it('Should parse the data without error', () => {
        expect(() => { store(MOCK_ARRAY_STRING) }).not.toThrow()
    })
    it('Should load the correct data when loading string array', () => {
        const arr = load(MOCK_ARRAY_STRING)
        expect(arr).toEqual(EXPECTED_ARRAY)
    })
})


describe('#3 When transaction is process', () => {
    const userA = new User('John', new moment('2016-05-12'), false, false)
    const firstTransaction = new Transaction(userA)
    firstTransaction.addItem(new Item('cola', 3, 'groceries', 2))
    firstTransaction.addItem(new Item('TV', 96, 'electronics', 1))
    firstTransaction.addItem(new Item('Smartphone', 200, 'electronics', 1))

    it('Should return the corrent net payable', () => {
        const totalAmount = firstTransaction.getTotalAmount()
        expect(totalAmount).toEqual(277.2)
    })
})