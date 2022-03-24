import React, {useState, useEffect, useCallback} from 'react';
import defaultDataset from './dataset';
import { AnswersList, Chats } from './components';
import FormDialog from './components/Forms/FormDialog';
// import {db} from './firebase/index'
import './assets/styles/style.css';

 const App = () => {
  // useState初期設定
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState('init')
  const [dataset, setDataset] = useState(defaultDataset)
  const [open, setOpen] = useState(false)

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'contact'):
        handleClickOpen()
        break;

      case (/^http:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.terget = '_blank';
        a.click();
        break;

      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  const addChats = (chat) => {
     /// prevChatsで、更新前のchatsを取得
    setChats(prevChats => {
      return[...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // 初回レンダー後に走る処理
  useEffect(() => {
    (async() => {
      const initDataset = {};

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          initDataset[doc.id] = doc.data()
        })
      })

      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  }, [])

  // 更新があった時に走る処理
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

    return (
      <section className='c-section'>
        <div className='c-box'>
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
          <FormDialog open={open} handleClose={handleClose} />
        </div>
      </section>
    );
}

  export default App;
