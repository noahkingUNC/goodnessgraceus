var shuffleme = (function($) {
    'use strict';
    var $grid = $('#grid'), //locate what we want to sort 
        $filterOptions = $('.gallery-filter a'), //locate the filter categories
        $sizer = $grid.find('.shuffle_sizer'), //sizer stores the size of the items

        init = function() {

            // None of these need to be executed synchronously
            setTimeout(function() {
                listen();
                setupFilters();
            }, 100);

            // instantiate the plugin
            $grid.shuffle({
                itemSelector: '[class*="col-"]',
                sizer: $sizer
            });
        },



        // Set up button clicks
        setupFilters = function() {
            var $btns = $filterOptions.children();
            $btns.on('click', function(e) {
                e.preventDefault();
                var $this = $(this),
                    isActive = $this.hasClass('active'),
                    group = isActive ? 'all' : $this.data('group');

                // Hide current label, show current label in title
                if (!isActive) {
                    $('.gallery-filter a').removeClass('active');
                }

                $this.toggleClass('active');

                // Filter elements
                $grid.shuffle('shuffle', group);
            });

            $btns = null;
        },

        // Re layout shuffle when images load. This is only needed
        // below 768 pixels because the .picture-item height is auto and therefore
        // the height of the picture-item is dependent on the image
        // I recommend using imagesloaded to determine when an image is loaded
        // but that doesn't support IE7
        listen = function() {
            var debouncedLayout = $.throttle(300, function() {
                $grid.shuffle('update');
            });

            // Get all images inside shuffle
            $grid.find('img').each(function() {
                var proxyImage;

                // Image already loaded
                if (this.complete && this.naturalWidth !== undefined) {
                    return;
                }

                // If none of the checks above matched, simulate loading on detached element.
                proxyImage = new Image();
                $(proxyImage).on('load', function() {
                    $(this).off('load');
                    debouncedLayout();
                });

                proxyImage.src = this.src;
            });

            // Because this method doesn't seem to be perfect.
            setTimeout(function() {
                debouncedLayout();
            }, 500);
        };

    return {
        init: init
    };
}(jQuery));

$(document).ready(function() {
    shuffleme.init(); //filter gallery
});

function getMenu() {

}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        // Display file content
        displayContents(contents);
    };
    reader.readAsText(file);
}

function UploadNewMenu(contents) {
    var lines = contents.split("\n");                   // Loop through all lines of record    
    $.each(lines, function(n, urlRecord) {
        $('#simpleDiv').append(urlRecord + 'EOL');
        // if (urlRecord.includes('%')) {
        //     $('#simpleDiv').append('<br/>');
        //     $('#simpleDiv').append('<h5 class=\"text-primary col-md-12\">' + urlRecord.substring(1) + '</h5>');
        //     // $('#simpleDiv').attr("style", "padding-top: 60px;")
        // } else {
        //     $('#simpleDiv').append('<div class=\"food-title col-md-4\">' + urlRecord + '</div>');
        //     $('#simpleDiv').attr("style", "Text-align:center;")
        // }

    });

}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);



function getMenu() {
    var contents = $("#Menu").text();
    var lines = contents.split("EOL");                   // Loop through all lines of record    
    $.each(lines, function(n, urlRecord) {
        //$('#simpleDiv').append(urlRecord + 'EOL');
        if (urlRecord.includes('%')) {
            $('#simpleDiv').append('<br/>');
            $('#simpleDiv').append('<h5 style=\"Text-align:center;text-decoration: underline\" class=\"text-primary col-md-12\">' + urlRecord.substring(1).toUpperCase() + '</h5>');
            // $('#simpleDiv').attr("style", "padding-top: 60px;")
        } else {
            if (n > 137) {
                // if (n % 2 == 0 && urlRecord.length > 24) {
                //     // if (n % 4 == 0) {
                //     //     $('#simpleDiv').append('<br/>');
                //     //     $('#simpleDiv').append('<p class=\"food-text\">' + urlRecord + '</p>');
                //     //     //$('#simpleDiv').attr("style", "Text-align:center;")
                //     // } else {
                //     $('#food').append('<p>' + urlRecord + '</p>');
                //     //$('#simpleDiv').attr("style", "Text-align:center;")
                //     //}

                // } else {
                //     $('#simpleDiv').append('<h5 class=\"food-title col-md-4\">' + urlRecord + '</h5>');
                //     //$('#simpleDiv').attr("style", "Text-align:center;")
                // }

            } else {
                $('#simpleDiv').append('<h5 style=\"Text-align:center;\" class=\"food-title col-md-4\">' + urlRecord + '</h5>');
                //$('#simpleDiv').attr("style", "Text-align:center;")
            }

        }



    });
    $("#Menu").remove();
}