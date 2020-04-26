import constants from "../../constants";
import Sound from 'react-native-sound';


const {
    set_all_categories,
    set_categoreis_tree,
    set_record,
    set_all_records,
    set_page_limit,
    set_juzz_limit,
    set_ayat_limit,
    set_repeat_limit,
    set_playing,
    set_reciters,
    set_speed,
    set_volume,
    set_discard_playback,
    set_times_played,
    set_is_playing,
    set_loader,
    set_pages_array,
    set_current_page,
    set_filters,
    set_playback,
    force_update,
    set_play_button,
    set_nextButton,
    set_previousButton
} = constants.red_types;

const intiial_state = {
    isPlaying: false,
    loader: false,
    allRecords: null,
    allCategories: null,
    categoriesTree: null,
    record: null,
    playing: { playing: null },
    pageFilter: {
        type: set_page_limit,
        title: 'مرشح الصفحة',
        min: 0,
        max: 1212,
        currMin: 0,
        currMax: 1212
    },
    juzzFilter: {
        type: set_juzz_limit,
        title: 'مرشح جزو',
        min: 0,
        max: 30,
        currMin: 0,
        currMax: 30
    },
    ayatFilter: {
        type: set_ayat_limit,
        title: 'آيات مرشح',
        min: 0,
        max: 300,
        currMin: 0,
        currMax: 300
    },
    voiceFilter: {
        type: set_repeat_limit,
        title: 'کرر الصوت',
        min: 0,
        max: 10,
        currMin: 0,
        currMax: 1
    },
    reciters: { i: null },
    volume: 1,
    speed: { i: 1 },
    timesPlayed: { i: 0 },
    pagesArray: null,
    currentPage: null,
    forceUpdate: null,
    playbackIndex: { i: undefined }
}

function _padPageNumber(number){
    let str = "" + number
    let pad = "000"
    return pad.substring(0, pad.length - str.length) + str;
}


