import { SignInButton } from '@clerk/clerk-react';
import style from './SignInPage.module.css';
import video from '../../assets/videos/video.mp4';
import logo from '../../assets/images/logo.svg';
const SignInPage = () => {
  return (
    <div className={style.container}>
      <video autoPlay muted loop src={video} />
      <div className={style.content}>
        <p>Welcome!</p>
        <div className={style.logo}>
          <img src={logo} alt="Green Sphere Logo" />
          <div className={style.text}>
            <h1>Green Sphere</h1>
            <p>Log in to access the store</p>
          </div>
        </div>
        <SignInButton mode="modal" forceRedirectUrl="/welcome">
          <button>Log In</button>
        </SignInButton>
      </div>
    </div>
  );
};

export default SignInPage;
