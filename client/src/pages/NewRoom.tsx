import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from './../components/Button';

import '../styles/auth.scss'
import { useAuth } from './../hooks/useAuth';

const NewRoom = () => {
    const { user } = useAuth()

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
                    <h1>{user?.name}</h1>
                    <h2>Criar nova sala</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};


export {NewRoom}