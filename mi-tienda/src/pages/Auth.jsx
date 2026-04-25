import AuthLayout from '../components/templates/AuthLayout';
import AuthHero from '../components/organisms/AuthHero';
import AuthForm from '../components/organisms/AuthForm';

const Auth = () => {
  return (
    <AuthLayout 
      hero={<AuthHero />}
      form={<AuthForm />}
    />
  );
};

export default Auth;