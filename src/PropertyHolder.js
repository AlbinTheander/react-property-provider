export default class PropertyHolder {
  constructor(props) {
    this.props = {};
    Object.keys(props).forEach((prop) => {
      this.props[prop] = { value: props[prop], subscribers: [] };
    });
  }

  set(prop, value) {
    if (this.props[prop] !== value) {
      this.props[prop].value = value;
      this.props[prop].subscribers.forEach(f => f());
    }
  }

  get(prop) {
    return this.props[prop].value;
  }

  subscribe(prop, f) {
    this.props[prop].subscribers.push(f);
  }

  unsubscribe(prop, f) {
    this.props[prop].subscribers = this.props[prop].subscribers.filter(s => s !== f);
  }
}
