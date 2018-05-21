//
// cemeteryDeleteFilter.js
// 
// Created by Brad Hefta-Gaub to use Entities on Jan. 25, 2018
// Edited by Elisa Lupin-Jimenez for the pinata and candles in hifi://Mexico
// Copyright 2018 High Fidelity, Inc.
//
// This entity edit filter script will get all edits, adds, physcis, and deletes, but will only block
// deletes, and will pass through all others.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
// FIXME: FILTERS AREN'T WORKING AS OF 4-26-2018
// see https://github.com/highfidelity/hifi/pull/11997 for info on using filters 
//

function filter(properties, filterType, originalProperties) {

    var SAVED_ENTITY_NAMES = [
        "Cemetery Candle"
    ];

    if (filterType === Entities.DELETE_FILTER_TYPE) {
        SAVED_ENTITY_NAMES.forEach(function(name) {
            if (name.indexOf(originalProperties.name) !== -1) {
                return false;
            }
        });
        return properties;
    }
    
    if (filterType === Entities.EDIT_FILTER_TYPE) {
        if (properties.name && properties.name !== originalProperties.name ||
            properties.dimensions && properties.dimensions !== originalProperties.dimensions ||
            properties.modelURL && properties.modelURL!== originalProperties.modelURL ||
            properties.script && properties.script !== originalProperties.script ||
            properties.serverScripts && properties.serverScripts !== originalProperties.serverScripts ||
            properties.textures && properties.textures !== originalProperties.textures) {
            return false;
        }
    }
    return properties;
}

filter.wantsToFilterAdd = true;
filter.wantsToFilterEdit = true; 
filter.wantsToFilterPhysics = false; // don't run on physics
filter.wantsToFilterDelete = true; // do run on deletes
filter.wantsOriginalProperties = ["name", "dimensions", "modelURL", "script", "serverScripts", "textures"];
filter;