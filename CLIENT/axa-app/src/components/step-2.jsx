import { axa_Logo, axa_Picture } from '../assets/icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Step2 = ({ formData, setFormData, nextStep, prevStep , switchLogin  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const [gender , setGender] = useState({
    male: false,
    female: false,
  });

  const handleGenderChange = (event) => {
    if (event.target.value === 'male') {
      setGender({ male: true, female: false });
    } else {
      setGender({ male: false, female: true });
    }
  };

  return (
    <div className="form-container register-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className='axa-logo-desck-version' src={axa_Logo} alt="Axa Logo with a white background for the descktop version" />
        <img className='axa-logo-phone-version' src={axa_Picture} alt="Axa Logo with a white background for the phone version" />
        {errors.gender && <a style={{color: 'red'}}>{errors.gender.message}</a>}
        <span>
          <label
          style={{
            background: gender.male ? 'var(--backgroud-error-color)' : '',
          }}
          >
            <input
              {...register('gender', { required: 'Gender is required' })}
              type="radio"
              value="male"
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label 
          style={{
            background: gender.female? 'var(--backgroud-error-color)' : '',
          }}
          >
            <input
              {...register('gender', { required: 'Gender is required' })}
              type="radio"
              value="female"
              onChange={handleGenderChange}
            />
            Female
          </label>
        </span>          

        <input
          {...register('birthday', {
            required: 'Birthday is required',
            validate: {
              pastDate: value => new Date(value) <= new Date() || 'Birthday must be in the past'
            }
          })}
          type="date"
          placeholder="Birthday"
          style={{
            borderBottom : errors.birthday? '1px solid var(--error-color)' : '',
            color: errors.birthday? 'var(--error-color)' : '',
          }}
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

export default Step2;
