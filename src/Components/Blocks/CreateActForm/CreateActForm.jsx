import React, { useState } from 'react';
import classes from './CreateActForm.module.css';

function CreateActForm({ onSubmit, onClose }) {
    const [creationDate, setCreationDate] = useState('');

    function getDate(dateInfo, type = 'numeric') {
        const date = new Date(dateInfo);
        const options = { day: 'numeric', month: type, year: 'numeric' };
        const dateString = date.toLocaleDateString('ru-RU', options).replace(' г.', '');
        return dateString;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            date: getDate(creationDate)
        });
    };

    return (
        <>
            <h2>Создание нового акта для договора</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Дата:</label>
                    <input
                        required
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

export default CreateActForm;
