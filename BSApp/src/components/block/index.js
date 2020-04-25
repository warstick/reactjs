import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Spin, Alert } from 'antd';
import Actions from '../../actions';
import ReactJson from 'react-json-view';

const { loadSingleBlock } = Actions;


const Block = () => {
    const dispatch = useDispatch();
    const [blockHashId, setBlockHashId] = useState('');
    const { blockInfo, loadingBlock, error } = useSelector((state) => state);

    const onPressEnter = () => {
        loadSingleBlock(blockHashId, dispatch);
    };

    const onChange = (data) => {
        setBlockHashId(data.currentTarget.value)
    };

    return (<Spin spinning={loadingBlock} tip="Loading Block Data...">
        <Input
            style={{width: '700px'}}
            placeholder="Enter Block Hash Id"
            size="middle"
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
        {error && error.type === 'loading_single_block_error' && 
        <Alert message={`something went wrong: ${JSON.stringify(error.error)}`} type='error' />}
        {!error && Object.keys(blockInfo).length ? <ReactJson src={blockInfo} style={{
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

export default Block;