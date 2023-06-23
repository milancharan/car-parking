import { useState } from 'react';
import Data from "./assets/Data.json"
import './App.css';

function App() {
  const [slots, setSlots] = useState(Array(20).fill())
  const [booked, setBooked] = useState(0)
  const [blank, setBlank] = useState(20)

  const manageArrival = (i) => {
    const carNumber = prompt('Car Number :')
    const timeArrival = prompt('Arrival Time (HH:MM):')
    const getSlots = [...slots]
    getSlots[i] = {
      carNumber,
      timeArrival
    }
    setSlots(getSlots)
    setBooked(booked+1)
    setBlank(blank-1)
  }

  const manageDepart = (i) => {
    const car = slots[i]
    const timeDepart = prompt('Depart time :')
  const totalTime = countTotalTime(car.timeArrival, timeDepart)
  const amountToBePaid = countAmountToBePaid(countTotalTime)
  const getSlots = [...slots]
  getSlots[i] = null
  setSlots(getSlots)
  setBooked(booked-1)
  setBlank(blank+1)

  alert(`Amount to Pay: ${amountToBePaid}`)
  }

  const countTotalTime = (timeArrival, timeDepart) => {
    const timeArr = timeArrival.split(":")
    const timeDept = timeDepart.split(":")
    const timeNow = new Date(2000, 0, 1, timeDept[0], timeDept[1])
    const timeAtArrival = new Date(2000, 0, 1, timeArr[0], timeArr[1])
    console.log(timeNow);
    console.log(timeAtArrival);
    console.log(new Date(timeNow - timeAtArrival).getHours());
    return(
      timeNow - timeAtArrival
      )
  }

  const countAmountToBePaid = (totalTime) => {
    if(totalTime <= 1){
      return 20
    } else if(totalTime >= 2 && totalTime <= 4){
      return 40
    } else if(totalTime >= 4 && totalTime <= 6) {
      return 100
    } else if (totalTime >= 6 && totalTime <= 8) {
      return 200
    } else if(totalTime > 8) {
      alert("You cann't park car for more than 8 hours")
    }
  }



  return (
    <div className="App">
      <table>
        <tbody>
              {slots.map((slot, i) => (
                <tr>
                  <td className={`slot ${slot ? 'booked' : ""}`} onClick={() => (slot ? manageDepart(i) : manageArrival(i))}>
                    {slot ? `${1} ${slot.carNumber}\n ${slot.timeArrival}` : '1'}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
                <p>Booked Slots: {booked}</p>
                <p>Blank Slots: {blank}</p>
                <p>Total Time: {countTotalTime}</p>
                <p>Amount To Pay: {countAmountToBePaid}</p>
            </div>
    </div>
  );
}

export default App;
