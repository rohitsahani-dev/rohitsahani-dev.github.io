"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

export function RelativeCountdown({ date }: { date: string | Date }) {
  const [label, setLabel] = useState(() => formatDistanceToNowStrict(new Date(date), { addSuffix: true }));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLabel(formatDistanceToNowStrict(new Date(date), { addSuffix: true }));
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [date]);

  return <span>{label}</span>;
}
