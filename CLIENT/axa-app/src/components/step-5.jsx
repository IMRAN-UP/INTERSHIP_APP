import { axa_Logo, axa_Picture } from '../assets/icons';
import { useForm } from 'react-hook-form';

const Step4 = ({ formData, setFormData, prevStep, submitForm, switchLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const password = watch('password');

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    submitForm();
  };

  return (
    <div className="form-container register-form-container">

      <form onSubmit={handleSubmit(onSubmit)}>
        <img className='axa-logo-desck-version' src={axa_Logo} alt="Axa Logo with a white background for the descktop version" />
        <img className='axa-logo-phone-version' src={axa_Picture} alt="Axa Logo with a white background for the phone version" />
        {
          errors.password ?
            errors.password && <a style={{color: 'var(--error-color)'}}>{errors.password.message}</a> :
            errors.confirmPassword && <a style={{ color: 'var(--error-color)' }}>{errors.confirmPassword.message}</a>
        }
        <input
          {...register('password', {
            required: 'Password is required',
            validate: {
              strongPassword: value =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) ||
                'Use Upcase, lowercase, a number, and a special character'
            }
          })}
          type="password"
          placeholder="Password"
          style={{
            borderBottom: errors.password ? '1px solid rgb(255, 71, 71)' : ''
          }}
        />

        <input
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: {
              matchesPassword: value =>
                value === password || 'Passwords do not match'
            }
          })}
          type="password"
          placeholder="Confirm Password"
          style={{
            borderBottom: errors.confirmPassword ? '1px solid rgb(255, 71, 71)' : ''
          }}
        />
        <div>
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Submit</button>
        </div>
        <a href="#" onClick={switchLogin}>Already have a account ?</a>
      </form>
    </div>

  );
};

export default Step4;
