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

  showInputPhone = (flag) => {
    if (this.state.phone.length === 12) {
      this.props.changeStatusSeatHandler(this.props.seat, flag)
    }

    this.setState({
      phone: ''
    })
  };

  render() {

    let flag = true;

    let phoneSelector = document.getElementsByClassName('input-phone');
    let mask = new InputMask("+7(999)-999-99-99");
    mask.mask(phoneSelector);

    return (
      <div style={this.props.showModal ? null : {position: "absolute"}}>
        <div className={this.props.showModal ? 'overlay' : 'hidden'}></div>
        <div className={this.props.showModal ? 'modal' : 'hidden'}>
          <span className="close-modal" onClick={this.props.changeStatusSeatHandler}></span>
          <p className="desc">Price All: ${this.props.price}</p>
          {
            this.props.seat.status
            ? null
            : <input placeholder="Input number phone" className='input-phone' id="input-phone"  type="text" onChange={this.inputPhone}/>
          }
          <button
            className="btn-modal"
            onClick={this.showInputPhone.bind(this, flag)}
          >
            Reserved
          </button>
        </div>
      </div>
    )
  }
}
