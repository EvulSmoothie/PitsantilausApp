import React from 'react'
//Ilmoitusviestin näyttö , jos viestiä ei ole niin ei näytetä mitään. Jos on viesti se näytetään.
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="popup">
        {message}
      </div>
    )

  }
  export  default  Notification