import { message, message as MESSAGE } from "antd";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login'
import "../css/Register.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, {useCallback, useState } from 'react'
export const configJSON = require("./Config");

const Register = () => {
    const navigate = useNavigate()
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [country_code, setCountry_code] = useState("")
    const [phone_no, setPhone_no] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirm_password] = useState("")
//     const [provider, setProvider] = useState('');
//   const [profile, setProfile] = useState(null);

//   const onLoginStart = useCallback(() => {
//     alert('login start');
//   }, []);

//   const onLogoutSuccess = useCallback(() => {
//     setProfile(null);
//     setProvider('');
//     alert('logout success');
//   }, []);
const responseFacebook = (response) => {
    console.log('Facebook response:', response);
    // Handle the Facebook response
  };

  const responseGoogle = (response) => {
    console.log('Google response:', response);
    // Handle the Google response
  };

  const onLogout = useCallback(() => {}, []);
    const SignupButton = () => {
        if (first_name && last_name && country_code && phone_no && email && password && confirm_password) {
            const data = {
                first_name: first_name,
                last_name: last_name,
                country_code: country_code,
                phone_no: phone_no,
                email: email,
                password: password,
                confirm_password: confirm_password
            }
            axios({
                url: configJSON.baseUrl + configJSON.signup_api,
                method: "POST",
                data: data
            }).then((res) => {
                console.log(res, "res")
                if (res?.data?.status == true) {
                    MESSAGE.success(res?.data?.message)
                    setFirst_name("")
                    setLast_name("")
                    setCountry_code("")
                    setEmail("")
                    setPassword("")
                    setConfirm_password("")
                    setPhone_no("")
                    navigate("/")
                }
                else {
                    MESSAGE.error(res?.data?.message)
                }
            })
                .catch((error) => {
                    console.log(error)
                    setFirst_name("")
                    setLast_name("")
                    setCountry_code("")
                    setEmail("")
                    setPassword("")
                    setConfirm_password("")
                    setPhone_no("")
                    navigate("/")
                })
        }
        else {

            MESSAGE.error("Field can not be empty!")
        }

    }
    return (

        <div>
            <div style={{color:"#a52a2a",textAlign:"center"}}>
                <h1>Signup</h1>
                <input type='text' placeholder='First Name' onChange={(e) => setFirst_name(e.target.value)} value={first_name} />
                <input type='text' placeholder='Last Name' onChange={(e) => setLast_name(e.target.value)} value={last_name} />
                <input type='number' placeholder='Country code' onChange={(e) => setCountry_code(e.target.value)} value={country_code} />
                <input type='number' placeholder='Phone No' onChange={(e) => setPhone_no(e.target.value)} value={phone_no} />
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type='password' placeholder='Confirm Password' onChange={(e) => setConfirm_password(e.target.value)} value={confirm_password} />

                <button onClick={SignupButton} className="btn btn-success" style={{cursor:"pointer"}}>Signup</button>
                <p style={{color:"	#0000ff"}}>Already have an account? <a style={{ color: "#a52a2a" }} onClick={() => navigate("/")}>Login</a></p>
                {/* {provider && profile && (
                    <User provider={provider} profile={profile} onLogout={onLogout} />
                )}
                <div className={`App ${provider && profile ? 'hide' : ''}`}>
                    <h1 className="title">Social Integration Login</h1>
                    <LoginSocialFacebook
                        appId={process.env.REACT_APP_FB_APP_ID || ''}
                        fieldsProfile={
                            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                        }
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        // redirect_uri={REDIRECT_URI}
                        onResolve={({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <FacebookLoginButton />
                    </LoginSocialFacebook>

                    <LoginSocialGoogle
                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                        onLoginStart={onLoginStart}
                        // redirect_uri={REDIRECT_URI}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <GoogleLoginButton />
                    </LoginSocialGoogle> */}
<FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
                </div>
            </div>
        
    )
}

export default Register
