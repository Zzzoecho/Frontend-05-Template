export const createElement = (type, attributes, ...children) => {
    let ele

    if (typeof type === 'string') {
        ele = new ElementWrapper(type)
    } else {
        ele = new type
    }

    for (const key in attributes) {
        ele.setAttribute(key, attributes[key])
    }

    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child)
        }
        ele.appendChild(child)
    }
    return ele
}

export class Component {
    constructor(type) {
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWrapper extends Component{
    constructor(type) {
        super()
        this.root = document.createElement(type)
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super()
        this.root = document.createTextNode(content)
    }
}

