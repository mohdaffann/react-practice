import React, { useState, useEffect } from "react";

function FetchApi() {
    interface responseAPI {
        limit: number,
        skip: number,
        total: number,
        users: User[]
    }
    interface User {
        id: number,
        firstName: string,
        age: number
    }

    const [user, setUser] = useState<User[]>([]);
    const [counter, setCounter] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const getUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://dummyjson.com/users?limit=5&skip=200&select=firstName,age`);
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

            const { users }: responseAPI = await res.json();
            setUser(users);
            console.log(user);



        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className="flex items-center">
            {loading ? (
                <div>Loading ...</div>
            ) : (

                user.map((item, ind) => (
                    <div key={ind} className="flex ">
                        <span>{item.firstName}</span>
                        <span>{item.age}</span>
                    </div>
                ))

            )}
            <div className="flex">
                <span>Count : {counter}</span>
                <button onClick={() => {
                    setCounter(prev => prev + 1);

                }}>Count</button>
            </div>

        </div>
    )
}

export default FetchApi;

/* 
NOTES : 
1. useEffect with no dependency array  initialization runs continuously , piling up the memory.
2. useEffect with empty deps array will run only once on mount
3. useEffect with proper value as dependency runs whenever the specified value is changed
4. useEffect with no cleanup function leads to memory leaks , specially with timer functions inside it

*/