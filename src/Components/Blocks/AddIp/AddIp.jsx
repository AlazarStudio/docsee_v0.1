import React, { useState } from "react";
import classes from './AddIp.module.css';

function AddIp({ onSubmit }) {
    const [ipData, setIpData] = useState({
        fullName: '',
        shortName: '',
        fio: '',
        position: '',
        address: '',
        ogrn: '',
        inn: '',
        rs: '',
        bank: '',
        bik: '',
        ks: '',
        email: '',
        phone: ''
    });

    const handleIpDataChange = (event) => {
        const { name, value } = event.target;
        setIpData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(ipData);
        setIpData({
            fullName: '',
            shortName: '',
            fio: '',
            position: '',
            address: '',
            ogrn: '',
            inn: '',
            rs: '',
            bank: '',
            bik: '',
            ks: '',
            email: '',
            phone: ''
        });
    };

    return (
        <>
            <h2>Добавление нового ИП</h2>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label>Полное наименование:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={ipData.fullName}
                        onChange={handleIpDataChange}
                        placeholder="Индивидуальный предприниматель Уртенов Азамат Заурович"
                    />
                </div>
                <div>
                    <label>Сокращенное название:</label>
                    <input
                        type="text"
                        name="shortName"
                        value={ipData.shortName}
                        onChange={handleIpDataChange}
                        placeholder="ИП Уртенов А.З."
                    />
                </div>
                <div>
                    <label>ФИО:</label>
                    <input
                        type="text"
                        name="fio"
                        value={ipData.fio}
                        onChange={handleIpDataChange}
                        placeholder="Уртенов Азамат Заурович"
                    />
                </div>
                <div>
                    <label>Должность:</label>
                    <input
                        type="text"
                        name="position"
                        value={ipData.position}
                        onChange={handleIpDataChange}
                        placeholder="Индивидуальный предприниматель"
                    />
                </div>
                <div>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        name="address"
                        value={ipData.address}
                        onChange={handleIpDataChange}
                        placeholder="369300, Карачаево-Черкесская Республика, г. Усть-Джегута, ул. Пионерская, д. 15"
                    />
                </div>
                <div>
                    <label>ОГРНИП:</label>
                    <input
                        type="text"
                        name="ogrn"
                        value={ipData.ogrn}
                        onChange={handleIpDataChange}
                        placeholder="323909000029290"
                    />
                </div>
                <div>
                    <label>ИНН:</label>
                    <input
                        type="text"
                        name="inn"
                        value={ipData.inn}
                        onChange={handleIpDataChange}
                        placeholder="091690249248"
                    />
                </div>
                <div>
                    <label>Р/сч:</label>
                    <input
                        type="text"
                        name="rs"
                        value={ipData.rs}
                        onChange={handleIpDataChange}
                        placeholder="40802810863010007883"
                    />
                </div>
                <div>
                    <label>БАНК:</label>
                    <input
                        type="text"
                        name="bank"
                        value={ipData.bank}
                        onChange={handleIpDataChange}
                        placeholder="в Ставропольском Отделении №5230 ПАО Сбербанка"
                    />
                </div>
                <div>
                    <label>БИК:</label>
                    <input
                        type="text"
                        name="bik"
                        value={ipData.bik}
                        onChange={handleIpDataChange}
                        placeholder="040702615"
                    />
                </div>
                <div>
                    <label>К/сч:</label>
                    <input
                        type="text"
                        name="ks"
                        value={ipData.ks}
                        onChange={handleIpDataChange}
                        placeholder="30101810907020000615"
                    />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input
                        type="text"
                        name="email"
                        value={ipData.email}
                        onChange={handleIpDataChange}
                        placeholder="me@urtenov.ru"
                    />
                </div>
                <div>
                    <label>Телефон:</label>
                    <input
                        type="text"
                        name="phone"
                        value={ipData.phone}
                        onChange={handleIpDataChange}
                        placeholder="+7 (928) 387-44-97"
                    />
                </div>
                <button type="submit">Добавить ИП</button>
            </form>
        </>
    );
}

export default AddIp;