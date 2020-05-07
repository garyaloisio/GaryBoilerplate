import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    // this.baseState = this.state
  }

  componentDidMount() {
    fetch(
      '' // insert JSON HERE !!!!
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result // items is the JSON
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // this handle click will send the data to backend to post in database

  async handleClick(paramOne, paramTwo, paramThree) {
    await axios.post('/api/ `PUT NAME OF DATABASE` ', {
      // this is the database youre adding to or updating.... GO TO API ROUTES TO CHECK PARAMS
      paramOne: paramOne,
      paramTwo: paramTwo,
      paramThree: paramThree
    })
  }

  render() {
    const {email} = this.props

    const {error, isLoaded, items} = this.state

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      let values = Object.values(items)
      return (
        <div>
          <h1>Welcome {email}</h1>
          <div>
            {/* {values.map(stock => (             THIS IS TO CYCLE THROUGH ITEMS IN JSON
              <h2 key={stock.quote.symbol}>
                {stock.quote.companyName}
                <ul>
                  Ticker Symbol: {stock.quote.symbol}
                  <br />
                  Price Per Share: $
                  {Number.parseFloat(stock.quote.latestPrice).toFixed(2)}
                </ul>

                <form onSubmit={this.handleClick}>
                  <label>Quantity:</label>
                  <select
                    type="text"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  >
                    <option>{1}</option>
                    <option>{2}</option>
                    <option>{3}</option>
                    <option>{4}</option>
                    <option>{5}</option>
                  </select>
                  <button
                    onClick={() =>
                      this.handleClick(
                        stock.quote.symbol,
                        stock.quote.latestPrice,
                        this.state.quantity,
                        this.props.id,
                        this.props.budget
                      )
                    }
                  >
                    Buy
                  </button>
                </form>
              </h2>
            ))} */}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState, null)(Profile)

// THIS GET PROPS FROM USER

Profile.propTypes = {
  email: PropTypes.string,
  id: PropTypes.number
}
