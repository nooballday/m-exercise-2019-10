import { load, store } from '../exercises/1'
import { Graph, Vertex, Edge } from '../exercises/2'
import { User, Item, Transaction } from '../exercises/3'
import moment from 'moment'

const storedArray = store('firstname="achmad";lastname="naufal"\nfirstname="abdul";lastname="jabar"')
console.log(storedArray)

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

console.log('Sum of optimal path : ', graph.getOptimalPath('A'))


// third question
// adding user
const userA = new User('John', new moment('2016-05-12'), false, false)
const firstTransaction = new Transaction(userA)
firstTransaction.addItem(new Item('cola', 3, 'groceries'))
firstTransaction.addItem(new Item('TV', 96, 'electronics'))
firstTransaction.calculateDiscount()
firstTransaction.printDiscount()
const totalAmount = firstTransaction.getTotalAmount()
console.log('Total amount : ', totalAmount)