import React, { useState } from 'react';
import { ReactComponent as DownArrowSvg } from './circle-arrow-down-solid.svg';

function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState(null);

  const handleDayChange = (event) => {
    const newDay = event.target.value;
    setDay(newDay);
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setMonth(newMonth);
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setYear(newYear);
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      setError('Please enter valid day, month, and year.');
      return;
    }

    setError(null);
    const currentDate = new Date();
    const inputDay = parseInt(day, 10);
    const inputMonth = parseInt(month, 10);
    const inputYear = parseInt(year, 10);

    const birthdate = new Date(inputYear, inputMonth - 1, inputDay);

    if (
      birthdate.getDate() !== inputDay ||
      birthdate.getMonth() !== inputMonth - 1 ||
      birthdate.getFullYear() !== inputYear
    ) {
      setError('Please enter a valid date.');
      return;
    }

    // Calculate age
    const ageDiffMs = currentDate - birthdate;
    const ageDate = new Date(ageDiffMs);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setAge({ years, months, days });
  };

  const validateInputs = () => {
    const inputDay = parseInt(day, 10);
    const inputMonth = parseInt(month, 10);
    const inputYear = parseInt(year, 10);

    if (inputMonth < 1 || inputMonth > 12) {
      return false;
    }

    if (inputDay < 1 || inputDay > 31) {
      return false;
    }

    if (inputYear < 1900 || inputYear > new Date().getFullYear()) {
      return false;
    }

    if (
      (inputMonth === 4 || inputMonth === 6 || inputMonth === 9 || inputMonth === 11) &&
      inputDay > 30
    ) {
      return false;
    } else if (inputMonth === 2) {
      if (inputDay > 29 || (inputDay > 28 && !isLeapYear(inputYear))) {
        return false;
      }
    }

    return true;
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  return (
    <div className='container mx-auto'>
      <div className="border p-4  flex flex-col items-start container-wrap">
        <div className='flex flex-row'>
            <div className="flex flex-col calculate-input calculate-wrap">
            <label htmlFor="day" className="mb-1 text-left">
              Day
            </label>
            <input
              type="number"
              id="day"
              value={day}
              onChange={handleDayChange}
              placeholder="DD"
              className="border input-wrap"
            />
          </div>
          <div className="flex flex-col month-calculate calculate-input calculate-wrap">
            <label htmlFor="month" className="mb-1 text-left">
              Month
            </label>
            <input
              type="number"
              id="month"
              value={month}
              onChange={handleMonthChange}
              placeholder="MM"
              className="border input-wrap"
            />
          </div>
          <div className="flex flex-col calculate-input calculate-wrap">
            <label htmlFor="year" className="mb-1 text-left">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={handleYearChange}
              placeholder="YYYY"
              className="border input-wrap"
            />
          </div>
        </div>
      <div className='w-full'>
        <div className='calculate-btn-wrap items-end relative'>
        <div className='calculate-btn'>
            <main onClick={calculateAge}>
            <DownArrowSvg />
          </main>
        </div>
        </div>
    
              {error && <p className="text-red-500">{error}</p>}
              {age !== null && (
  <div className='age-info-wrap'>
    <p><span className='age-info'>{age.years}</span> years</p>
    <p><span className='age-info'>{age.months}</span> months</p>
    <p><span className='age-info'>{age.days}</span> days</p>
  </div>
)}

      </div>
      
    </div>
 </div>
    
  );
  
  
}

export default AgeCalculator;
