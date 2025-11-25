import React from "react";
import { useHabits } from "../context/HabitContext";

export default function HabitItem({ habit }){
  const { markDone, removeHabit } = useHabits();
  const pct = Math.max(0, Math.round(((habit.totalDays - habit.remaining)/habit.totalDays)*100));
  const doneToday = habit.lastDone === new Date().toDateString();

  return (
    <div className="card habit-item fade-in">
      <div style={{flex:1}}>
        <div className="title-row">
          <h3 className="habit-name">{habit.name}</h3>
          <div className="pct">{pct}%</div>
        </div>
        <div className="muted small">{Math.max(0, habit.remaining)} days left</div>

        <div className="progress-bar" aria-hidden>
          <div className="progress" style={{width:`${pct}%`}}></div>
        </div>
      </div>

      <div className="habit-actions">
        <span className="small muted">{habit.totalDays}d</span>
        <button className={`btn ${doneToday? 'disabled':'success'}`} onClick={()=>markDone(habit.id)} disabled={doneToday}>{doneToday? 'Done Today':'Done'}</button>
        <button className="btn danger" onClick={()=>{ if(confirm('Remove this habit?')) removeHabit(habit.id) }}>Remove</button>
      </div>
    </div>
  );
}
