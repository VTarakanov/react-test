import React from 'react';

const MessageItem = ({message, title, id,deleteMessages}) => {
    return (
        <div  className="notification__item">
            <div className="notification__content">
            <h4 className="notification__title">{title}</h4>
            <p className="notification__desc">{message}</p>
            </div>
            <button className="notification__btn-delete" onClick={()=>deleteMessages(id)}><span>❌</span></button>
        </div>
    );
};

export default MessageItem;