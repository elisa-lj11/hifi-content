//
// playRadioMusic.js
// A script that creates audio injectors with music from a specified entity
//
// Author: Elisa Lupin-Jimenez
// Copyright High Fidelity 2018
//
// Licensed under the Apache 2.0 License
// See accompanying license file or http://apache.org/
//
// All assets are under CC Attribution Non-Commerical
// http://creativecommons.org/licenses/
//

(function() {
    songUrlsArray;
    songsArray = [];
    var VOLUME = 0.5;

    var _this;

    function Radio() {
        return;
    }

    Radio.prototype = {
        injector: null,

        preload: function(entityID) {
            _this = this;
            _this.properties = Entities.getEntityProperties(entityID, ["position", "userData"]);
            songUrlsArray = JSON.parse(properties.userData).songs;
            songUrlsArray.forEach(function(song) {
                songsArray.push(SoundCache.getSound(song));
            });
        },

        playSong: function() {
            var size = songUrlsArray.length - 1;
            var index = Math.round(Math.random() * size);
            var song = songsArray[index];
            Audio.playSound(song, {volume: VOLUME, position: _this.properties.position});
        }



    }

    var self = new Radio();
    return self;

});

var injector;

this.preload = function(entityID) {
    injector = SoundCache.getSound("some-sound.com");
}

if (!injector) {
    injector = Audio.playSound(someCachedSound, {volume: 1, position: {x:0, y:0, z:0}});
    injector.finished.connect(function() {
    injector = null;
});