export default (state = intiial_state, action) => {
    switch (action.type) {
        case set_filters:
            return {
                ...state,
                pageFilter: action.payload.pageFilter,
                ayatFilter: action.payload.ayatFilter,
                juzzFilter: action.payload.juzzFilter,
                voiceFilter: action.payload.voiceFilter,
            }
        case set_discard_playback:
            return {
                ...state, discardPlayback: action.payload
            }
        case set_is_playing:
            return {
                ...state, isPlaying: action.payload
            }
        case set_times_played:
            return {
                ...state, timesPlayed: action.payload
            }
        case set_all_categories:
            return {
                ...state, allCategories: action.payload
            }
        case set_categoreis_tree:
            return {
                ...state, categoriesTree: action.payload
            }
        case set_record:
            return {
                ...state, record: action.payload
            }
        case set_all_records:
            if (state.playing.playing) {
                state.playing.playing.release();
                state.playbackIndex.i = 0;
                state.timesPlayed.i = 0;
            }
            if (!action.payload) state.currentPage = null;
            return {
                ...state, allRecords: action.payload
            }
        case set_playing:
            state.playing.playing = action.payload;
            return {
                ...state,
            }
        case set_pages_array:
            return {
                ...state, pagesArray: action.payload
            }
        case set_reciters:
            return {
                ...state, reciters: action.payload
            }
        case set_speed:
            state.speed.i = action.payload;
            state.playing.playing.setSpeed(action.payload);
            return {
                ...state
            }
        case set_volume:
            return {
                ...state, volume: action.payload
            }
        case set_loader:
            return {
                ...state, loader: action.payload
            }
        case set_nextButton:
            if (state.playbackIndex.i) if (state.playbackIndex.i < state.currentPage.data.length) {
                state.playbackIndex.i++;
                return startPlayback(state, state.currentPage.data[state.playbackIndex.i].id);
            }
            return state;
        case set_previousButton:
            if (state.playbackIndex.i) if (state.playbackIndex.i !== 0) {
                state.playbackIndex.i--;
                return startPlayback(state, state.currentPage.data[state.playbackIndex.i].id);
            }
            return state;
        case set_play_button:
            if (state.playbackIndex.i) {
                if (state.playing.playing.isPlaying()) state.playing.playing.pause();
                else return startPlayback(state);
            }
            return { ...state };
        case set_current_page:
            {
                if (state.playing.playing) {
                    state.playbackIndex.i = undefined;
                    state.playing.playing.release();
                }
                const data = state.allRecords[action.payload];
                const newAyatFilter = {
                    ...state.ayatFilter,
                    min: parseInt(data[0].ayat),
                    max: parseInt(data[data.length - 1].ayat),
                    currMin: parseInt(data[0].ayat),
                    currMax: parseInt(data[data.length - 1].ayat)
                };
                return {
                    ...state, currentPage: { page: action.payload, data }, ayatFilter: newAyatFilter
                }
            }
        case set_page_limit:
            {
                const newPageFilter = { ...state.pageFilter };
                newPageFilter.currMin = action.payload[0];
                newPageFilter.currMax = action.payload[1];
                state.pageFilter = newPageFilter;
                if (state.playing.playing) {
                    state.playbackIndex.i = undefined;
                    state.playing.playing.release();
                }

                state.currentPage = { page: action.payload[0], data: state.allRecords[_padPageNumber(action.payload[0])] };
                const data = state.currentPage.data;
                const newAyatFilter = {
                    ...state.ayatFilter,
                    min: parseInt(data[0].ayat),
                    max: parseInt(data[data.length - 1].ayat),
                    currMin: parseInt(data[0].ayat),
                    currMax: parseInt(data[data.length - 1].ayat)
                };
                state.ayatFilter = newAyatFilter;
                state.pagesArray = [];
                for (let i = action.payload[0]; i <= action.payload[1]; i++) {
                    state.pagesArray.push(_padPageNumber(i));
                }
                return filterData(state);
            }
        case set_juzz_limit:
            {
                const newJuzzFilter = { ...state.juzzFilter };
                newJuzzFilter.currMin = action.payload[0];
                newJuzzFilter.currMax = action.payload[1];
                state.juzzFilter = newJuzzFilter;
                state.pagesArray = [];
                for (let key in state.allRecords) {
                    if (parseInt(state.allRecords[key][0].juz_number) > newJuzzFilter.currMin && parseInt(state.allRecords[key][0].juz_number) < newJuzzFilter.currMax) {
                        state.pagesArray.push(parseInt(key));
                    }
                }
                if (state.playing.playing) {
                    state.playbackIndex.i = undefined;
                    state.playing.playing.release();
                }
                if (state.pagesArray.length !== 0) {
                    state.currentPage = { page: state.pagesArray[0], data: state.allRecords[state.pagesArray[0]] };
                    let data = state.pagesArray;
                    const newPageFilter = {
                        ...state.pageFilter,
                        min: data.length !== 0 ? parseInt(data[0]) : 0,
                        max: data.length !== 0 ? parseInt(data[data.length - 1]) : 0,
                        currMin: data.length !== 0 ? parseInt(data[0]) : 0,
                        currMax: data.length !== 0 ? parseInt(data[data.length - 1]) : 0
                    };
                    data = state.currentPage.data;
                    const newAyatFilter = {
                        ...state.ayatFilter,
                        min: parseInt(data[0].ayat),
                        max: parseInt(data[data.length - 1].ayat),
                        currMin: parseInt(data[0].ayat),
                        currMax: parseInt(data[data.length - 1].ayat)
                    };
                    state.ayatFilter = newAyatFilter;
                    state.pageFilter = newPageFilter;
                    return filterData(state);
                }
                else {
                    let data = state.pagesArray;
                    const newPageFilter = {
                        ...state.pageFilter,
                        min: 0,
                        max: 1,
                        currMin: 0,
                        currMax: 1
                    };
                    data = state.currentPage.data;
                    const newAyatFilter = {
                        ...state.ayatFilter,
                        min: 0,
                        max: 1,
                        currMin: 0,
                        currMax: 1
                    };
                    state.ayatFilter = newAyatFilter;
                    state.pageFilter = newPageFilter;
                    return { ...state, currentPage: null, }
                }
            }
        case set_ayat_limit:
            {
                const newAyatFilter = { ...state.ayatFilter };
                newAyatFilter.currMin = action.payload[0];
                newAyatFilter.currMax = action.payload[1];
                state.ayatFilter = newAyatFilter;
                if (state.playing.playing) {
                    state.playbackIndex.i = undefined;
                    state.playing.playing.release();
                }
                return filterData(state);
            }
        case set_repeat_limit:
            {
                const newVoiceFilter = { ...state.voiceFilter };
                newVoiceFilter.currMin = action.payload[0];
                newVoiceFilter.currMax = action.payload[1];
                state.voiceFilter = newVoiceFilter;
                if (state.playing.playing) {
                    state.playbackIndex.i = undefined;
                    state.playing.playing.release();
                }
                return filterData(state);
            }
        case set_playback:
            return startPlayback(state, action.payload);
        case force_update:
            return { ...state, forceUpdate: action.payload };
        default:
            return state;
    }
}

