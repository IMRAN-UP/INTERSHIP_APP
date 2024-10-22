import { axa_Logo, axa_Picture } from '../assets/icons';
import { useForm } from 'react-hook-form';

const Step1 = ({ formData, setFormData, nextStep , switchLogin }) => {
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
          {...register('first_name', { required: 'First Name is required' })}
          placeholder="First Name"
          style={{
            borderBottom : errors.first_name ? '1px solid var(--error-color)' : '',
          }}
          className={errors.first_name ? 'input-error' : ''}
        />

        <input
          {...register('last_name', { required: 'Last Name is required' })}
          placeholder="Last Name"
          style={{
            borderBottom : errors.last_name ? '1px solid var(--error-color)' : '',
          }}
          className={errors.last_name ? 'input-error' : ''}
        />
        <button type="submit">Next</button>
        <a href="#" onClick={switchLogin}>Already have a account ?</a>
      </form>
    </div>
  );
};

export default Step1;
