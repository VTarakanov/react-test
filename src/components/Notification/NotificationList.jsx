import React from 'react';
import MessageItem from "./MessageItem";

const NotificationList = ({messages, deleteMessages}) => {

    return (
        <div className="notification__list">
            {messages.map((message) =>
                <MessageItem
                    message={message.message}
                    title={message.title}
                    key={message.id}
                    id={message.id}
                    deleteMessages={deleteMessages}
                />
            )}
            {messages.length===0 && <p className="notification__empty-msg">Пока тут пусто ;)</p>}
        </div>
    );
};

export default NotificationList;