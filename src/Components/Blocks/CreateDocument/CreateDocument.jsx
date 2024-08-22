import React, { useState } from "react";
import { rubles } from 'rubles';
import classes from './CreateDocument.module.css';
import axios from 'axios';

function CreateDocument({ closeModal, ipList, counterpartyList, openIpModal, openCounterpartyModal }) {
    const [contractType, setContractType] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const [writtenDate, setWrittenDate] = useState('');
    const [amount, setAmount] = useState('');
    const [writtenAmountAct, setWrittenAmountAct] = useState('');
    const [writtenAmountDogovor, setWrittenAmountDogovor] = useState('');
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
        setContractEndDate(getDate(event.target.value, 'long'));
    };

    const handleAmountChange = (event) => {
        let value = event.target.value;
        let sum = value.replace(' ', '');

        // let sumForDogovor = sum.length > 0 && rubles(sum).charAt(0).toUpperCase() + rubles(sum).slice(1);
        let sumForDogovor = rubles(sum);

        const regex = /(\d{2} копеек?)$/;
        const match = sum.length > 0 && sumForDogovor.match(regex);

        if (match && sum.length > 0) {
            const kopiekiPart = match[0];
            const rublesPart = sumForDogovor.replace(regex, '').trim();

            const rubStartIndex = rublesPart.indexOf('рубл');
            if (rubStartIndex !== -1) {
                const beforeRub = rublesPart.slice(0, rubStartIndex).trim();
                const afterRub = rublesPart.slice(rubStartIndex).trim();
                const finalSumForDogovor = `(${beforeRub}) ${afterRub} ${kopiekiPart}`;

                setWrittenAmountDogovor(finalSumForDogovor);
            } else {
                setWrittenAmountDogovor(sumForDogovor);
            }
        }

        setAmount(sum.toLocaleString('ru-RU'));
        setStoimostNumber(String(Number(sum.replace(',', '.')).toLocaleString('ru-RU')).replace('.', ','));
        setWrittenAmountAct(rubles(sum));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedIp = ipList.find(ipItem => ipItem.orgName === ip);
        const selectedContragent = counterpartyList.find(counterparty => counterparty.orgName === contragent);
        const selectedReceiver = counterpartyList.find(counterparty => counterparty.orgName === receiver);

        const formData = {
            contractType,
            template,
            ip: selectedIp ? selectedIp : null,
            contragent: selectedContragent ? selectedContragent : null,
            receiver: contractType === '3' ? selectedReceiver : null,
            contractNumber,
            numberDate,
            writtenDate,
            contractSubjectNom,
            contractSubjectGen,
            writtenAmountAct,
            writtenAmountDogovor,
            stoimostNumber,
            contractEndDate,
        };

        // console.log("Form Data: ", formData);
        try {
            await axios.post('http://localhost:3000/generate', { formData });
            console.log("Form Data: ", formData);
            closeModal();
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    return (
        <>
            <h2>Создание нового документа</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Тип договора:</label>
                    <select required value={contractType} onChange={handleContractTypeChange}>
                        <option value="" disabled>Выберите тип договора</option>
                        <option value="2">Двухсторонний</option>
                        <option value="3">Трехсторонний</option>
                    </select>
                </div>
                <div>
                    <label>Шаблон договора:</label>
                    <select required value={template} onChange={(e) => setTemplate(e.target.value)}>
                        <option value="" disabled>Выберите шаблон</option>
                        <option value="complex">Комплексные</option>
                    </select>
                </div>
                <div>
                    <label>Выбор ИП:</label>

                    <div className={classes.modalSelectButton}>
                        <select required value={ip} onChange={(e) => setIp(e.target.value)}>
                            <option value="" disabled>Выберите ИП</option>
                            {ipList.map((ipItem, index) => (
                                <option key={index} value={ipItem.orgName}>{ipItem.orgName}</option>
                            ))}
                        </select>
                        <button type="button" className={classes.addButton} onClick={openIpModal}>+</button>
                    </div>
                </div>
                <div>
                    <label>Выбор контрагента:</label>
                    <div className={classes.modalSelectButton}>
                        <select required value={contragent} onChange={(e) => setContragent(e.target.value)}>
                            <option value="" disabled>Выберите контрагента</option>
                            {counterpartyList.map((ipItem, index) => (
                                <option key={index} value={ipItem.orgName}>{ipItem.orgName}</option>
                            ))}
                        </select>
                        <button type="button" className={classes.addButton} onClick={openCounterpartyModal}>+</button>
                    </div>
                </div>
                {contractType === '3' && (
                    <div>
                        <label>Выбор получателей услуг:</label>
                        <div className={classes.modalSelectButton}>
                            <select required value={receiver} onChange={(e) => setReceiver(e.target.value)}>
                                <option value="" disabled>Выберите получателя услуг</option>
                                {counterpartyList.map((ipItem, index) => (
                                    <option key={index} value={ipItem.orgName}>{ipItem.orgName}</option>
                                ))}
                            </select>
                            <button type="button" className={classes.addButton} onClick={openCounterpartyModal}>+</button>
                        </div>
                    </div>
                )}
                <div>
                    <label>Номер договора:</label>
                    <input required type="text" value={contractNumber} placeholder={'018-24'} onChange={(e) => setContractNumber(e.target.value)} />
                </div>
                <div>
                    <label>Дата договора цифры:</label>
                    <input required type="date" onChange={handleDateChange} />
                </div>
                <div className={classes.hiddenModalBlock}>
                    <label>Дата договора прописью:</label>
                    <input required type="text" value={writtenDate} readOnly />
                </div>
                <div>
                    <label>Предмет договора (именительном падеже):</label>
                    <input required type="text" value={contractSubjectNom} placeholder={'Разработка логотипа и фирменного стиля'} onChange={(e) => setContractSubjectNom(e.target.value)} />
                </div>
                <div>
                    <label>Предмет договора (наименование работ в родительном падеже):</label>
                    <input required type="text" value={contractSubjectGen} placeholder={'Разработке логотипа и фирменного стиля'} onChange={(e) => setContractSubjectGen(e.target.value)} />
                </div>
                <div>
                    <label>Стоимость</label>
                    <input required type="text" value={amount} onChange={handleAmountChange} placeholder="100 000" />
                </div>
                <div className={classes.hiddenModalBlock}>
                    <label>Стоимость прописью:</label>
                    <input required type="text" value={writtenAmountAct} readOnly />
                </div>
                <div>
                    <label>Дата действия договора (до):</label>
                    <input required type="date" onChange={handleContractEndDateChange} />
                </div>

                <button type="submit">Создать</button>
            </form >
        </>
    );
}

export default CreateDocument;
