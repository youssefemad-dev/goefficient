import React, { createContext, useContext, useEffect, useState } from "react";

const HabitContext = createContext();
const STORAGE = "habit_tracker_complete_v1";

function todayString() {
  return new Date().toDateString();
}

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      return raw ? JSON.parse(raw).habits || [] : [];
    } catch {
      // ignore error
      return [];
    }
  });

  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      return raw ? JSON.parse(raw).completed || [] : [];
    } catch {
      // ignore error
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ habits, completed }));
    } catch {
      // ignore error
    }
  }, [habits, completed]);

  const addHabit = ({ name, totalDays }) => {
    const h = {
      id: Date.now(),
      name,
      totalDays: Number(totalDays) || 30,
      remaining: Number(totalDays) || 30,
      createdAt: new Date().toISOString(),
      lastDone: null,
    };
    setHabits((p) => [h, ...p]);
  };

  const removeHabit = (id) => setHabits((p) => p.filter((x) => x.id !== id));

  const removeCompleted = () => {
    setCompleted([]);
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ habits, completed: [] }));
    } catch {
      // ignore error
    }
  };

  const removeIncomplete = () => {
    setHabits([]);
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ habits: [], completed }));
    } catch {
      // ignore error
    }
  };

  const deleteAll = () => {
    setHabits([]);
    setCompleted([]);
    try {
      localStorage.removeItem(STORAGE);
    } catch {
      // ignore error
    }
  };

  const markDone = (id) => {
    const today = todayString();

    setHabits((prev) => {
      const next = prev
        .map((h) => {
          if (h.id !== id) return h;
          if (h.lastDone === today) return h;

          const rem = (h.remaining || h.totalDays) - 1;
          const updated = { ...h, remaining: rem, lastDone: today };

          if (rem <= 0) {
            // prevent duplicates
            setCompleted((prevC) => {
              const exists = prevC.some((x) => x.id === updated.id);
              if (exists) return prevC;

              return [
                { ...updated, finishedAt: new Date().toISOString() },
                ...prevC,
              ];
            });
            return null;
          }

          return updated;
        })
        .filter(Boolean);

      return next;
    });
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        completed,
        addHabit,
        removeHabit,
        removeCompleted,
        removeIncomplete,
        deleteAll,
        markDone,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useHabits = () => useContext(HabitContext);
