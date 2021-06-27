
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Questions } from '../components/Questions';

// import { useAuth } from '../hooks/useAuth';
import RoomCode from './../components/RoomCode';
import useRoom from './../hooks/useRoom';
import '../styles/room.scss'
import { database } from '../services/firebase';


type RoomParams = {
  id: string;
}

const AdminRoom = () => {
  // const {user} = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { title, questions } = useRoom(roomID)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
    }
  }

  async function handleHighlightedQuestion(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }



  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="let me ask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleEndRoom}> Encerrar sala </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} perguntas</span>}
        </div>

        {/* <form onSubmit={handleSendQuestion}>
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
         */}
        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>

                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightedQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Responder pergunta" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta" />
                    </button>
                  </>
                )}

              </Questions>
            )
          })}
        </div>
      </main>


    </div>
  );
}

export default AdminRoom;
