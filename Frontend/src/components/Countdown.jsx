import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <>
    <p className="font-bold text-black">Auction Will be End In: </p>
    <div className="flex gap-3 text-center">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="border border-primary shadow-md rounded-xl px-4 py-2 w-20"
        >
          <div className="text-xl font-extrabold text-primary">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500 uppercase">{unit.label}</div>
        </div>
      ))}
    </div>
    </>

  );
};

export default CountdownTimer;
