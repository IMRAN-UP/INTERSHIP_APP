import { useForm } from 'react-hook-form';
import { axa_Logo, axa_Picture } from '../assets/icons';
import { useEffect, useState } from 'react';

function Login({ switchRegister, setUser, loginError }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [saveLogin , setSaveLogin ] = useState(false);
  const User = JSON.parse(localStorage.getItem('user'));
  const login = JSON.parse(localStorage.getItem('login-cookie'));
  useEffect( () => {
    if ( login ) {
      onSubmit(login);
    }
  } , [])
  console.log(User);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        loginError();
        throw new Error('Login failed');
      }

      const result = await response.json();
      if( saveLogin ) {
        const loginCookie = { email : data.email, password : data.password };
        localStorage.setItem('login-cookie', JSON.stringify(loginCookie));
        console.log('login cookie');
      }
      setUser(result.user);
    } catch (error) {
      console.error('Error:', error.message);
      loginError();
    }
  };

  return (
    <div className='form-container login-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className='axa-logo-desck-version' src={axa_Logo} alt="Axa Logo with a white background for the descktop version" />
        <img className='axa-logo-phone-version' src={axa_Picture} alt="Axa Logo with a white background for the phone version" />

        <input
          type="email"
          placeholder='Email'
          name='login-email-field'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter a valid email address'
            }
          })}
          className={errors.password ? 'input-error' : ''}
          style={{
            borderBottom: errors.password ? '2px solid var(--error-color)' : ''
          }}
        />

        <input
          type="password"
          placeholder='Password'
          name='login-password-field'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })}
          className={errors.password ? 'input-error' : ''}
          style={{
            borderBottom: errors.password ? '2px solid var(--error-color)' : ''
          }}
        />
        <button type='submit' name='login-sumit-btn'>Login</button>
        <label htmlFor="" className='save-login'>
          <div
          onClick={ () => setSaveLogin(!saveLogin) }
          style={{
            background : saveLogin ? 'var(--btn-color-hover)' : ''
          }}
          ></div>
          Remember me
        </label>
        <div>
          <a href="#">Forgot my password</a>
          <a href="#" onClick={switchRegister}>Create account ? </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
