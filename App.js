import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [slots, setSlots] = useState(Array(20).fill(null))
  const [booked, setBooked] = useState(0)
  const [blank, setBlank] = useState(20)
  const [totalTime, setTotalTime] = useState('00:00')
  const [amountToBePaid, setAmountToBePaid] = useState(0)

  const manageArrival = (i) => {
    const carNumber = prompt('Car Number: XX-00-XX-0000')
    const timeArrival = prompt('Arrival Time: HH:MM:')
    const getSlots = [...slots]
    const regex = new RegExp("^[A-Z]{2}[-][0-9]{1,2}[-][A-Z]{1,2}[-][0-9]{3,4}$")
    const regexTime = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")

    if (carNumber == ('' || null) || timeArrival == ('' || null)) {
      return alert('Please fill data...!')
    } else if (regex.test(carNumber)) {
      if (regexTime.test(timeArrival)) {
        getSlots[i] = {
          carNumber,
          timeArrival
        }
        setSlots(getSlots)
        setBooked(booked + 1)
        setBlank(blank - 1)
      } else {
        alert('Invalid time format...! Recommended: HH:MM')
      }
    } else if (!regex.test(carNumber) && !(carNumber == '')) {
      alert('Please enter Registration Number in valid format...!')
    } else {
      alert('Please enter valid data...!')
    }


    // if(regex.test(carNumber)) {
    //   if(regexTime.test(timeArrival)){
    //     getSlots[i] = {
    //       carNumber,
    //       timeArrival
    //     }
    //     setSlots(getSlots)
    //     setBooked(booked + 1)
    //     setBlank(blank - 1)
    //   }
    //   return alert('Invalid time format!')
    // } else {
    //   alert('please enter valid data!')
    // }
  }

  const manageDepart = (i) => {
    const car = slots[i]
    const timeDepart = prompt('Depart time :')
    const regexTime = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")
    if (regexTime.test(timeDepart)) {
      const timess = countTotalTime(car.timeArrival, timeDepart)
      const today1h = new Date().setHours(car.timeArrival.split(":")[0])
      const today2h = new Date().setHours(timeDepart.split(":")[0])
      console.log(today1h);
      console.log(today2h);
      // console.log(timess[0]+ timess[1]);
      // const today1m = new Date().setMinutes(car.timeArrival.split(":")[1])
      // const today2m = new Date().setMinutes(car.timeDepart.split(":")[1])
      if ((parseInt(timess[0]) === 0)) {
        alert('Please enter valid Departure time...!')
      } else if (parseInt(timess) > 8) {
        alert("You cann't park for more than 8 hours...!")
        const getSlots = [...slots]
        getSlots[i] = null
        setSlots(getSlots)
        setBooked(booked - 1)
        setBlank(blank + 1)
        console.log("action done !!!");
      } else {
        const getSlots = [...slots]
        getSlots[i] = null
        setSlots(getSlots)
        setBooked(booked - 1)
        setBlank(blank + 1)
        console.log("action done");
      }
    } else {
      alert("Invalid time format...!")
    }
  }

  const countTotalTime = (timeArrival, timeDepart) => {
    // function removeColon(t) {
    //   if (t)
    //     t = t.replace(":", "");

    //   return parseInt(t);
    // }
    function diff(t1, t2) {
      // let time1 = removeColon(t1);
      // let time2 = removeColon(t2);
      // let hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);
      // let minDiff = parseInt(time2 % 100 + (60 - time1 % 100));
      // if (minDiff >= 60) {
      //   hourDiff++;
      //   minDiff = minDiff - 60;
      // }
      var [h1, m1] = t1.split(":")
      var [h2, m2] = t2.split(":")

      h1 = parseInt(h1)
      m1 = parseInt(m1)
      h2 = parseInt(h2)
      m2 = parseInt(m2)

      var totalM1 = h1 * 60 + m1
      var totalM2 = h2 * 60 + m2

      var diffM = totalM2 - totalM1

      var hourDiff = Math.floor(diffM / 60)
      var minDiff = diffM % 60
      console.log(hourDiff);
      console.log(minDiff);
      let res = (hourDiff).toString() + ':' + (minDiff < 9 && minDiff > 0 ? '0' + (minDiff).toString() : (minDiff === 0 ? '00' : (minDiff).toString()));
      // console.log(res);
      // const resSplit = parseInt(res.split(':')[0])
      // console.log(resSplit);
      // const fres = res.split(":")
      return ((hourDiff < 0) ? '00:00' : res);
    }
    setTotalTime(diff(timeArrival, timeDepart))
    return diff(timeArrival, timeDepart)
    // console.log(diff(timeArrival, timeDepart))
  }

  useEffect(() => {
    const t1 = totalTime.split(':')
    // console.log(t1);
    var countTime = 0

    if (t1[0] == 0) {
      if (t1[1] == 0) {
        countTime = 0
      } else {
        countTime = 1
      }
    } else {
      if (t1[1] != 0) {
        countTime = parseInt(t1[0]) + 1
      } else {
        countTime = parseInt(t1[0])
      }
    }

    if (countTime === 0) {
      setAmountToBePaid(0)
    } else if (countTime > 0 && countTime <= 1) {
      setAmountToBePaid(20)
    } else if (countTime > 1 && countTime <= 4) {
      setAmountToBePaid(40)
    } else if (countTime >= 4 && countTime <= 6) {
      setAmountToBePaid(100)
    } else if (countTime >= 6 && countTime <= 8) {
      setAmountToBePaid(200)
    } else {
      setAmountToBePaid(2000)
      alert("You are liable to pay fine of Rs. 2000/-")
    }

  }, [totalTime])


  return (
    <div className="App">
      <div className='row gap-2 border border-secondary p-5 mx-auto w-75'>
        {slots.map((slot, i) => (
          <div className={`slot col-2  border p-auto ${slot ? 'booked' : ""}`} onClick={() => (slot ? manageDepart(i) : manageArrival(i))}>
            {slot ? `${i + 1} (${slot.carNumber})\n ${slot.timeArrival}` : i + 1}
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
