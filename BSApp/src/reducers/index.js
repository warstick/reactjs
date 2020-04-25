
const initialState = {
    latestBlockInfo: {},
    loadingLatestBlock: false,
    blockInfo: {},
    currentBlock: '',
    currentTransaction: '',
    transactionInfo: {},
    loadingBlock: false,
    loadingTransaction: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'initiate_load_single_block': return {
            ...state,
            loadingBlock: true,
            currentBlock: action.blockId,
            currentTransaction: '',
            transactionInfo: {},
            latestBlockInfo: {},
            loadingLatestBlock: false,
            loadingTransaction: false,
            error: null
        };
        case 'load_single_block': return {
            ...state,
            blockInfo: action.data,
            loadingBlock: false,
            error: null
        };
        case 'initiate_load_trasaction': return {
            ...state,
            currentTransaction: action.transactionId,
            loadingTransaction: true,
            error: null
        };
        case 'load_transaction': return {
            ...state,
            transactionInfo: action.data,
            loadingTransaction: false,
            error: null
        };
        case 'initiate_load_latest_block': return {
            ...state,
            latestBlockInfo: {},
            loadingLatestBlock: true,
            error: null
        };
        case 'load_latest_block': return {
            ...state,
            latestBlockInfo: action.data,
            loadingLatestBlock: false,
            error: null
        };
        case 'api_error': return {
            ...state,
            loadingBlock: false,
            loadingLatestBlock: false,
            loadingTransaction: false,
            error: action.error
        };
        default:
            return state; 
    }
};

export default reducer;
