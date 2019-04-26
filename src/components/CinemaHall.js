import React from 'react';
import seats from '../data/seats.json'

export class CinemaHall extends React.Component{
  render() {
      const seatsJSX = seats.map(seat => {

        let className = seat.status === "0" ? 'seat' : 'seat busy';
        let title = seat.status === "0" ? "free " + "$" + seat.price : "busy";

        return (
          <div
            className={ className }
            key={ seat.id }
            title={ title }
          >
          </div>
        );
    });

    return (
      <div className="content">
        <div className="container">
          <h2>Cinema Hall</h2>
          <div className="seats">
            { seatsJSX }
          </div>
          <div className="legend">
            <div className="seat">Свободно</div>
            <div className="seat busy">Занято</div>
          </div>
        </div>
      </div>
    )
  }
}
