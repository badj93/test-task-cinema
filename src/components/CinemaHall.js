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
    /* собираем уникальный список */
    this.setState({
      rows: [...new Set(rows)]
    });
  }

  /* открывает модальное окно + получает инфо о месте */
  reserveSeatHandler = (seat, index) => {
    let seatsNew = this.state.seatsJSX;
    let seatNew = seatsNew.find(item => item.id === seat.id);
    /* если не занято место */
    if (!seatNew.status) {
      /* помечаем как выбранное */
      seatNew.choice = !seatNew.choice;
      /* если выбранное */
      if (seatNew.choice) {
        /* считаем сумму билета/ов */
        this.setState({
          priceAll: (Number(seatNew.price) + this.state.priceAll)
        });
      } else {
        this.setState({
          priceAll: (this.state.priceAll - Number(seatNew.price))
        });
      }
    }

    this.setState({
      seat: this.state.seatsJSX[index]
    });
  };

  /* сброс данных */
  clearData = () => {
    /* аналогично кнопке Reserved */
    if (this.state.priceAll > 0) {
      let seats = this.state.seatsJSX;

      let seatsReset = seats.map(seat => {
        seat.choice = false;
        return seat;
      });

      this.setState({
        priceAll: 0,
        seatsJSX: seatsReset
      });
    }
  };

  /* открываем модальное окно */
  showModal = () => {
    /* нет смысла открывать окно без выбранных мест */
    if (this.state.priceAll > 0) {
      this.setState({
        showModal: true
      });
    }
  };

  /* меняем статус брони, если место свободно */
  changeStatusSeatHandler = (flag) => {
    console.log(flag)
    let seatsNew = [];
    /* если нажали бронировать */
    if (flag) {
      /* места выбранные помеччаем как бронированые */
      seatsNew = this.state.seatsJSX.map(seat => {
        if (seat.choice) {
          seat.status = true;
          seat.choice = false
        }
        return seat;
      });

      this.setState({
        seatsJSX: seatsNew
      });
    }

    this.clearData();

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
          <button onClick={this.showModal} className={this.state.priceAll > 0 ? null : 'disabled-button'}>Reserved</button>
          <button onClick={this.clearData} className={this.state.priceAll > 0 ? null : 'disabled-button'}>Reset</button>
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
