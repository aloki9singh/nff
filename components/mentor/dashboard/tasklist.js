import { useEffect, useState } from 'react';
import Todo from './todo';
import { db } from '@/config/firebaseconfig';
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
    // console.log(index);
    await updateDoc(doc(db, 'taskList', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'taskList', id));
  };

  return (
    <div className="h-fit mt-12 pt-2 rounded-2xl bg-[#373A41] text-white">
      <div className="flex justify-between w-[89%] mx-auto mt-4 items-center">
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
            <Popover.Panel className="absolute items-center right-[1rem] -mt-4 z-10">
              <div className=" text-center p-3">
                <div className="relative bg-[#373A41] text-black rounded-tl-lg rounded-b-lg ">
                  <form
                    onSubmit={createTask}
                    className="flex gap-3 items-center mr-10"
                  >
                    <input
                      value={input}
                      onChange={(ev) => setInput(ev.target.value)}
                      type="text"
                      className="bg-transparent border-2 w-[200px] text-white"
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
      <ul className="text-white my-2 py-2 items-center pr-5 ">
        {todos?.slice(0, 5).map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleComplete={()=>toggleComplete(index)}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}