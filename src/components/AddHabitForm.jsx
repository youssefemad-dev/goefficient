import React, { useEffect, useState } from "react";
import { useHabits } from "../context/HabitContext";
import { BiColor } from "react-icons/bi";

export default function AddHabitForm(){
  const { addHabit } = useHabits();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [totalDays, setTotalDays] = useState(30);

  useEffect(()=>{
    const btn = document.querySelector('#addBtn');
    const onClick = () => setOpen(o => !o);
    btn && btn.addEventListener('click', onClick);
    return () => { btn && btn.removeEventListener('click', onClick); };
  },[]);

  function onSave(e){
    e && e.preventDefault();
    if(!name.trim()) return;
    addHabit({ name: name.trim(), totalDays });
    setName(""); setTotalDays(30); setOpen(false);
  }

  return (
    <section id="addForm" className={`card add-form ${open? 'show':'hidden'}`}>
      <h3 >Add New Habit</h3>
      <label className="label">Habit name</label>
      <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Read 20 pages" />
      <label className="label">Number of days</label>
      <input className="input small" type="number" min="1" value={totalDays} onChange={e=>setTotalDays(Number(e.target.value))} />
      <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:8}}>
        <button className="btn" onClick={()=>{ setOpen(false); setName(''); setTotalDays(30); }}>Cancel</button>
        <button className="btn primary" onClick={onSave}>Save</button>
      </div>
    </section>
  );
}
