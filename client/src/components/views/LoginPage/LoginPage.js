import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from "react-redux"
import { loginUser } from '../../../_actions/user_actions';

function LoginPage(props) {
    const dispatch = useDispatch(); // redux를 위한 dispatch

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();     // page refresh를 막아줌

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))   // loginUser라는 액션에 body를 넣음
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')     // props.history.push() 를 통해 페이지 이동
                } else {
                    alert('Failed to login')
                }
            })
    }


    return (
        <div style= {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage