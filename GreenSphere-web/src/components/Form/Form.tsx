import { useForms } from '../../hooks/useForms';
import { FormSchema } from '../../schemas/formSchema';
import style from './Form.module.css';
import Button from '../Button/Button';
import usePostPlants from '../../hooks/API/usePostPlant';
import useFetchTypes from '../../hooks/API/useFetchTypes';
import Loader from '../Loader/Loader';

const Form = () => {
  const { register, handleSubmit, reset, errors, loadingSchema, defaultImg } = useForms();
  const { data: types, error, loading } = useFetchTypes();
  const { submitPlant, isSubmitting, message } = usePostPlants();

  if (loadingSchema) {
    return <Loader />;
  }
  const onSubmit = async (data: FormSchema) => {
    const postData = {
      ...data,
      isInSale: data.discountPercentage > 0,
      imgUrl: data.imgUrl || defaultImg,
      type: data.typeId,
    };

    try {
      await submitPlant(postData);
      reset();
    } catch (error) {
      console.error('Error submitting the plant:', error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <header>
        <h1>Plant registration</h1>
        <hr />
      </header>
      <div className={style.formGroup}>
        <label htmlFor="name">Plant name {errors.name && <small className={style.errorMessage}>{errors.name.message}</small>}</label>
        <input type="text" id="name" placeholder="Echinocereus Cactus" {...register('name')} />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="subtitle">Plant subtitle {errors.subtitle && <small className={style.errorMessage}>{errors.subtitle.message}</small>}</label>
        <input type="text" id="subtitle" placeholder="A majestic addition to your plant collection" {...register('subtitle')} />
      </div>

      <div className={style.formGroup}>
        {error && <small className={style.errorMessage}>Error loading types: {error}</small>}
        <label htmlFor="type-select">Plant type {errors.typeId && <small className={style.errorMessage}>{errors.typeId.message}</small>} </label>
        <select
          id="type-select"
          defaultValue="-1"
          {...register('typeId', {
            valueAsNumber: true,
          })}
        >
          <option value="-1" disabled className={style.option}>
            -- Select a Type --
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.id} className={style.option}>
              {type.typeName}
            </option>
          ))}
        </select>
      </div>
      <div className={style.formGroup}>
        <div className={style.prices}>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" placeholder="$139.99" {...register('price')} />
            {errors.price && <small className={style.errorMessage}>{errors.price.message}</small>}
          </div>
          <div>
            <label htmlFor="discount">Discount percentage</label>
            <input type="number" id="discount" placeholder="20%" {...register('discountPercentage')} />
            {errors.discountPercentage && <small className={style.errorMessage}>{errors.discountPercentage.message}</small>}
          </div>
        </div>
      </div>
      <div className={style.formGroup}>
        <label>Label: {errors.label && <small className={style.errorMessage}>{errors.label.message}</small>}</label>
        <div className={style.formRadioGroup}>
          <label>
            <input type="radio" value="Indoor" {...register('label')} className={style.radioInput} />
            <p>Indoor</p>
          </label>
          <label>
            <input type="radio" value="Outdoor" {...register('label')} className={style.radioInput} />
            <p>Outdoor</p>
          </label>
        </div>
      </div>
      <div className={style.formGroup}>
        <label htmlFor="features">Features {errors.features && <small className={style.errorMessage}>{errors.features.message}</small>}</label>
        <textarea id="features" placeholder="Species: Echinocereus..." {...register('features')} />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="description">Description {errors.description && <small className={style.errorMessage}>{errors.description.message}</small>}</label>
        <textarea id="description" placeholder="Ladyfinger cactus..." {...register('description')} />
      </div>
      <div className={style.submitBtn}>
        {message && <p>{message}</p>}
        <Button text={isSubmitting ? 'Submitting...' : 'Register'} />
      </div>
    </form>
  );
};

export default Form;
