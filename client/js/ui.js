/**
 * Atomizer-Software-UI
 * @license Copyright (C) 2012, Atomizer Software
 * http://atomizersoft.net
 *
 * @author Atomizer Software
 */

/*global $:false, google:false */

var detectBrowser = function () {
    'use strict';
    var useragent = navigator.userAgent;
    console.log(useragent);
};

$(document).ready(function () {
    'use strict';

    detectBrowser();

    $('.open-click').click(function () {  //with this test-click and test-hover go on the entire div
        $(this).toggleClass('open');
        return false;
    });
});


/*
 *Notes:

 * test-hover needs to be on the entire div, ie the test-panel-container
 */
