function store(stringArray) {
    const finalArr = []
    const arrObj = stringArray.split('\n')
    arrObj.forEach(obj => {
        const initialObj = {}
        const splittedObject = obj.split(';')
        splittedObject.forEach(subObj => {
            const pureObject = subObj.split('=')
            const key = pureObject[0]
            const value = pureObject[1]
            initialObj[key] = value.replace(/"/g, '')
        })
        finalArr.push(initialObj)
    })
    return finalArr
}

function load(syntax) {
    return store(syntax)
}

export {
    store,
    load
}