const filterData = (state) => {
    const data = [...state.allRecords[state.currentPage.page]];
    let i = 0;
    while (i < data.length) {
        if (data[i].ayat > state.ayatFilter.currMax || data[i].ayat < state.ayatFilter.currMin) {
            data.splice(i, 1);
        } else {
            i++;
        }
    }

    i = 0;
    while (i < data.length) {
        if (data[i].juz_number > state.juzzFilter.currMax || data[i].juz_number < state.juzzFilter.currMin) {
            data.splice(i, 1);
        } else {
            i++;
        }
    }
    state.currentPage.data = data;
    return { ...state };
}

const startPlayback = (state, id) => {
    let audio;
    if (id) {
        state.timesPlayed.i = 0;
        if (state.playing.playing) state.playing.playing.release();
        state.playing.playing = null;
        audio = JSON.parse(state.currentPage.data.find((el, i) => {
            state.playbackIndex.i = i;
            return el.id === id;
        }).play_list_audio);
        state.reciters.i = audio;
    }
    const playAudio = (url) => {
        if (constants.forceUpdate) constants.forceUpdate();
        state.forceUpdate();
        const currentIndex = state.playbackIndex.i;
        if (url) {
            console.log(url);
            state.playing.playing = new Sound(
                url,
                null,
                e => {
                    if (e) {
                        console.log(e);
                    }
                    else {
                        state.playing.playing.play(() => {
                            if (state.timesPlayed.i === state.voiceFilter.currMax - 1) {
                                //play next
                                if (currentIndex === state.playbackIndex.i) {
                                    state.playbackIndex.i++;
                                    state.timesPlayed.i = 0;
                                    if (state.playbackIndex.i < state.currentPage.data.length) {
                                        const audio2 = JSON.parse(state.currentPage.data[state.playbackIndex.i].play_list_audio);
                                        state.reciters.i = audio2;
                                        playAudio(constants.audioUrl + audio2[0]);
                                    } else state.playing.playing.release();
                                }
                            } else {
                                //repeat
                                state.timesPlayed.i++;
                                playAudio();
                            }
                            if (constants.forceUpdate) constants.forceUpdate();
                            state.forceUpdate();
                        });
                    }
                    state.playing.playing.setSpeed(state.speed.i);
                });
        }
        else {
            state.playing.playing.play(() => {
                if (state.timesPlayed.i === state.voiceFilter.currMax - 1) {
                    //play next
                    if (currentIndex === state.playbackIndex.i) {
                        state.playbackIndex.i++;
                        state.timesPlayed.i = 0;
                        if (state.playbackIndex.i < state.currentPage.data.length) {
                            const audio2 = JSON.parse(state.currentPage.data[state.playbackIndex.i].play_list_audio);
                            state.reciters.i = audio2;
                            playAudio(constants.audioUrl + audio2[0]);
                        } else state.playing.playing.release();
                    }
                } else {
                    //repeat
                    state.timesPlayed.i++;
                    playAudio();
                }
                if (constants.forceUpdate) constants.forceUpdate();
                state.forceUpdate();
            });
        }
    }
    if (id) playAudio(constants.audioUrl + audio[0]);
    else playAudio();
    if (constants.forceUpdate) constants.forceUpdate();
    state.forceUpdate();
    state.playing.playing.setSpeed(state.speed.i);
    return { ...state };
}