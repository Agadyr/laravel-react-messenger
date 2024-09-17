import {UserIcon} from "@heroicons/react/16/solid/index.js";

const GroupAvatar = () => {
    return (
        <>
            <div className={`avatar placeholder`}>
                <div className={`bg-gray-400 text-gray-900 rounded-full w-8`}>
                    <span className="text-x1">
                        <UserIcon className="w-4"/>
                    </span>
                </div>
            </div>
        </>
    )
}

export default GroupAvatar
