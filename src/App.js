import logo from './logo.png';
import './App.css';
import {useEffect, useState} from "react";
import NotificationList from "./components/Notification/NotificationList";
import Table from "./components/Table/Table";


function App() {

    /*Будущие уведомления*/
    const messagesData = [
        {id: 3, title: 'Заголовок 3', message: 'Уведомление 3'},
        {id: 4, title: 'Заголовок 4', message: 'Уведомление 4'},
        {id: 5, title: 'Заголовок 5', message: 'Уведомление 5'},
        {id: 6, title: 'Заголовок 6', message: 'Уведомление 6'},
        {id: 7, title: 'Заголовок 7', message: 'Уведомление 7'},
        {id: 8, title: 'Заголовок 8', message: 'Уведомление 8'},
        {id: 9, title: 'Заголовок 9', message: 'Уведомление 9'},
        {id: 10, title: 'Заголовок 10', message: 'Уведомление 10'},
    ]

    /*Значение состояния и функция для обновления состояния (сеттер),
    в useState передаётся начальное состояние*/
    const [messages, setMessage] = useState([
        {id: '1', title: 'Dats.Team', message: 'Начислено 0.0001 баллов'},
        {id: '2', title: 'Заголовок 2', message: 'Уведомление 2'},
    ])

    const deleteMessages = (id) => {
        const newMessages = messages.filter(itemMsg => itemMsg.id !== id);
        setMessage(newMessages)
        console.log(id)
    }


    const [showNotification, setShowNotification] = useState(false);

    const msgPeriod = 10000
    let msgCount = messagesData.length
    let msgInterval = msgPeriod / msgCount

    {/*Пустая зависимость в массиве - отработает один раз в момент монтирования*/
    }
    useEffect(() => {
        let counter = -1;
        let interval = setInterval(() => {
            counter++;
            setMessage((prev) => [...prev, messagesData[counter]]);
            if (counter === messagesData.length - 1) {
                clearInterval(interval);
            }
        }, msgInterval);
    }, []);

    return (
        <div className="App">

            <header className="header">
                <div className="header__container">
                    <img src={logo} alt="logo"/>
                    <div className="notification">
                        <button onClick={() => setShowNotification(!showNotification)} className="notification__btn">
                    <span className="notification__count">
                        {messages.length}
                    </span>
                            <svg className="notification-btn__icon" fill="none" height="24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2.1c4.02 0 6.9 3.28 6.9 7.53v1.6c0 .23.2.53.72 1.08l.27.27c1.08 1.1 1.51 1.73 1.51 2.75 0 .44-.05.79-.27 1.2-.45.88-1.42 1.37-2.87 1.37h-1.9c-.64 2.33-2.14 3.6-4.36 3.6-2.25 0-3.75-1.3-4.37-3.67l.02.07H5.74c-1.5 0-2.47-.5-2.9-1.41-.2-.4-.24-.72-.24-1.16 0-1.02.43-1.65 1.51-2.75l.27-.27c.53-.55.72-.85.72-1.08v-1.6C5.1 5.38 7.99 2.1 12 2.1zm2.47 15.8H9.53c.46 1.25 1.25 1.8 2.47 1.8s2.01-.55 2.47-1.8zM12 3.9c-2.96 0-5.1 2.43-5.1 5.73v1.6c0 .85-.39 1.46-1.23 2.33l-.28.29c-.75.75-.99 1.11-.99 1.48 0 .19.01.29.06.38.1.22.43.39 1.28.39h12.52c.82 0 1.16-.17 1.28-.4.05-.1.06-.2.06-.37 0-.37-.24-.73-.99-1.48l-.28-.29c-.84-.87-1.23-1.48-1.23-2.33v-1.6c0-3.3-2.13-5.73-5.1-5.73z"
                                    fill="currentColor">
                                </path>
                            </svg>
                        </button>
                        {
                            showNotification && <NotificationList deleteMessages={deleteMessages} messages={messages}/>
                        }

                    </div>
                </div>


            </header>
            <main className="main">
                <div className="main__container">
                    <Table />
                </div>
            </main>
        </div>
    );
}

export default App;
