import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Titles from '../../components/Titles/Titles';
import style from './Plant.module.css';
import useFetchPlants from '../../hooks/useFetchPlant/useFetchPlants';
import Loader from '../../components/Loader/Loader';
import Label from '../../components/Label/Label';

const Plant = () => {
  const { plantId } = useParams<{ plantId: string }>();

  const { data: plants, loading, error } = useFetchPlants('https://run.mocky.io/v3/9161eb8d-fa56-45c7-aa2e-9fb38a6dbcee');

  if (loading) {
    return (
      <p>
        <Loader />;
      </p>
    );
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const plant = plants.find((p) => p.id === parseInt(plantId!, 10));

  if (!plant) {
    return <p>Planta não encontrada.</p>;
  }

  return (
    <div className={style.container}>
      <section className={style.content}>
        <div className={style.imgContainer}>
          <img src={plant.imgUrl} alt={plant.name} />
        </div>
        <div className={style.description}>
          <div className={style.title}>
            <Titles titleText={plant.name} />
            <h2>{plant.subtitle}</h2>
            <div className={style.labels}>
              {plant.label.map((label, index) => (
                <Label key={index} text={label} />
              ))}
            </div>
            <p>${plant.price}</p>
            <div>
              <Button text="Check out" />
            </div>
          </div>
          <div className={style.feat}>
            <h2>Features</h2>
            <ul>
              {plant.features.split('. ').map((feature, index) => (
                <li key={index}>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.info}>
            <h2>Description</h2>
            <p>{plant.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plant;
