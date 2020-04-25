import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Spin, Alert } from 'antd';
import Actions from '../../actions';
import ReactJson from 'react-json-view';

const { loadLatestBlock } = Actions;


const LatestBlock = () => {
    const dispatch = useDispatch();
    const { latestBlockInfo, loadingLatestBlock, error } = useSelector((state) => state);

    useEffect(() => {
        loadLatestBlock(dispatch);
    }, []);

    return (<Spin spinning={loadingLatestBlock} tip="Loading Latest Block Data...">
        {error && error.type === 'loading_latest_block_error' && 
        <Alert message={`something went wrong: ${JSON.stringify(error.error)}`} type='error' />}
        {!error && Object.keys(latestBlockInfo).length ? <ReactJson src={latestBlockInfo} style={{
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

export default LatestBlock;