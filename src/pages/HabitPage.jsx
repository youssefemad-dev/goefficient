import React from "react";
import { useHabits } from "../context/HabitContext";
import AddHabitForm from "../components/AddHabitForm";
import HabitList from "../components/HabitList";
import Stats from "../components/Stats";
import "../styles/habits.css";
export default function HabitPage(){
  const { habits, completed, deleteAll } = useHabits();

  return (
    <div className="app-bg">
      <main className="container animate-fade">
        <section className="top-row">
          <h2>Habits</h2>
          <div className="top-actions">
            {(habits.length + completed.length) > 0 && (
              <button className="btn danger" onClick={() => { if (confirm("Delete ALL habits?")) deleteAll(); }}>
                Delete All Habits
              </button>
            )}
            <button id="addBtn" className="btn primary">Add Habit</button>
          </div>
        </section>

        <AddHabitForm />
        <Stats />
        <HabitList />
      </main>
    </div>
  );
}
