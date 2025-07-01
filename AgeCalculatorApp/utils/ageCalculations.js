// Age calculation utilities

export const getDetailedAge = (birthDate, currentDate) => {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total time lived
  const timeDiff = currentDate.getTime() - birthDate.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const totalHours = Math.floor(timeDiff / (1000 * 3600));
  const totalMinutes = Math.floor(timeDiff / (1000 * 60));
  const totalSeconds = Math.floor(timeDiff / 1000);

  // Calculate next birthday
  const nextBirthday = getNextBirthday(birthDate, currentDate);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

  // Get day of week born
  const dayOfWeekBorn = getDayOfWeek(birthDate);

  // Calculate fun statistics
  const estimatedHeartbeats = Math.floor(totalMinutes * 75); // Average 75 BPM
  const estimatedBreaths = Math.floor(totalMinutes * 16); // Average 16 breaths per minute
  const earthRotations = totalDays;
  const weeksLived = Math.floor(totalDays / 7);
  const monthsLived = Math.floor(totalDays / 30.44); // Average month length

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday,
    daysUntilBirthday,
    dayOfWeekBorn,
    estimatedHeartbeats,
    estimatedBreaths,
    earthRotations,
    weeksLived,
    monthsLived,
  };
};

export const getNextBirthday = (birthDate, currentDate) => {
  const nextBirthday = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // If birthday has passed this year, get next year's birthday
  if (nextBirthday <= currentDate) {
    nextBirthday.setFullYear(currentDate.getFullYear() + 1);
  }

  return nextBirthday;
};

export const getDayOfWeek = (date) => {
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];
  return days[date.getDay()];
};

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getAgeCategory = (years) => {
  if (years < 1) return 'Infant';
  if (years < 3) return 'Toddler';
  if (years < 5) return 'Preschooler';
  if (years < 12) return 'Child';
  if (years < 18) return 'Teenager';
  if (years < 25) return 'Young Adult';
  if (years < 40) return 'Adult';
  if (years < 60) return 'Middle-aged';
  if (years < 80) return 'Senior';
  return 'Elder';
};

export const getZodiacSign = (month, day) => {
  const zodiacSigns = [
    { name: 'Capricorn', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', start: [2, 19], end: [3, 20] },
    { name: 'Aries', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', start: [6, 21], end: [7, 22] },
    { name: 'Leo', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', start: [8, 23], end: [9, 22] },
    { name: 'Libra', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
  ];

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return sign.name;
    }
  }
  
  return 'Unknown';
};

export const getBirthstone = (month) => {
  const birthstones = [
    'Garnet', 'Amethyst', 'Aquamarine', 'Diamond',
    'Emerald', 'Pearl', 'Ruby', 'Peridot',
    'Sapphire', 'Opal', 'Topaz', 'Turquoise'
  ];
  return birthstones[month - 1] || 'Unknown';
};