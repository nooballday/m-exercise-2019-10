class Vertex {
    constructor(name, weigth) {
        this.name = name
        this.weigth = weigth
        this.edges = []
    }
}

class Edge {
    constructor(origin, direction) {
        this.origin = origin
        this.direction = direction
    }
}

class Graph {
    constructor() {
        this.vertices = []
        this.optimumWeigth = 0
        this.optimumWeigthAll = []
    }

    addVertex(vertex) {
        this.vertices.push(vertex)
    }

    addEdges(edge) {
        this.vertices.map(vertex => {
            if (edge.origin == vertex.name)
                return vertex.edges.push(edge.direction)
        })
    }

    getOptimalPath(start) {
        
    }

    print() {
        console.log('vertices : ', JSON.stringify(this.vertices))
    }
}


export {
    Graph,
    Vertex,
    Edge
}