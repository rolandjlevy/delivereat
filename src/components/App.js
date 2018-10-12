import React from 'react';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.getCourse = this.getCourse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createQuantityMenu = this.createQuantityMenu.bind(this);
    this.state = { menu: {} }
  }

  componentDidMount () {
    fetch("/delivereat")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    let total = 0;
    Object.values(this.state.menu).forEach(item => {
      console.log("--- ID: ", item.id, " ---");
      console.log(item.name);
      console.log(`${item.quantity} x ${item.price} = £${item.quantity * item.price}`);
      console.log(`   `);
      total += item.quantity * item.price;
    });
    console.log("--- Total is: £", total, " ---");
  }

  handleChange (id, event) {
      this.setState({
        menu: Object.assign({}, this.state.menu, {[id]: Object.assign(this.state.menu[id], { quantity: event.target.value })})
      });
    }

  createQuantityMenu (name, id) {
    const array = [];
    for (let i=0; i<=10; i++) array.push(i);
    return <select onChange={(event) => this.handleChange(id, event)} name={name} id={id}>
      { array.map(item => <option value={item} key={item}>{item}</option> )}
    </select>
  }

  getCourse (course) {
    const values = Object.values(this.state.menu);
    return <ul className="menu__item"> {values.filter(item => item.type === course)
    .map(item => {
      return <li key={item.id}>
            <div><img src={item.image}></img></div>
            <div><strong>{item.name}: £{item.price}</strong><br />
            Quantity: {this.createQuantityMenu(item.name, item.id)}</div>
            {/* <input type="text" name={item.id}></input> */}
          </li>
    })}
    </ul>
  }

  render(){
    return (
      <div>
        <h1>Delivereat app</h1>
          <form onSubmit={this.handleSubmit} className="menu__form">
            <button type="submit">Order food</button>
            <h2>Starters</h2> {this.state.menu && this.getCourse("starter")}
            <hr></hr>
            <h2>Mains</h2> {this.state.menu && this.getCourse("main")}
            <hr></hr>
            <h2>Desserts</h2> {this.state.menu && this.getCourse("dessert")}
          </form>      
      </div>
    )
  }
}

export default App;