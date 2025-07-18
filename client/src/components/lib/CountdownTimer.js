import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const difference = deadlineTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 6;

  return (
    <div className={`p-4 rounded-lg ${isUrgent ? 'bg-danger-50 border border-danger-200' : 'bg-primary-50 border border-primary-200'}`}>
      <h4 className={`text-sm font-medium mb-2 ${isUrgent ? 'text-danger-800' : 'text-primary-800'}`}>
        Time Remaining:
      </h4>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-lg p-2">
          <div className={`text-lg font-bold ${isUrgent ? 'text-danger-600' : 'text-primary-600'}`}>
            {timeLeft.days}
          </div>
          <div className="text-xs text-gray-600">Days</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className={`text-lg font-bold ${isUrgent ? 'text-danger-600' : 'text-primary-600'}`}>
            {timeLeft.hours}
          </div>
          <div className="text-xs text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className={`text-lg font-bold ${isUrgent ? 'text-danger-600' : 'text-primary-600'}`}>
            {timeLeft.minutes}
          </div>
          <div className="text-xs text-gray-600">Minutes</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className={`text-lg font-bold ${isUrgent ? 'text-danger-600' : 'text-primary-600'}`}>
            {timeLeft.seconds}
          </div>
          <div className="text-xs text-gray-600">Seconds</div>
        </div>
      </div>
      {isUrgent && (
        <div className="mt-2 text-center text-danger-600 text-sm font-medium">
          ⚠️ Deadline approaching!
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;