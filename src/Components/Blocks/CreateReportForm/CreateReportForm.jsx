import React, { useState } from 'react';
import classes from './CreateReportForm.module.css';

function CreateReportForm({ onSubmit, onClose }) {
    const [creationDate, setCreationDate] = useState('');

    function getDate(dateInfo, type = 'numeric') {
        const date = new Date(dateInfo);
        const options = { day: 'numeric', month: type, year: 'numeric' };
        const dateString = date.toLocaleDateString('ru-RU', options).replace(' г.', '');
        return dateString;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(getDate(creationDate));
    };

    return (
        <>
            <h2>Создание нового отчета для документа</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Дата:</label>
                    <input
                        type="date"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                    />
                </div>
                
                <button type="submit">Создать</button>
            </form >
        </>
    );
}

export default CreateReportForm;
