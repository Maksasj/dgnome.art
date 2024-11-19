
const p = (text) => {
    element = document.createElement('p');
    element.textContent = text;
    return element
}

const button = (props, text) => {
    element = document.createElement('button');

    for (const [k, v] of Object.entries(props))
        element[k] = v;

    element.textContent = 'Click me!';
    return element;
}

const div = (...childs) => {
    element = document.createElement("div");

    const render = () => {
        const clearDom = () => {
            let child = element.lastElementChild;
            while (child) {
                element.removeChild(child);
                child = element.lastElementChild;
            }
        }

        clearDom();

        for (let i = 0; i < childs.length; i++) {
            child = childs[i]

            if(child != null && child.constructor === Object) {
                element.innerText = child.value;
                
                if(Object.hasOwn(child, "listeners"))
                    child.listeners.push(render)
            } else {
                element.append(child);
            }
        }
    }
    
    render();

    return element
}

const create_state = initialValue => {
    const proto = {
        value: initialValue,
        listeners: []
    };

    const state = new Proxy(proto, {
        get(target, prop, receiver) {
            return Reflect.get(...arguments);
        },
    
        set(target, property, value, receiver) {
            if(property === "value") {
                receiver.listeners[0]();

                // for (let i = 0; i < receiver.listeners.length; i++) {
                    // receiver.listeners[i]();
                // }
            }
            
            return Reflect.set(...arguments);
        }
    });

    return state;
}

const App = () => {
    state = create_state(0);

    return div(
        state,
        button({onclick: () => ++state.value }, "This is a button")
    );
}

document.body.appendChild(App())