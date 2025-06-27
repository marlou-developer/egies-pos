import React, { useState } from 'react'
import AddUserSection from './add-user-section'
import { useSelector } from 'react-redux'
import EditUserSection from './edit-user-section'
import DeleteUserSection from './delete-user-section'
import { FaUserGroup, FaUserPlus, FaUsers } from 'react-icons/fa6'

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UsersSection() {
    const { users } = useSelector((state) => state.users)

    const [openUser, setOpenUser] = useState(false);

    console.log('adsasd', users)
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaUserGroup className="float-left mt-1 mr-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">User Management</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => setOpenUser(true)}
                        className="relative inline-flex items-center rounded-l-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                    >

                        <FaUserPlus className="mr-1 text-pink-500" />
                        Add User
                    </button>
                    <AddUserSection
                        open={openUser}
                        setOpenUser={setOpenUser}
                    />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((person, personIdx) => (
                                    <tr key={person.email}>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8',
                                            )}
                                        >
                                            {person.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell',
                                            )}
                                        >
                                            {person.title}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell',
                                            )}
                                        >
                                            {person.email}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'px-3 py-4 text-sm whitespace-nowrap text-gray-500',
                                            )}
                                        >
                                            {person.user_type}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'relative py-2 text-center text-sm font-medium  ',
                                            )}
                                        >
                                            <div className="inline-flex items-center font-bold px-2 py-1 gap-2 ">
                                                <EditUserSection data={person} />
                                                <DeleteUserSection data={person} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
