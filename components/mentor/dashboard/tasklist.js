import { useEffect, useState } from 'react';
import Todo from './todo';
import { db } from '@/config/firebaseConfig';
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TaskList() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');

  // Create todo
  const createTask = async (ev) => {
    ev.preventDefault(ev);
    if (input === '') {
      alert('Task Invalid');
      return;
    }
    await addDoc(collection(db, 'taskList'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'taskList'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskListArr = [];
      querySnapshot.forEach((doc) => {
        taskListArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(taskListArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'taskList', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'taskList', id));
  };

  return (
    <div className="w-80 h-80 mx-auto mt-10 mb-10 rounded-2xl bg-[#373A41] text-white">
      <div className="flex justify-between w-[90%] mx-auto mt-4 items-center">
        <h1 className="text-xl">Task List</h1>
        <Popover>
          <Popover.Button className="outline-none p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 rounded-full text-pink-600 bg-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute items-center right-36 -mt-4 z-10">
              <div className="h-48 w-36 text-center p-3">
                <div className="relative bg-[#373A41] text-black rounded-tl-lg rounded-b-lg">
                  <form
                    onSubmit={createTask}
                    className="flex gap-3 items-center"
                  >
                    <input
                      value={input}
                      onChange={(ev) => setInput(ev.target.value)}
                      type="text"
                      className="bg-transparent border-2 text-white"
                    />
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 rounded-full text-pink-600 bg-gray-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <ul className="text-white my-2 items-center p-4 ">
        {todos?.slice(0, 5).map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}