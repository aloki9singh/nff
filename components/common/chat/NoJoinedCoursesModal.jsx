import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import React, { useState, Fragment } from "react";

export default function NoJoinedCoursesModal({ message }) {
  let [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    router.push("/beta/courseoverview");
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#373A41] p-6 text-left align-middle shadow-sm border-gray-400 shadow-gray-600 transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    No Joined Courses
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white/70">
                      {message ||
                        "You have not joined any courses yet. Please join a course to start chatting."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent text-primary px-4 py-2 text-sm font-semibold  hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      Go Back
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary/90 px-4 py-2 text-sm font-medium text-white hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Join Course
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
