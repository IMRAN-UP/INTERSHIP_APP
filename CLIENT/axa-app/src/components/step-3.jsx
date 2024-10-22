import { axa_Logo, axa_Picture } from '../assets/icons';
import { useForm } from 'react-hook-form';

const Step3 = ({ formData, setFormData, nextStep, prevStep , switchLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <div className="form-container register-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className='axa-logo-desck-version' src={axa_Logo} alt="Axa Logo with a white background for the descktop version" />
        <img className='axa-logo-phone-version' src={axa_Picture} alt="Axa Logo with a white background for the phone version" />
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format'
            }
          })}
          type="email"
          placeholder="Email"
          style={{
            borderBottom: errors.email? '1px solid var(--error-color)' : '',
          }}
          className={ errors.email? 'input-error' : ''}
        />

        <input
          {...register('phone_number', {
            required: 'Phone number is required',
            pattern: {
              value: /^\d+$/,
              message: 'Invalid phone number'
            }
          })}
          placeholder="Phone Number"
          style={{
            borderBottom: errors.phone_number? '1px solid var(--error-color)' : '',
          }}
          className={errors.phone_number? 'input-error' : ''}
        />
        <div>
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Next</button>
        </div>
        <a href="#" onClick={switchLogin}>Already have a account ?</a>
      </form>
    </div>

  );
};

export default Step3;
