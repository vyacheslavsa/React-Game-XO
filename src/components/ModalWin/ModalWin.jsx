import React from 'react'
import "../ModalWin/ModalWin.scss";

const ModalWin = ({setModalWinState,title,cleanValues,setBlurBack}) => {

  const closedModal =() =>{
    setModalWinState(false)
    cleanValues()
    setBlurBack(false)
  }

  return(
    <div className='main'>
      <div className='modalWin'>
        <div className='closedMoadalWin' onClick={()=>closedModal()}>
          <p>+</p>
        </div>
        <div className='title'>{title}</div>
      </div>
    </div>
  )
}

export default ModalWin