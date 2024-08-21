import React, { useState } from "react";
import classes from './AddCounterparty.module.css';
import GosCounterpartyForm from '../GosCounterpartyForm/GosCounterpartyForm';
import MSPCounterpartyForm from '../MSPCounterpartyForm/MSPCounterpartyForm';
import IPCounterpartyForm from '../IPCounterpartyForm/IPCounterpartyForm';
import SelfEmployedCounterpartyForm from '../SelfEmployedCounterpartyForm/SelfEmployedCounterpartyForm';

function AddCounterparty({ onSubmit }) {
    const [counterpartyType, setCounterpartyType] = useState('');

    // Состояние для Гос контрагента
    const [gosCounterpartyData, setGosCounterpartyData] = useState({
        orgName: '',
        fullName: '',
        shortName: '',
        directorName: '',
        directorFullNameGen: '',
        initials: '',
        address: '',
        INN: '',
        KPP: '',
        OKTMO: '',
        OKATO: '',
        OKPO: '',
        OKOPF: '',
        OGRN: '',
        LSCH: '',
        RSCH: '',
        KSCH: '',
        bankName: '',
        BIK: '',
        OKOGU: '',
        OKOPFCode: '',
        email: '',
        phone: '',
        type: counterpartyType,
    });

    // Состояние для МСП контрагента
    const [mspCounterpartyData, setMspCounterpartyData] = useState({
        orgName: '',
        fullName: '',
        shortName: '',
        directorName: '',
        directorFullNameGen: '',
        initials: '',
        address: '',
        INN: '',
        KPP: '',
        OGRN: '',
        RSCH: '',
        KSCH: '',
        bankName: '',
        BIK: '',
        email: '',
        phone: '',
        type: counterpartyType,
    });

    // Состояние для ИП контрагента
    const [ipCounterpartyData, setIpCounterpartyData] = useState({
        orgName: '',
        fullName: '',
        shortName: '',
        directorName: '',  // Для ИП это будет ФИО
        directorFullNameGen: '',  // ФИО в род. падеже
        initials: '',
        address: '',
        INN: '',
        OGRNIP: '',  // ОГРНИП для ИП
        RSCH: '',
        KSCH: '',
        bankName: '',
        BIK: '',
        email: '',
        phone: '',
        type: counterpartyType,
    });

    // Состояние для Самозанятого контрагента
    const [selfEmployedCounterpartyData, setSelfEmployedCounterpartyData] = useState({
        orgName: '',
        fullName: '',
        basis: '',  // Действует на основании
        initials: '',
        address: '',
        INN: '',
        passportSeries: '',
        passportNumber: '',
        RSCH: '',
        KSCH: '',
        bankName: '',
        BIK: '',
        email: '',
        phone: '',
        type: counterpartyType,
    });

    const handleChange = (e, setData) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        setGosCounterpartyData(prevState => ({ ...prevState, type: counterpartyType }))

        setMspCounterpartyData(prevState => ({ ...prevState, type: counterpartyType }))

        setIpCounterpartyData(prevState => ({ ...prevState, type: counterpartyType }))

        setSelfEmployedCounterpartyData(prevState => ({ ...prevState, type: counterpartyType }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedData;
        if (counterpartyType === 'Гос') {
            updatedData = {
                ...gosCounterpartyData,
                orgName: gosCounterpartyData.fullName + ' ' + gosCounterpartyData.bankName
            };
            setGosCounterpartyData(updatedData);
        } else if (counterpartyType === 'МСП') {
            updatedData = {
                ...mspCounterpartyData,
                orgName: mspCounterpartyData.fullName + ' ' + mspCounterpartyData.bankName
            };
            setMspCounterpartyData(updatedData);
        } else if (counterpartyType === 'ИП') {
            updatedData = {
                ...ipCounterpartyData,
                orgName: ipCounterpartyData.fullName + ' ' + ipCounterpartyData.bankName
            };
            setIpCounterpartyData(updatedData);
        } else if (counterpartyType === 'Самозанятый') {
            updatedData = {
                ...selfEmployedCounterpartyData,
                orgName: selfEmployedCounterpartyData.fullName + ' ' + selfEmployedCounterpartyData.bankName
            };
            setSelfEmployedCounterpartyData(updatedData);
        }
        onSubmit(updatedData);
    };

    return (
        <>
            <h2>Добавление нового контрагента</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Тип контрагента</label>
                    <select
                        className={classes.input}
                        value={counterpartyType}
                        onChange={(e) => setCounterpartyType(e.target.value)}
                    >
                        <option value="" disabled>Выберите тип контрагента</option>
                        <option value="Гос">Гос</option>
                        <option value="МСП">МСП</option>
                        <option value="ИП">ИП</option>
                        <option value="Самозанятый">Самозанятый</option>
                    </select>
                </div>

                {counterpartyType === 'Гос' && (
                    <GosCounterpartyForm
                        formData={gosCounterpartyData}
                        handleChange={(e) => handleChange(e, setGosCounterpartyData)}
                    />
                )}

                {counterpartyType === 'МСП' && (
                    <MSPCounterpartyForm
                        formData={mspCounterpartyData}
                        handleChange={(e) => handleChange(e, setMspCounterpartyData)}
                    />
                )}

                {counterpartyType === 'ИП' && (
                    <IPCounterpartyForm
                        formData={ipCounterpartyData}
                        handleChange={(e) => handleChange(e, setIpCounterpartyData)}
                    />
                )}

                {counterpartyType === 'Самозанятый' && (
                    <SelfEmployedCounterpartyForm
                        formData={selfEmployedCounterpartyData}
                        handleChange={(e) => handleChange(e, setSelfEmployedCounterpartyData)}
                    />
                )}

                <button className={classes.button} type="submit">Сохранить</button>
            </form>
        </>
    );
}

export default AddCounterparty;
