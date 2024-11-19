
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
    
    for(const child of childs)
        element.appendChild(child)

    return element
}

const create_state = initialValue => {
    const value = {
        value: initialValue,
    };

    const state = new Proxy(value, {
        get(target, prop, receiver) {
            console.log(receiver);
            return Reflect.get(...arguments);
        },
    
        set(obj, prop, value) {
            return Reflect.set(...arguments);
        }
    });

    return value;
}

const App = () => {
    state = create_state(0);

    return div(
        p("This is a test paragraph"),
        button({onclick: () => ++state.value }, "This is a button")
    );
}

document.body.appendChild(App())