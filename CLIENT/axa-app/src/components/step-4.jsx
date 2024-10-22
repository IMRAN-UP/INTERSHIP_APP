import { useState } from "react";
import { useForm } from "react-hook-form";
import { axa_Logo, axa_Picture } from "../assets/icons";

const Step4 = ({ formData, setFormData, nextStep, prevStep, switchLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <div className="form-container register-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className='axa-logo-desck-version' src={axa_Logo} alt="Axa Logo with a white background for the desktop version" />
        <img className='axa-logo-phone-version' src={axa_Picture} alt="Axa Logo with a white background for the phone version" />

        <input
          {...register('adress', {
            required: 'Address is required',
          })}
          type="text"
          placeholder="Address"
          style={{
            borderBottom: errors.address ? '1px solid var(--error-color)' : '',
          }}
          className={errors.address ? 'input-error' : ''}
        />

        {checked && (
          <input
            {...register('companyName', {
              validate: value => checked && !value ? 'Company Name is required' : true,
            })}
            type="text"
            placeholder="Company Name"
            style={{
              borderBottom: errors.companyName ? '1px solid var(--error-color)' : '',
            }}
            className={errors.companyName ? 'input-error' : ''}
          />
        )}

        <span className="isCompany-form-container">
          <input
            {...register('isCompany')}
            type="checkbox"
            onChange={handleCheck}
          />
          <span>I'm a company</span>
        </span>

        <div>
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Next</button>
        </div>
        <a href="#" onClick={switchLogin}>Already have an account?</a>
      </form>
    </div>
  );
};

export default Step4;
