import axios from 'axios';
import constants from '../../constants';
// import data from './data';

const {
    set_all_categories,
    set_categoreis_tree,
    set_all_records,
    set_playing,
    set_volume,
    set_reciters,
    set_speed,
    set_discard_playback,
    set_times_played,
    set_is_playing,
    set_loader,
    set_pages_array,
    set_current_page,
    set_page_limit,
    set_juzz_limit,
    set_ayat_limit,
    set_repeat_limit,
    set_filters,
    set_playback,
    force_update,
    set_play_button,
    set_nextButton,
    set_previousButton,
    reset_data
} = constants.red_types;

export const setDiscardPlayback = (payload) => {
    return {
        type: set_discard_playback,
        payload
    }
}

export const getAllRecords = (callbackSuccess, callbackFailure) => {
    return async dispatch => {
        try {
            const result = await axios({
                method: 'GET',
                url: 'http://waqaya.weqya.com/Test_api/pagination_api'
            });
            // const result = { data:data }

            if(Object.keys(result.data).length > 0){
                dispatch({
                    type: set_all_records,
                    payload: result.data
                });
                const pagesArray = [];
                for (let key in result.data) {
                    pagesArray.push(key);
                }
                pagesArray.sort();
                dispatch({
                    type: set_pages_array,
                    payload: pagesArray
                });
                dispatch({
                    type: set_current_page,
                    payload: pagesArray[0]
                });
                const filters = {
                    pageFilter: {
                        type: set_page_limit,
                        title: 'مرشح الصفحة',
                        min: parseInt(pagesArray[0]),
                        max: parseInt(pagesArray[pagesArray.length - 1]),
                        currMin: parseInt(pagesArray[0]),
                        currMax: parseInt(pagesArray[pagesArray.length - 1])
                    },
                    juzzFilter: {
                        type: set_juzz_limit,
                        title: 'مرشح جزو',
                        min: parseInt(result.data[pagesArray[0]][0].juz_number),
                        max: result.data[pagesArray[Object.keys(result.data).length - 1]][result.data[pagesArray[Object.keys(result.data).length - 1]].length-1].juz_number,
                        currMin: parseInt(result.data[pagesArray[0]][0].juz_number),
                        currMax: result.data[pagesArray[Object.keys(result.data).length - 1]][result.data[pagesArray[Object.keys(result.data).length - 1]].length-1].juz_number
                    },
                    ayatFilter: {
                        type: set_ayat_limit,
                        title: 'آيات مرشح',
                        min: parseInt(result.data[pagesArray[0]][0].ayat),
                        max: parseInt(result.data[pagesArray[0]][result.data[pagesArray[0]].length - 1].ayat),
                        currMin: parseInt(result.data[pagesArray[0]][0].ayat),
                        currMax: parseInt(result.data[pagesArray[0]][result.data[pagesArray[0]].length - 1].ayat)
                    },
                    voiceFilter: {
                        type: set_repeat_limit,
                        title: 'کرر الصوت',
                        min: 1,
                        max: 10,
                        currMin: 1, 
                        currMax: 1
                    }
                }
                dispatch({
                    type: set_filters,
                    payload: filters
                });
            }else{
                dispatch({
                    type: reset_data,
                    payload: null
                });
            }
            callbackSuccess();
        } catch (e) {
            console.log(e.message);
            callbackFailure();
        }
    }
}

