import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Spin, Alert } from 'antd';
import Actions from '../../actions';
import ReactJson from 'react-json-view';

const { loadTransaction } = Actions;


const Transaction = () => {
    const dispatch = useDispatch();
    const [transactionHashId, setTransactionHashId] = useState('');
    const { transactionInfo, loadingTransaction, error } = useSelector((state) => state);

    const onPressEnter = () => {
        loadTransaction(transactionHashId, dispatch);
    };

    const onChange = (data) => {
        setTransactionHashId(data.currentTarget.value)
    };

    return (<Spin spinning={loadingTransaction} tip="Loading Transaction Data...">
        <Input
            style={{width: '700px'}}
            placeholder="Enter Transaction Hash Id"
            size="middle"
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
        {error && error.type === 'loading_single_transaction_error' && 
        <Alert message={`something went wrong: ${JSON.stringify(error.error)}`} type='error' />}
        {!error && Object.keys(transactionInfo).length ? <ReactJson src={transactionInfo} style={{
            width: 1000,
            margin: '0 auto',
            marginTop: 30,
            textAlign: 'left',
            paddingLeft: 20,
            height: 600,
            overflow: 'auto'
        }}
        name={'response'} theme={'monokai'} collapsed={1} /> : null}
    </Spin>);
};

export default Transaction;