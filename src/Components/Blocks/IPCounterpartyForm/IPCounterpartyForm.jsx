import React from "react";
import classes from './IPCounterpartyForm.module.css';

function IPCounterpartyForm({ formData, handleChange }) {
    return (
        <>
            <div>
                <label>Полное наименование</label>
                <input
                    className={classes.input}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Сокращенное наименование</label>
                <input
                    className={classes.input}
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ФИО ИП</label>
                <input
                    className={classes.input}
                    type="text"
                    name="directorName"  // Можно оставить как "directorName", хотя в данном случае это ИП
                    value={formData.directorName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ФИО ИП в род. падеже</label>
                <input
                    className={classes.input}
                    type="text"
                    name="directorFullNameGen"  // Можно оставить как "directorFullNameGen"
                    value={formData.directorFullNameGen}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Инициалы ИП</label>
                <input
                    className={classes.input}
                    type="text"
                    name="initials"
                    value={formData.initials}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Адрес</label>
                <input
                    className={classes.input}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ИНН</label>
                <input
                    className={classes.input}
                    type="text"
                    name="INN"
                    value={formData.INN}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОГРНИП</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OGRNIP"
                    value={formData.OGRNIP}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Расчётный счёт</label>
                <input
                    className={classes.input}
                    type="text"
                    name="RSCH"
                    value={formData.RSCH}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Корреспондентский счёт</label>
                <input
                    className={classes.input}
                    type="text"
                    name="KSCH"
                    value={formData.KSCH}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Банк</label>
                <input
                    className={classes.input}
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>БИК</label>
                <input
                    className={classes.input}
                    type="text"
                    name="BIK"
                    value={formData.BIK}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Электронная почта</label>
                <input
                    className={classes.input}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Телефон</label>
                <input
                    className={classes.input}
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default IPCounterpartyForm;
