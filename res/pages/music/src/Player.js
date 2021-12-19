class Player {
    constructor() {
        this._currentSong;
        this._isPlaying = false;
        this._volume = 20;
        this._isMuted = false;
        this._key = 'player_preferences';
    }

    loadPreferences() {
        let _data = localStorage.getItem(this._key);
        try {
            let data = JSON.parse(_data);
            this._currentSong = data.currentSong;
            this._volume = data.volume;
            this._isMuted = data.isMuted;
            this._isPlaying = data.isPlaying;
        }
        catch (err) { console.log(err); }
    }

    savePreferences() {
        localStorage.setItem(this._key, JSON.stringify({
            currentSong: this._currentSong,
            volume: this._volume,
            isMuted: this._isMuted,
            isPlaying: this._isPlaying
        }));
    }

    isPlaying() {
        return this._isPlaying;
    }

    isMuted() {
        return this._isMuted;
    }

    getVolume() {
        return this._volume;
    }

    getCurrentSong() {
        return this._currentSong;
    }

    togglePlay() {
        this._isPlaying = this._isPlaying == false;
        this.savePreferences();
    }

    toggleMute() {
        this._isMuted = this._isMuted == false;
        this.savePreferences();
    }

    setVolume(volume) {
        this._volume = volume;
        this.savePreferences();
    }

    setCurrentSong(song) {
        this._currentSong = song;
        this.savePreferences();
    }
}