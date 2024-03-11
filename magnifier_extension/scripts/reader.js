// js file
// Testing console
console.log("Accessibility Rocks!");

// Global variable to keep track of current zoom level
var currentZoom = 1.0;

// Global variable to keep track of the current scale
var currentScale = 1.0;

// Global variable to keep track of the state of refactored content
var isContentRefactored = false;

//Anything that appears between the curly braces will not be run until the whole web page has loaded
$(document).ready(function () {

    // Browser Zoom START 
    // Increase or decrease by 0.1 with document.body.style.zoom
    // 1.0 is No Zoom/ Default
    // > 1.0 is Zoom In
    // < 1.0 is Zoom Out
    document.addEventListener('keydown', function(event) {
        if ((event.key === '+' || event.key === '=') && !event.shiftKey) {
            currentZoom = (currentZoom * 10 + 1) / 10; 
            document.body.style.zoom = currentZoom;
            console.log(`Current Zoom: ${currentZoom}`);
        } else if ((event.key === '-' || event.key === '_') && !event.shiftKey) {
            currentZoom = (currentZoom * 10 - 1) / 10; 
            document.body.style.zoom = currentZoom;
            console.log(`Current Zoom: ${currentZoom}`);
        }
    });
    // END of Browser Zoom Section

    // Graphical Zoom START
    // enlarges (or scales) the size of the pixels on the screen
    // shift+ or shift- increase and decrease the magnification by .1
    document.addEventListener('keydown', function(event) {
        if (event.shiftKey && (event.key === '+' || event.key === '=')) {
            currentScale = (currentScale * 10 + 1) / 10; 
            updateScaleAndPosition();
        } else if (event.shiftKey && (event.key === '-' || event.key === '_')) {
            currentScale = (currentScale * 10 - 1) / 10; 
            updateScaleAndPosition();
        }
    });

    // Function to update the scale and position of the body content
    // Set the position of the element (the whole BODY) to move over to the right by half the increase in size. 
    // To make it so you can move it, you’ll need to set the positioning type to “relative,” 
    // which you can do with $(“body”).css(“position”, “relative”)
    function updateScaleAndPosition() {
        $("body").css({
            "transform": `scale(${currentScale})`,
            "position": "relative",
            "transform-origin": "top left"
        });
        console.log("Current Scale:", currentScale);
    }

    // Function that will gradually move the content left when the mouse is within 100px of the left side of the screen
    // and moves it right when the mouse is within 100px of the right of the screen
    $(document).mousemove(function(event) {
        // Only proceed if the document width is greater than the window width
        if ($(document).width() > $(window).width()) {
            let windowWidth = $(window).width();
    
            // Check if the mouse is within 100px of the LEFT side of the screen, scroll left
            if (event.clientX < 100) {
                // Check if an animation is not already in progress
                if (!$("html, body").is(":animated")) {
                    $("html, body").animate({scrollLeft: '-=100'}, 50);
                }
            }
            // Check if the mouse is within 100px of the RIGHT side of the screen, scroll right
            else if (event.clientX > windowWidth - 100) {
                // Check if an animation is not already in progress
                if (!$("html, body").is(":animated")) {
                    $("html, body").animate({scrollLeft: '+=100'}, 50);
                }
            }
        }
    });
    // END of Graphical Zoom Section

    // Refactoring Content START
    // Selector from HW3
    $("*:not(body)").hover( 
        function (ev) {
            // Remove highlights from all other elements before adding a new one
            $(".highlight").removeClass("highlight");
            
            // Add highlight to the current element
            $(this).addClass("highlight");

            // Store the current highlighted element
            currentHighlight = this; 

            // Stop the event from propagating, only want the first element to trigger the outline
            ev.stopPropagation(); 
        },
        function (ev) {
            // Remove highlight when the mouse leaves the element
            $(this).removeClass("highlight");

            // Clear the current highlighted element
            currentHighlight = null; 
        } 
    );

    // Spacebar event handler
    // Spacebar creates a new larger and centered element on the screen that displays the content with big text and/or a larger image
    // Spacebar again makes large box disappear
    // Prevent spacebar default page jump
    $(document).keydown(function(e) {
        if (e.keyCode === 32) { 
            e.preventDefault(); 
            if (currentHighlight && !$("#refactoredContent").length) {
                var content;
                if ($(currentHighlight).is('img')) {
                    var src = $(currentHighlight).attr('src');
                    var img = new Image();
                    img.onload = function() {
                        var style;
                        // Check if the image is smaller 
                        if (this.naturalWidth < 400 || this.naturalHeight < 400) {
                            // Scale up smaller images 
                            style = 'width: auto; height: auto; min-width: 400px; min-height: 400px; max-width: 100vw; max-height: 100vh; object-fit: contain;';
                        } else {
                            // Ensure large imagea don't exceed the viewport
                            style = 'max-width: 100vw; max-height: 100vh;';
                        }
                        content = $('<img src="' + src + '" style="' + style + '">');
                        
                        // Create and append the refactored content box
                        createRefactoredContent(content);
                    };
                    img.src = src;
                } else {
                    // Handle text content scaling
                    content = $('<div>').text($(currentHighlight).text()).css({
                        'font-size': '30px', 
                        'max-width': '100vw',
                        // Keep line breaks and spaces
                        'white-space': 'pre-wrap', 
                        // Break words to prevent overflow
                        'word-wrap': 'break-word' 
                    });
    
                    createRefactoredContent(content);
                }
            } else if (isContentRefactored) {
                // If refactored content already exists, remove it
                $("#refactoredContent").remove();
                isContentRefactored = false;
            }
        }
    });
    // Function define and style the refactored content container
    function createRefactoredContent(content) {
        var refactoredContent = $("<div id='refactoredContent'></div>").append(content).css({
            position: 'fixed',
            left: '50%',
            // Align top of the box with the top of the viewport
            top: '0', 
            transform: 'translateX(-50%)',
            zIndex: '10',
            // Slightly transparent
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid black',
            width: '80%', 
            // Full viewport height
            height: '100vh', 
            // Allow vertical scrolling
            overflowY: 'auto', 
            boxSizing: 'border-box',
        });
    
        $("body").append(refactoredContent);
        isContentRefactored = true;
    }
    
});

