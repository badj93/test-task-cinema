import React from 'react';
import InputMask from 'inputmask'

export class ModalWindow extends React.Component {

  state = {
    phone: ''
  };

  inputPhone = (event) => {
    this.setState({
      phone: event.target.value.replace(/[^+\d]/g, '')
    })
  };

  /* вызов метода из CinemaHall */
  showInputPhone = (flag) => {
    /* проверяем чтоб был полный номер */
    if (this.state.phone.length === 12) {
      this.props.changeStatusSeatHandler(flag)
    }
  };

  render() {

    let phoneSelector = document.getElementsByClassName('input-phone');
    let mask = new InputMask("+7(999)-999-99-99");
    mask.mask(phoneSelector);

    return (
      <div style={this.props.showModal ? null : {position: "absolute"}}>
        <div className={this.props.showModal ? 'overlay' : 'hidden'}></div>
        <div className={this.props.showModal ? 'modal' : 'hidden'}>
          <span className="close-modal" onClick={this.props.changeStatusSeatHandler.bind(this, false)}></span>
          <p className="desc">Price All: ${this.props.price}</p>
          {
            this.props.price === 0
            ? null
            : <input placeholder="Input number phone" className='input-phone' id="input-phone"  type="text" onChange={this.inputPhone}/>
          }
          <button
            className="btn-modal"
            onClick={this.showInputPhone.bind(this, true)}
          >
            Reserved
          </button>
        </div>
      </div>
    )
  }
}
