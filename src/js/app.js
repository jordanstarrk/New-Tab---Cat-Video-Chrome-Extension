//Categories dictionary values are:
// 0: number of videos in list
// 1: endpoint directory in AWS
// 2: list of videos based on count
//3: User Selected On or Off
var categoryDictionaries = {
	"cats" : [87, "/categories/cats/", [], true], //By default cats only will be turned on.
	"dogs" : [61, "/categories/dogs/", [], false],
	"fish" : [33, "/categories/fish/", [], false]
};

var appEnabled = true;
//todo add test to iterate each item at value 1 to check for the last item to be /

var populateCategoryDictionariesLists = function(){
	for (category in categoryDictionaries){
		categoryValues = categoryDictionaries[category];
		videoCount = categoryValues[0];
		endpoint = categoryValues[1];
		videoList = categoryValues[2];

		for (var video=1; (video < videoCount + 1); video++) {
			videoList.push("https://d9m01xi7ip4je.cloudfront.net" + endpoint + video + ".mp4");
		}
	}
}(); //this line is important. It executes the populating of categoryDictionaries video list.

var tempDisableApp = function() {
	appEnabled = false;
};

var enableApp = function() {
	appEnabled = true;
};

//Helper Functions
var getCategoryVideoCount = function(category){
	categoryValues = categoryDictionaries[category];
	videoCount = categoryValues[0]
}

var getCategoryVideoEndpoint = function(category) {
	categoryValues = categoryDictionaries[category];
	endpoint = categoryValues[1];
	return endpoint;
};

var getCategoryVideoList = function(category) {
	categoryValues = categoryDictionaries[category];
	videoList = categoryValues[2];
	return videoList;
};

var isCategorySelected = function(category){
	categoryValues = categoryDictionaries[category];
	onOff = categoryValues[3];
	return onOff;
};

var getListOfEnabledCategories = function(){
	listOfEnabledCategories = []
	for (key in categoryDictionaries) {
		if (isCategorySelected(key) == true) {
			listOfEnabledCategories.push(key);
		}
	}
	return listOfEnabledCategories;
}

var getListOfDisabledCategories = function(){
	listOfDisabledCategories = []
	for (key in categoryDictionaries) {
		if (isCategorySelected(key) == false) {
			listOfDisabledCategories.push(key);
		}
	}
	return listOfDisabledCategories;
}

var enableCategory = function (category) {
	categoryValues = categoryDictionaries[category];
	categoryValues[3] = true;
	setMenuCategoryItemOpacity(category, "on");
	updateLocalStorageCategories();
};

var disableCategory = function (category) {
	categoryValues = categoryDictionaries[category];
	categoryValues[3] = false;
	setMenuCategoryItemOpacity(category, "off");
	updateLocalStorageCategories();
};

var tempDisablePicture = ["src/assets/images/tempDisable.jpg"];

var getLocalStorageUserCategoryList = function(){
	return localStorage.getItem("categories");
};

var setMenuCategoryItemOpacity = function(menuItem, onOrOff) {
	opacity = 1
	id = menuItem
	cssClassId = "#" + id

	if (onOrOff == "on"){
		opacity = 1;
	} else if (onOrOff == "off"){
		opacity = 0.4;
	}
	$(cssClassId).css("opacity", opacity);
};

	// localStorage.setItem("categories", localStorageCategoryList);

	// if ($("#cats").css("opacity") == 1 && $("#dogs").css("opacity") == 1){
	// 	addCategoryToCategoryList()
	// 	for (i in localStorageCategoryList){
	// 		console.log(i)
	// 	}
	// 	localStorage.setItem("category", "catsAndDogs");
	// 	// console.log("CATS AND DOGS");
	// }
	// if ($("#cats").css("opacity") == 0.4 && $("#dogs").css("opacity") == 0.4){
	// 	localStorage.setItem("category", "noneSelected");
	// 	// console.log("None?");
	// }
	// if ($("#cats").css("opacity") == 1 && $("#dogs").css("opacity") == 0.4){
	// 	localStorage.setItem("category", "catsOnly");
	// 	// console.log("CATS ONLY");
	// }
	// if ($("#cats").css("opacity") == 0.4 && $("#dogs").css("opacity") == 1){
	// 	localStorage.setItem("category", "dogsOnly");
	// 	// console.log("DOGS ONLY");
	// }
// };

// var getLocalStorageCagtegoriesList
//This function sets local storage variable 'categories' with a list of selected categories.
var updateLocalStorageCategories = function(){
	updatedListOfCategories = getListOfEnabledCategories();
	localStorage.setItem("categories", updatedListOfCategories);
};

var getLocalStorageCategoriesList = function(){
	return localStorage.getItem("categories");
};

