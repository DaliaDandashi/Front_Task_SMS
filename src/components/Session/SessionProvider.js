import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { setCookie, getCookie, removeCookie } from '../../cookies';
import { toast } from 'react-toastify';

export default function SessionProvider({ children }) {

    const [session, setSession] = useState({
        user: {
            id: getCookie('id'),
            token: getCookie('token'),
        }
    });

    function updateSession(nextSession) {
        setSession(prevSession => ({
            ...prevSession,
            ...nextSession
        }))
    }

    useEffect(() => {
        let id = getCookie('id');
        let token = getCookie('token');
        if (token) fetch(`http://localhost:8000/user/${id}`, {
            headers: {
                'token': token
            }
        }).then(res => res.json()).then(res => {
            let data = res.result;
            updateSession({
                user: { ...data }
            });
        });
    }, []);


    async function login({ username, password }) {
        let { error, id = 4, token } = await fetch('http://localhost:8000/login', {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(res => res.json());
        if (error || !token) return toast.error(error);
        let response = await fetch(`http://localhost:8000/user/${id}`, {
            headers: {
                'token': token
            }
        }).then(res => res.json());

        setCookie('id', id, 30);
        setCookie('token', token, 30);

        updateSession({ user: { ...response.result } });

        toast.success(`Welcome ${response.result.firstname}!`);
    }



    async function logout() {
        let id = getCookie('id');
        let token = getCookie('token');

        let body = null;
        body = new URLSearchParams();

        body.append('token', token);
        body.append('id', id);

        await fetch(`http://localhost:8000/logout`, {
            method: "post",
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })

        updateSession({ user: {} });
        removeCookie('id');
        removeCookie('token');
    }

    const context = {
        session,
        actions: {
            login,
            logout,
            updateSession
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}