import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlow, editFlow, deleteFlow } from '../../redux/slices/dataSlice';
import { useTranslation } from 'react-i18next';
import styles from './EditForm.module.css';

const EditForm = () => {
  const { flows } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ id: null, from: '', to: '', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, from, to, amount } = formData;
    if (id) {
      dispatch(editFlow({ id, newFlow: { from, to, amount: Number(amount) } }));
    } else {
      dispatch(addFlow({ from, to, amount: Number(amount) }));
    }
    setFormData({ id: null, from: '', to: '', amount: '' });
  };

  const handleEdit = (id) => {
    const flow = flows.find((f) => f.id === id);
    setFormData({ id: flow.id, from: flow.from, to: flow.to, amount: flow.amount });
  };

  const handleDelete = (id) => {
    dispatch(deleteFlow(id));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder={t('income')}
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder={t('expenditure')}
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <button type="submit">{formData.id ? t('edit') : t('add')}</button>
      </form>

      <ul className={styles.flowList}>
        {flows.map((flow) => (
          <li key={flow.id}>
            {t(flow.from)} → {t(flow.to)}: {flow.amount}
            <button onClick={() => handleEdit(flow.id)}>{t('edit')}</button>
            <button onClick={() => handleDelete(flow.id)}>{t('delete')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditForm;