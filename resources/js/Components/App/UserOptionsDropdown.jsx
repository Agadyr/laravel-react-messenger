import {Menu, MenuButton, MenuItem, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon
} from "@heroicons/react/24/solid/index.js";
import axios from "axios";

export default function UserOptionsDropdown({ conversation }){
    const changeUserRole = () => {
        console.log("Change user role")
        if(!conversation.is_user) {
            return
        }

        axios
            .post(route("user.ChangeRole", conversation.id))
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onBlockUser = () => {
        console.log("Block user")
        if(!conversation.is_user) {
            return
        }

        axios
            .post(route("user.blockUnBlock", conversation.id))
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="flex justify-center items-center w-8 h-8
                    rounded-full hover:ring-black/40">
                        <EllipsisVerticalIcon className="h-5 w-5"/>
                    </MenuButton>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transform ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        <div className="px-1 py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={onBlockUser}
                                        className={`${active
                                        ? "bg-black/30 text-white" : "text-gray-100"}
                                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {conversation.blocked_at && (
                                            <>
                                                <LockOpenIcon className="w-4 h-4 mr-2" />
                                                Unblock User
                                            </>
                                        )}
                                        {!conversation.blocked_at && (
                                            <>
                                                <LockClosedIcon className="w-4 h-4 mr-2" />
                                                block User
                                            </>
                                        )}
                                    </button>
                                )}
                            </MenuItem>
                        </div>
                        <div className="px-1 py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={changeUserRole}
                                        className={`${active
                                            ? "bg-black/30 text-white" : "text-gray-100"}
                                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {conversation.is_admin && (
                                            <>
                                                <UserIcon className="w-4 h-4 mr-2" />
                                                Make Regular User
                                            </>
                                        )}
                                        {!conversation.is_admin && (
                                            <>
                                                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                Make Admin
                                            </>
                                        )}
                                    </button>
                                )}
                            </MenuItem>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