var selectRandomVideoFromRandomCategory = function(){
	randomCategory = "";
	randomVideo = "";

	var selectRandomCategory = function(){
		categoriesArray = getListOfEnabledCategories();
		randomCategory = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
	}();

	var selectRandomVideo = function() {
		randomVideoList = getCategoryVideoList(randomCategory);
		randomVideo = randomVideoList[Math.floor(Math.random() * randomVideoList.length)]
		// console.log(randomVideo);
		// randomVideoString = randomVideo.toString();
	}();
	return randomVideo;
};

var isUserOnline = function(){
	if (window.navigator.onLine == true){
		return true;
	} else {
		return false;
	}
};

var playAVideo = function() {
	videoURL = selectRandomVideoFromRandomCategory();
	document.getElementById("arrayString").innerHTML="<video class=\"fullscreen-video\" loop muted autoplay poster=\"" + videoURL + "\"><source src=\"" + videoURL + "\" type=\"video/mp4\"></video>";
};

var playDisabledAppPlaceholder = function() {
	document.getElementById("arrayString").innerHTML="<img src=\"assets\"images\"tempDisable.jpg\" id=\"tempDisable\">";
};

var playOfflineVideo = function() {
	offlineVideo = "src/assets/images/offlineCat.mp4";
	document.getElementById("arrayString").innerHTML="<video class=\"fullscreen-video\" loop muted autoplay poster=\"" + offlineVideo + "\"><source src=\"" + offlineVideo + "\" type=\"video/mp4\"></video>";
};

var keepMenuState = function() {
	syncCategories();
};

var keepStateForMenuSelection = function(){
	if (localStorage.getItem("category") == "catsOnly"){
		$("#cats").css("opacity", 1);
		$("#dogs").css("opacity", 0.4);
	}

	if (localStorage.getItem("category") == "dogsOnly"){
		$("#cats").css("opacity", 0.4);
		$("#dogs").css("opacity", 1);
	}

	if (localStorage.getItem("category") == "noneSelected"){
		$("#cats").css("opacity", 0.4);
		$("#dogs").css("opacity", 0.4);
	}

	if (localStorage.getItem("category") == "catsAndDogs"){
		$("#cats").css("opacity", 1);
		$("#dogs").css("opacity", 1);
	}

	if (localStorage.getItem("category") == null){
		$("#dogs").css("opacity", 0.4);
	}
};

var newKeepState = function() {
	enabledCategoriesList = getListOfEnabledCategories();
	disabledCategoriesList = getListOfDisabledCategories();
	if (getLocalStorageCategoriesList() == null) {
		setMenuCategoryItemOpacity("cats", "off");
	}
	if (getLocalStorageCategoriesList() != null) {
		for (i in disabledCategoriesList) {
			setMenuCategoryItemOpacity(i, "off");
		for (i in enabledCategoriesList) {
			setMenuCategoryItemOpacity(i, "on");
		}
		}
	}
};

// var run = function(){
// 	listToPlay = getSavedUserCategoryListPreference();
// 	if (checkIfUserOnline() == true && getSavedUserCategoryListPreference() == "tempDisablePicture"){
// 		document.getElementById("arrayString").innerHTML=playAPicture();
// 		keepStateForMenuSelection();
//
// 	} else if (checkIfUserOnline() == true){
// 		numberInListToPlay = getRandomNumberInChosenList(listToPlay);
// 		document.getElementById("arrayString").innerHTML=playAVideo(listToPlay, numberInListToPlay);
// 		keepStateForMenuSelection();
// 	}
// 	 else {
// 		document.getElementById("arrayString").innerHTML=playOfflineVideo();
// 	};
// };


// if (localStorage.getItem("categories") == null) {
// 	$("#dogs").css("opacity") == 0.4;
// 	return catsOnlyVideoList;
// }
// if (localStorage.getItem("category") == "noneSelected") {
// 	return tempDisablePicture;
//
// } else if (localStorage.getItem("category") == "catsAndDogs"){
// 	return chooseRandomVideoListBetweenDogsAndCats();
//
// } else if (localStorage.getItem("category") == "catsOnly"){
// 	return catsOnlyVideoList;
//
// } else if (localStorage.getItem("category") == "dogsOnly"){
// 	return dogsOnlyVideoList;
// }

var run = function (){
		if (isUserOnline() == true && appEnabled == false){
			playDisabledAppPlaceholder();
			keepStateForMenuSelection();
		} else if (isUserOnline() == true) {
			playAVideo();

		} else {
			playOfflineVideo();
		}
};

run();

/*********************************************
Redirect users to a feedback form on uninstall
**********************************************/
chrome.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSeykxJbhQckDZ1j3WU3D8Onr06uliiABdhtc1aIW6mxjzBCfQ/viewform?usp=sf_link');