export const getCategories = () => {
    return async dispatch => {
        try {
            const result = await axios({
                method: 'GET',
                url: 'http://waqaya.weqya.com/Test_api/category_api'
            });
            if(Object.keys(result.data).length > 0){
                dispatch({
                    type: set_all_categories,
                    payload: result.data
                });
            }else{
                dispatch({
                    type: reset_data,
                    payload: null
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}

export const setCurrentPage = (page) => {
    return {
        type: set_current_page,
        payload: page
    }
}

export const setCategoriesTree = (categoriesTree) => {
    return {
        type: set_categoreis_tree,
        payload: categoriesTree
    }
}

export const fetchRecord = (id) => {
    return async dispatch => {
        constants.closeDrawer();
        try {
            dispatch({
                type: set_loader,
                payload: true
            });
            dispatch({
                type: set_all_records,
                payload: null
            });
            const result = await axios({
                method: 'GET',
                url: 'http://waqaya.weqya.com/Test_api/records_api/' + id
            });
            dispatch({
                type: set_loader,
                payload: false
            });
            if(Object.keys(result.data).length > 0){
                dispatch({
                    type: set_all_records,
                    payload: result.data
                });
                const pagesArray = [];
                for (let key in result.data) {
                    pagesArray.push(key);
                }
                pagesArray.sort();
                dispatch({
                    type: set_pages_array,
                    payload: pagesArray
                });
                dispatch({
                    type: set_current_page,
                    payload: pagesArray[0]
                });
                const filters = {
                    pageFilter: {
                        type: set_page_limit,
                        title: 'مرشح الصفحة',
                        min: parseInt(pagesArray[0]),
                        max: parseInt(pagesArray[pagesArray.length - 1]),
                        currMin: parseInt(pagesArray[0]),
                        currMax: parseInt(pagesArray[pagesArray.length - 1])
                    },

                    juzzFilter: {
                        type: set_juzz_limit,
                        title: 'مرشح جزو',
                        min: parseInt(result.data[pagesArray[0]][0].juz_number),
                        max: result.data[pagesArray[Object.keys(result.data).length - 1]][result.data[pagesArray[Object.keys(result.data).length - 1]].length-1].juz_number,
                        currMin: parseInt(result.data[pagesArray[0]][0].juz_number),
                        currMax: result.data[pagesArray[Object.keys(result.data).length - 1]][result.data[pagesArray[Object.keys(result.data).length - 1]].length-1].juz_number
                    },
                    ayatFilter: {
                        type: set_ayat_limit,
                        title: 'آيات مرشح',
                        min: parseInt(result.data[pagesArray[0]][0].ayat),
                        max: parseInt(result.data[pagesArray[0]][result.data[pagesArray[0]].length - 1].ayat),
                        currMin: parseInt(result.data[pagesArray[0]][0].ayat),
                        currMax: parseInt(result.data[pagesArray[0]][result.data[pagesArray[0]].length - 1].ayat)
                    },
                    voiceFilter: {
                        type: set_repeat_limit,
                        title: 'کرر الصوت',
                        min: 1,
                        max: 10,
                        currMin: 1, 
                        currMax: 1
                    }
                }
                dispatch({
                    type: set_filters,
                    payload: filters
                });
            }else{
                dispatch({
                    type: reset_data,
                    payload: null
                });
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: set_loader,
                payload: false
            });
        }
    }
}

export const setLimit = (type, payload) => {
    return {
        type,
        payload
    }
}

export const setPlaying = (payload) => {
    return {
        type: set_playing,
        payload
    }
}

export const setReciters = (payload) => {
    return {
        type: set_reciters,
        payload
    }
}

export const setVolume = (payload) => {
    return {
        type: set_volume,
        payload
    }
}
export const setSpeed = (payload) => {
    return {
        type: set_speed,
        payload
    }
}

export const setTimesPlayed = (payload) => {
    return {
        type: set_times_played,
        payload
    }
}

export const setIsPlaying = (payload) => {
    return {
        type: set_is_playing,
        payload
    }
}

export const playAudio = (id) => { 
    return {
        type: set_playback,
        payload: id
    }
}

export const setForceUpdate = (payload) => {
    return {
        type: force_update,
        payload
    }
}

export const playButton = () => {
    return {
        type: set_play_button,
        payload: null
    }
}

export const nextButton = () => {
    return {
        type: set_nextButton,
        payload: null
    }
}

export const previousButton = () => {
    return {
        type: set_previousButton,
        payload: null
    }
}