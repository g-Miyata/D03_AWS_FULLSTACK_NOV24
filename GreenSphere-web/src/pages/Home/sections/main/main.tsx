import Titles from '../../../../components/Titles/Titles';
import Button from '../../../../components/Button/Button';
import style from './main.module.css';

const main = () => {
  return (
    <div className={style.home}>
      <section className={style.bgImg}>
        <section>
          <article>
            <div>
              <h2>&#9473;&#9473;&nbsp;&nbsp;&nbsp; Love for Nature</h2>
            </div>
            <div className={style.content}>
              <Titles titleText="discover your" highlightText="green" text="" />
              <Titles titleText="Side" highlightText="" text={`We are your one-stop destination for all things green and growing. Our website\n offers a wide array of stunning plants, ranging from vibrant flowers to lush indoor\nfoliage, allowing you to create your very own green oasis.`} />
            </div>
            <div>
              <a href="#bestSelling">
                <Button text="Shop now" />
              </a>
            </div>
          </article>
          <div className={style.link}>
            <a href="#instructions">
              <p>Learn Gardening &rarr; </p>
            </a>
          </div>
        </section>
      </section>
    </div>
  );
};

export default main;
