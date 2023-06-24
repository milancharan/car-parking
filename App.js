import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [slots, setSlots] = useState(Array(20).fill())
  const [booked, setBooked] = useState(0)
  const [blank, setBlank] = useState(20)
  const [totalTime, setTotalTime] = useState('')
  const [amountToBePaid, setAmountToBePaid] = useState(0)

  const manageArrival = (i) => {
    const carNumber = prompt('Car Number :')
    const timeArrival = prompt('Arrival Time (HH:MM):')
    const getSlots = [...slots]
    getSlots[i] = {
      carNumber,
      timeArrival
    }
    setSlots(getSlots)
    setBooked(booked + 1)
    setBlank(blank - 1)
  }

  const manageDepart = (i) => {
    const car = slots[i]
    const timeDepart = prompt('Depart time :')
    countTotalTime(car.timeArrival, timeDepart)
    const getSlots = [...slots]
    getSlots[i] = null
    setSlots(getSlots)
    setBooked(booked - 1)
    setBlank(blank + 1)
    
  }

  const countTotalTime = (timeArrival, timeDepart) => {
    function removeColon(t) {
      if (t)
        t = t.replace(":", "");

      return parseInt(t);
    }
    function diff(t1, t2) {
      let time1 = removeColon(t1);

      let time2 = removeColon(t2);
      let hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);
      let minDiff = parseInt(time2 % 100 + (60 - time1 % 100));
      if (minDiff >= 60) {
        hourDiff++;
        minDiff = minDiff - 60;
      }
      let res = (hourDiff).toString() + ':' + (minDiff < 9 && minDiff > 0 ? '0' + (minDiff).toString() : (minDiff === 0 ? '00' : (minDiff).toString()));
      return res;
    }

    setTotalTime(diff(timeArrival, timeDepart));
  }

  useEffect(() => {
    const t1 = totalTime.split(':')
    var countTime = 0
  
    if(t1[0] == 0){
      if(t1[1] == 0){
        countTime = 0
      } else {
        countTime = 0  
      }
    } else{
      if(t1[1]!=0){
        countTime = parseInt(t1[0]) + 1
      } else {
        countTime = parseInt(t1[0])
      }
    }
  
    if(countTime === 0) {
      setAmountToBePaid(0)
    }else if (countTime>0 && countTime <= 1 ) {
      setAmountToBePaid(20)
    } else if (countTime >= 2 && countTime <= 4) {
      setAmountToBePaid(40)
    } else if (countTime >= 4 && countTime <= 6) {
      setAmountToBePaid(100)
    } else if (countTime >= 6 && countTime <= 8) {
      setAmountToBePaid(200)
    } else if(countTime < 1 && countTime>=0) {
      setAmountToBePaid(0)
    } else{
      setAmountToBePaid(500)
      alert("You cann't park car for more than 8 hours")
    }

  },[totalTime])


  return (
    <div className="App"> 
      <div className='row gap-2 border border-secondary p-5 mx-auto w-75'>
          {slots.map((slot, i) => (
              <div className={`slot col-2  border p-auto ${slot ? 'booked' : ""}`} onClick={() => (slot ? manageDepart(i) : manageArrival(i))}>
                {slot ? `${i+1} (${slot.carNumber})\n ${slot.timeArrival}` : i+1}
              </div>
          ))}
      </div>
      <div className='container border w-25 border-dark mt-2'>
        <p>Booked Slots: {booked}</p>
        <p>Blank Slots: {blank}</p>
        <p>Total Time: {totalTime}</p>
        <p>Amount To Pay: {amountToBePaid}</p>
      </div>
    </div>
  );
}

export default App;
