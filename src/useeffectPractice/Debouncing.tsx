import React, { useState, useEffect } from "react";

function Debouncing() {
    interface Apiresponse {
        users: User[],
        total: number,
        skip: number,
        limit: number
    }
    interface User {
        firstName: string,
        lastName: string
    }
    const [user, setuser] = useState<User[]>([])
    const [inputvalue, setInputvalue] = useState<string>('')
    const fetchUser = async () => {
        try {
            if (!inputvalue) return;
            const res = await fetch(`https://dummyjson.com/users/search?q=${inputvalue}`)
            if (!res.ok) {
                throw new Error('Error in response')
            }
            const { users }: Apiresponse = await res.json();
            setuser(users);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const debounceInstance = setTimeout(() => {
            fetchUser();
        }, 2000);

        return () => clearTimeout(debounceInstance);
    }, [inputvalue]);

    return (
        <div className="flex items-center">
            <input type="text" placeholder="enter a name..." className="px-1 py-1" value={inputvalue} onChange={e => setInputvalue(e.target.value)} />
            <div className="flex items-center ">
                {user.map((item, ind) => (
                    <div key={ind} className="flex items-center bg-gray-300 mb-1 border-gray-700">
                        <span>{item.firstName} {item.lastName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Debouncing;
