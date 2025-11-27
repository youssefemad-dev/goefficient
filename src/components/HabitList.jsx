import React from "react";
import { useHabits } from "../context/HabitContext";
import HabitItem from "./HabitItem";

export default function HabitList(){
  const { habits, completed, removeCompleted, removeIncomplete } = useHabits();

  return (
    <div>
      <section className="list">
        {habits.length === 0 ? <p className="muted">No active habits yet. Add one using Add Habit</p> : habits.map(h => <HabitItem key={h.id} habit={h} />)}
      </section>

      <div style={{marginTop:12}}>
        {habits.length > 0 && <button className="btn danger" onClick={()=>{ if(confirm('Delete all incomplete habits?')) removeIncomplete() }}>Delete Incomplete Habits</button>}
      </div>

      <p className="muted small" style={{marginTop:18}}>Tip: Click <strong>Done</strong> to mark today's completion.</p>

      <section style={{marginTop:24}}>
        <h3>Completed Habits ✅</h3>
        <div className="list">
          {completed.length === 0 ? <p className="muted">No completed habits yet.</p> : completed.map(h => (
            <div key={h.id} className="card habit-item completed">
              <div style={{flex:1}}>
                <div className="title-row"><h3 className="habit-name">{h.name}</h3><div className="pct">100%</div></div>
                <div className="muted small">Completed {h.totalDays} / {h.totalDays} days</div>
                <div style={{marginTop:8}} className="muted small">Finished: {h.finishedAt ? new Date(h.finishedAt).toLocaleDateString() : ""}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:8}}>
          {completed.length > 0 && <button className="btn delete-completed" onClick={()=>{ if(confirm('Delete all completed habits?')) removeCompleted() }}>Delete Completed Habits</button>}
        </div>
      </section>
    </div>
  );
}
