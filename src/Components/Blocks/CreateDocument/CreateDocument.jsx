import React, { useState } from "react";
import { rubles } from 'rubles';
import classes from './CreateDocument.module.css';

function CreateDocument({ closeModal, ipList }) {
    const [contractType, setContractType] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const [writtenDate, setWrittenDate] = useState('');
    const [amount, setAmount] = useState('');
    const [writtenAmount, setWrittenAmount] = useState('');
    const [template, setTemplate] = useState('');
    const [ip, setIp] = useState('');
    const [contragent, setContragent] = useState('');
    const [receiver, setReceiver] = useState('');
    const [contractNumber, setContractNumber] = useState('');
    const [contractSubjectNom, setContractSubjectNom] = useState('');
    const [contractSubjectGen, setContractSubjectGen] = useState('');
    const [contractEndDate, setContractEndDate] = useState('');
    const [stoimostNumber, setStoimostNumber] = useState('');

    const handleContractTypeChange = (event) => {
        setContractType(event.target.value);
    };

    function getDate(dateInfo, type = 'numeric') {
        const date = new Date(dateInfo);
        const options = { day: 'numeric', month: type, year: 'numeric' };
        const dateString = date.toLocaleDateString('ru-RU', options).replace(' г.', '');
        return dateString;
    }

    const handleDateChange = (event) => {
        setNumberDate(getDate(event.target.value));
        setWrittenDate(getDate(event.target.value, 'long'));
    };

    const handleContractEndDateChange = (event) => {
        setContractEndDate(getDate(event.target.value));
    };

    const handleAmountChange = (event) => {
        let value = event.target.value;
        let sum = value.replace(' ', '');

        setAmount(sum.toLocaleString('ru-RU'));
        setStoimostNumber(String(Number(sum.replace(',', '.')).toLocaleString('ru-RU')).replace('.', ','));
        setWrittenAmount(rubles(sum));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            contractType,
            template,
            ip,
            contragent,
            receiver: contractType === 'трехсторонний' ? receiver : null,
            contractNumber,
            numberDate,
            writtenDate,
            contractSubjectNom,
            contractSubjectGen,
            writtenAmount,
            stoimostNumber,
            contractEndDate,
        };
        console.log("Form Data: ", formData);
        closeModal();
    };

    return (
        <>
            <h2>Создание нового документа</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Тип договора:</label>
                    <select value={contractType} onChange={handleContractTypeChange}>
                        <option value="" disabled>Выберите тип договора</option>
                        <option value="двухсторонний">Двухсторонний</option>
                        <option value="трехсторонний">Трехсторонний</option>
                    </select>
                </div>
                <div>
                    <label>Шаблон договора:</label>
                    <select value={template} onChange={(e) => setTemplate(e.target.value)}>
                        <option value="" disabled>Выберите шаблон</option>
                        <option value="complex">Комплексные</option>
                    </select>
                </div>
                <div>
                    <label>Выбор ИП:</label>
                    <select value={ip} onChange={(e) => setIp(e.target.value)}>
                        <option value="" disabled>Выберите ИП</option>
                        {ipList.map((ipItem, index) => (
                            <option key={index} value={ipItem.fullName}>{ipItem.fullName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Выбор контрагента:</label>
                    <div className={classes.modalSelectButton}>
                        <select value={contragent} onChange={(e) => setContragent(e.target.value)}>
                            <option value="" disabled>Выберите контрагента</option>
                            <option value="contr1">Контрагент 1</option>
                            <option value="contr2">Контрагент 2</option>
                            <option value="contr3">Контрагент 3</option>
                        </select>
                        <button type="button" className={classes.addButton}>+</button>
                    </div>
                </div>
                {contractType === 'трехсторонний' && (
                    <div>
                        <label>Выбор получателей услуг:</label>
                        <div className={classes.modalSelectButton}>
                            <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
                                <option value="" disabled>Выберите получателя услуг</option>
                                <option value="receiver1">Получатель 1</option>
                                <option value="receiver2">Получатель 2</option>
                                <option value="receiver3">Получатель 3</option>
                            </select>
                            <button type="button" className={classes.addButton}>+</button>
                        </div>
                    </div>
                )}
                <div>
                    <label>Номер договора:</label>
                    <input type="text" value={contractNumber} placeholder={'018-24'} onChange={(e) => setContractNumber(e.target.value)} />
                </div>
                <div>
                    <label>Дата договора цифры:</label>
                    <input type="date" onChange={handleDateChange} />
                </div>
                <div className={classes.hiddenModalBlock}>
                    <label>Дата договора прописью:</label>
                    <input type="text" value={writtenDate} readOnly />
                </div>
                <div>
                    <label>Предмет договора (именительном падеже):</label>
                    <input type="text" value={contractSubjectNom} placeholder={'Разработка логотипа и фирменного стиля'} onChange={(e) => setContractSubjectNom(e.target.value)} />
                </div>
                <div>
                    <label>Предмет договора (наименование работ в родительном падеже):</label>
                    <input type="text" value={contractSubjectGen} placeholder={'Разработке логотипа и фирменного стиля'} onChange={(e) => setContractSubjectGen(e.target.value)} />
                </div>
                <div>
                    <label>Стоимость</label>
                    <input type="text" value={amount} onChange={handleAmountChange} placeholder="100 000" />
                </div>
                <div className={classes.hiddenModalBlock}>
                    <label>Стоимость прописью:</label>
                    <input type="text" value={writtenAmount} readOnly />
                </div>
                <div>
                    <label>Дата действия договора (до):</label>
                    <input type="date" onChange={handleContractEndDateChange} />
                </div>

                <button type="submit">Создать</button>
            </form>
        </>
    );
}

export default CreateDocument;
