/////Main Page Buttons//////////
//Home Button
$('.homeButton').hover(function(){
    $(this).toggleClass('forum_hover');
});

$(".homeButton").click(function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var active = tabs[0].id;
        chrome.tabs.update(active, { url: "chrome-search://local-ntp/local-ntp.html" }, function() { });
    });
});

//Meow Menu --> Show/hide menu on click
$(".menuButton").hover(function(){
    $(this).toggleClass('forum_hover');
});

$(".menuButton").click(function(){
    keepStateForMenuSelection();
    $(".menu").toggle();
});

/////Menu-Popup Buttons////////
//Categories
$('.category').hover(function(){
    $(this).toggleClass('close_hover');
});

//When a user clicks on dogs category item it should deselect
$("#dogs").click(function() {
    if ($(this).css("opacity") == 0.4) {
        enableCategory("dogs");
    }else {
        disableCategory("dogs");
    }
    // updateLocalStorageWithCategorySelection();
    // updateLocalStorageCategories(dogs);
});

//When a user clicks on cats category item it should deselect
$("#cats").click(function() {
    if ($(this).css("opacity") == 0.4) {
        enableCategory("cats");
    }else {
        disableCategory("dogs");
    }
    // updateLocalStorageWithCategorySelection();
});

//Share
$('#share-button').hover(function(){
    $(this).toggleClass('forum_hover');
});

$("#share-button").click(function(){
    window.open('https://chrome.google.com/webstore/detail/new-tab-cat-video-extensi/lcpipfmjdfelofldlehfiogoogpkjiea?hl=en');
});

//Feedback
$('#feedback-button').hover(function(){
    $(this).toggleClass('forum_hover');
});

$("#feedback-button").click(function(){
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe5MW0-fM7FNtu3LgnYvhgDJUaMjmLUSNZsipVoUCKgtqfvRA/viewform?usp=sf_link');
});


//Donate
$('#shop').hover(function(){
    $(this).toggleClass('forum_hover');
});

$("#shop").click(function(){
    window.open('https://teespring.com/meow-meow-woof?pid=972&utm_source=mmw&utm_medium=button&utm_campaign=inapp');
});

//Close button
$('#closeIcon').hover(function(){
    $(this).toggleClass('close_hover');
});

$("#closeIcon").click(function(){
    updateLocalStorageWithCategorySelection();
    $(".menu").hide();
});
