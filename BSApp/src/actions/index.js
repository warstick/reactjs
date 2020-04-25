import axios from 'axios';
import urls from '../utils';

const {baseUrl, block, transaction, latestBlock} = urls;

const initiateGetSingleBlock = (id) => ({
    type: 'initiate_load_single_block',
    blockId: id
});

const getSingleBlock = (res) => ({
    type: 'load_single_block',
    data: res.data
});

const initiateGetTrasaction = (transactionId) => ({
    type: 'initiate_load_trasaction',
    transactionId
});

const getTransaction = (res) => ({
    type: 'load_transaction',
    data: res.data
});

const initiateGetLatestBlock = () => ({
    type: 'initiate_load_latest_block'
});

const getLatestBlock = (res) => ({
    type: 'load_latest_block',
    data: res.data
});

const onAPIError = (error, type) => ({
    type: 'api_error',
    error: {
        type: type,
        error
    }
});

// making backend calls here...
const loadSingleBlock = async (blockId, dispatch) => {
    try {
        dispatch(initiateGetSingleBlock(blockId));
        const response = await axios.get(`${baseUrl}${block}/${blockId}?cors=true`);

        dispatch(getSingleBlock(response));
    }
    catch (err) {
        console.log(err);
        dispatch(onAPIError(err, 'loading_single_block_error'));
    }
};

const loadTransaction = async (transactionId, dispatch) => {
    try {
        dispatch(initiateGetTrasaction(transactionId));
        const response = await axios.get(`${baseUrl}${transaction}/${transactionId}?cors=true`);

        dispatch(getTransaction(response));
    }
    catch (err) {
        dispatch(onAPIError(err, 'loading_single_transaction_error'));
    }
};

const loadLatestBlock = async (dispatch) => {
    try {
        dispatch(initiateGetLatestBlock());
        const response = await axios.get(`${baseUrl}${latestBlock}?cors=true`);

        dispatch(getLatestBlock(response));
    }
    catch (err) {
        dispatch(onAPIError(err, 'loading_latest_block_error'));
    }
};

export default {
    loadLatestBlock,
    loadSingleBlock,
    loadTransaction
};
