import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from './../components/Button';


import '../styles/auth.scss';
import { useAuth } from './../hooks/useAuth';

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle} = useAuth()

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong>Crie salar ao vivo</strong>
        <p>Tire suas dívidas da sua audiencia emtmepo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logoImg" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="googleIconImg" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};


export { Home }