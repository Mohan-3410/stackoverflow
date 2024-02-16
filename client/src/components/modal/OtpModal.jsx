import React, { useState } from 'react';
import { forwardRef } from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineClose } from "react-icons/ai";
import OtpInput from "otp-input-react"
import { MdEmail } from "react-icons/md";
import "./OtpModal.css"
import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

const OtpModal = forwardRef(function OtpModal({ props }, ref) {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isOTP, setIsOTP] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleClick = async () => {
        try {
            const response = await axiosClient.post('/bot/verifyOtp', { email, otp });

            if (response.data.success) {
                localStorage.setItem('botuser', response.data.user)
                setIsCodeVerified(true);
                navigate('/chatbot')
            } else {
                alert('Incorrect OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickSend = async () => {
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsButtonDisabled(true);

        try {
            const response = await axiosClient.post('/bot/sendOtp', { email });

            setIsOTP(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <dialog className="result-modal" ref={ref}>
            <form method='dialog'>
                <h2 style={{ margin: "0" }}>Ask Question with AI 🤖</h2>
                <button className='close'><AiOutlineClose size={22} /></button>
            </form>
            {!isOTP ?
                <>
                    <label htmlFor="otp" className='otp'><div className='mail'>
                        <MdEmail size={22} />
                    </div>Email Verification
                    </label>
                    <input type="email" id='otp' onChange={e => setEmail(e.target.value)} />
                    <button className='submit' onClick={handleClickSend} disabled={isButtonDisabled}>Send Email</button>
                </>
                :
                <>
                    <label htmlFor="otp" className='otp'><div className='mail'>
                        <BsFillShieldLockFill size={22} />
                    </div>Enter your OTP</label>
                    <OtpInput value={otp}
                        style={{ padding: "10px" }}
                        onChange={setOtp}
                        OTPLength={6} disabled={false} otpType="number"></OtpInput>
                    <button className='submit' onClick={handleClick}>Verify OTP</button>
                </>
            }
            {isCodeVerified && <p>OTP verified successfully!</p>}
        </dialog>
    );
});

export default OtpModal;
