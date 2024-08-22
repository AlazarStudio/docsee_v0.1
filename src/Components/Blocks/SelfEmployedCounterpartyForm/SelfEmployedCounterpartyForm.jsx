import React from "react";
import classes from './SelfEmployedCounterpartyForm.module.css';

function SelfEmployedCounterpartyForm({ formData, handleChange }) {
    return (
        <>
            <div>
                <label>ФИО</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Действует на основании</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="basis"
                    value={formData.basis}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Инициалы и фамилия</label>
                <input
                    required
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
                    required
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
                    required
                    className={classes.input}
                    type="text"
                    name="INN"
                    value={formData.INN}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Паспорт Серия</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="passportSeries"
                    value={formData.passportSeries}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Паспорт Номер</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Расчётный счёт</label>
                <input
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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

export default SelfEmployedCounterpartyForm;
