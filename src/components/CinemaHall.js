import React from 'react';
import {ModalWindow} from './ModalWindow'
import seats from '../data/seats.json'

export class CinemaHall extends React.Component {

  state = {
    seatsJSX: seats,
    seat: {},
    showModal: false,
    rows: [],
    choiceSeats: [],
    priceAll: 0
  };

  /* Получаем список из уникальных значений рядов */
  componentWillMount () {
    let rows = this.state.seatsJSX.map(seat => {
      seat.choice = false
      return seat.row
    });

    this.setState({
      rows: [...new Set(rows)]
    });
  }

  /* открывает модальное окно + получает инфо о месте */
  reserveSeatHandler = (seat, index) => {
    let seatsNew = this.state.seatsJSX;
    let seatNew = seatsNew.find(item => item.id === seat.id);

    if (!seatNew.status) {
      seatNew.choice = !seatNew.choice

      if (seatNew.choice === true) {
        this.setState({
          priceAll: (Number(seatNew.price) + this.state.priceAll)
        });
      } else {
        this.setState({
          priceAll: (this.state.priceAll - Number(seatNew.price))
        });
      }
    }

    this.setState(state => {
      let choiceSeat = state.choiceSeats.push(seatNew);
      return {
        choiceSeat
      }
    });

    this.setState({
      seat: this.state.seatsJSX[index],
      // showModal: true
    });
  };

  /* сброс данных */
  clearData = () => {

    let seats = this.state.seatsJSX;
    let seatsReset = seats.map(seat => {
      seat.choice = false;
      return seat;
    });


    this.setState({
      choiceSeats: [],
      priceAll: 0,
      seatsJSX: seatsReset
    });
  };

  saveReservedSeatHandler = () => {
    this.setState({
      showModal: true
    });
  };

  /* меняем статус брони, если место свободно */
  changeStatusSeatHandler = (seat, flag) => {
    let seatsNew = this.state.seatsJSX;
    let seatNew = seatsNew.find(item => item.id === seat.id);

    if (flag) {
      seatNew.status = flag
    }

    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <div className="content">
        <h2>Сinema hall layout</h2>
        <div className="container">
          {/*вывод списка рядов*/}
          <div className="rows">
            {this.state.rows.map((row, index) => {
              return (
                <span key={index}>{row}</span>
              )
            })}
          </div>
          {/*вывод списка мест*/}
          <div className="seats">
            {this.state.seatsJSX.map((seat, index) => {
              return (
                <div
                  className={seat.status ? 'seat busy' : 'seat'}
                  key={index}
                  title={seat.status ? 'Reserved' : 'Seat is free $' + seat.price }
                  onClick={this.reserveSeatHandler.bind(this, seat, index)}
                  style={seat.choice ? {backgroundColor: '#17fb9a'} : null}
                >
                  {seat.number}
                </div>
              )
            })}
          </div>
          {/*легенда мест*/}
          <div className="legend">
            <div className="group">
              <div className="seat"></div>
              <span>Free</span>
            </div>
            <div className="group">
              <div className="seat"></div>
              <span>Reserved</span>
            </div>
            <div className="group">
              <div className="seat"></div>
              <span>Choices</span>
            </div>
          </div>
        </div>
        <div className='button-cinema-hall'>
          <button onClick={this.saveReservedSeatHandler}>Reserved</button>
          <button onClick={this.clearData}>Reset</button>
        </div>
        {/*компонент модального окна*/}
        <ModalWindow
          showModal={this.state.showModal}
          changeStatusSeatHandler={this.changeStatusSeatHandler}
          seat={this.state.seat}
          price={this.state.priceAll}
          className="block-modal"
        />
      </div>
    )
  }
}
