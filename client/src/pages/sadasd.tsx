import { FormEvent, useState } from 'react';

import {useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { Questions } from '../components/Questions';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import RoomCode from './../components/RoomCode';
import useRoom from './../hooks/useRoom';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

const AdminRoom = () => {
  const {user} = useAuth()
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('')
  const roomID = params.id;

  const {title, questions} = useRoom(roomID)
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      throw new Error('Yout must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomID}/questions`).push(question);

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="let me ask" />
          <RoomCode code={roomID} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span> {questions.length} perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login aqui.</button></span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        
        <div className="question-list">
        {questions.map(question => {
          return (
            <Questions
              key={question.id}
              content={question.content}
              author={question.author}
            />
          )
        })}
        </div>
      </main>


    </div>
  );
}

export default AdminRoom;