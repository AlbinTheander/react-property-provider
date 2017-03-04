export default class PropertyHolder {
  constructor(props, parent) {
    this.parent = parent;
    this.props = {};
    Object.keys(props).forEach((prop) => {
      this.props[prop] = { value: props[prop], subscribers: [] };
    });
  }

  set(prop, value) {
    if (prop in this.props) {
      if (this.props[prop] !== value) {
        this.props[prop].value = value;
        this.props[prop].subscribers.forEach(f => f());
      }
    } else if (this.parent) {
      this.parent.set(prop, value);
    }
  }

  get(prop) {
    if (prop in this.props) {
      return this.props[prop].value;
    }
    if (this.parent) {
      return this.parent.get(prop);
    }
    return undefined;
  }

  subscribe(prop, f) {
    if (prop in this.props) {
      this.props[prop].subscribers.push(f);
    } else if (this.parent) {
      this.parent.subscribe(prop, f);
    }
  }

  unsubscribe(prop, f) {
    if (prop in this.props) {
      this.props[prop].subscribers = this.props[prop].subscribers.filter(s => s !== f);
    } else if (this.parent) {
      this.parent.unsubscribe(prop, f);
    }
  }
}
