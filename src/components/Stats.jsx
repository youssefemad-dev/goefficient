import React from "react";
import { useHabits } from "../context/HabitContext";

export default function Stats(){
  const { habits, completed } = useHabits();
  const total = habits.length + completed.length;
  const completedDays = habits.reduce((a,h)=>a+(h.totalDays - (h.remaining||0)),0) + completed.reduce((a,h)=>a+(h.totalDays||0),0);
  const totalTarget = habits.reduce((a,h)=>a+(h.totalDays||0),0) + completed.reduce((a,h)=>a+(h.totalDays||0),0);
  const pct = totalTarget ? Math.round((completedDays/totalTarget)*100) : 0;
  return (
    <section id="stats" className="card stats-card">
      <div className="stat"><div className="big" id="totalHabits">{total}</div><div className="muted small">Habits</div></div>
      <div className="stat"><div className="big" id="totalDone">{completedDays}</div><div className="muted small">Total Completions</div></div>
      <div className="stat"><div className="big" id="completionPct">{pct}%</div><div className="muted small">Overall Progress</div></div>
    </section>
  );
}
