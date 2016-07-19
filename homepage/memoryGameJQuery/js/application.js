var cardClicked;
var chooseLevelScreen = $("#chooseLevelScreen");
var chosenLevel;
var instruction = $("#instructionText");
var oCradsContainer = $("#cradsContainer");
var cardFlag;
var pairsRemoved = [];
var gameScreen = $("#gameScreen");
var animationScreen = $("#animationScreen");;
var clickedCards = [];
var animateTest = $("#animateTest");
var animateFireworks = $("#animateFireworks");

cradsContainer = $("#cradsContainer");

	// var flipeUrl = "Sounds/flipcard.wav", flipBuffer;
	// var bubbleUrl = "Sounds/bubble.mp3", bubbleBuffer;
	// var applauseUrl = "Sounds/applause.wav", applauseBuffer;
var flipeUrl = "Sounds/flipcard.wav";
var bubbleUrl = "Sounds/bubble.mp3";
var applauseUrl = "Sounds/applause.wav";
	// var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	// if(contextClass) {
	// 	var context = new contextClass();

	// 	loadSound(flipeUrl, function(buffer) {
	// 		flipBuffer = buffer;
	// 	});
	// 	loadSound(bubbleUrl, function(buffer) {
	// 		bubbleBuffer = buffer;
	// 	});
	// 	loadSound(applauseUrl, function(buffer) {
	// 		applauseBuffer = buffer;
	// 	});
	// };

//~~~~~~~~~ Load sounds									~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// function loadSound(url, onSuccess, onError) {
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   // Decode asynchronously
//   request.onload = function() {
//     context.decodeAudioData(request.response, onSuccess, onError);
//   }
//   request.send();
// }

//~~~~~~~~~ Arrange cards and shuffle content array  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function levelLayoutCreation(nLevel)
{

    instruction.removeClass("visibilityH");
	var nCards;
	switch (nLevel) {
		case 1: nCards = 8;
		break;
		case 2: nCards = 12;
		break;
		case 3: nCards = 16;
		break;
	}


	/*             ------ remove selection screen and add game screen ------ */

	chooseLevelScreen.addClass("visibilityH");
	gameScreen.addClass("visibilityV");

	/*             ------ create cards containers ------                    */

	var cardContainerObj;
	var SVGObjectsList = ["semantics", "presentation", "performance", "deviceAccess", "multimedia", "graphics", "connectivity", "storage"];
	var currentLevelArray = [];
	for (var i=1; i<nCards+1; i++) {
		cardContainerObj = document.createElement("div");
		cardContainerObj.id = "cardContainer" +  i;
		cardContainerObj.className = "cardContainer";
		cardContainerObj.classList.add("bounceIn");
		oCradsContainer.append(cardContainerObj);
		cardContainerObj.innerHTML = "<div class='flipper'>" +
		"<div class='front'>" +
		"<\/div>" +
		"<div class='back'>" +
		"<\/div>";
	};

	//~~~~~~~~~ Add Click event listener                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	for (var i=1; i<nCards+1; i++) {
		cardContainerObj = $("#cardContainer" + i);
		cardContainerObj.click(function(e) {
			cardClicked = (e.target);
			cardFlag = cardClicked.parentNode;
			if (clickedCards.length < 2) {
				flipCard(cardClicked,cardFlag);
			}
		});
		// cardContainerObj.addEventListener("tap", gestureHandler, false);
	}

	/*             ------ create specific level array ------               */

	for(var j=0; j<nCards/2; j++) {
		currentLevelArray.push(SVGObjectsList[j] + "1");
		currentLevelArray.push(SVGObjectsList[j] + "2");
	}

	/*             ------ inject SVG Elements ------                */

	var cardBack = $(".back");
	var rand = Math.random();

	shuffleArray(currentLevelArray);

	for (var j=0; j<nCards; j++) {
		cardSVGObj = cardBack[j];
		cardSVGObj.innerHTML = "<img src='SVG/html5_" + currentLevelArray[j] + "_small.svg'  id='" + currentLevelArray[j] + "'>";
	}

	playSounds("bubble");
}

//~~~~~~~~~ Flip cards and check card pairs         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function flipCard(el,n) {
	clickedCardContainer = cardFlag.childNodes[1];
	clickedCardId = clickedCardContainer.childNodes[0].id;
	cardFlag.classList.toggle("flip");
	playSounds("flip");
	clickedCards.push(clickedCardId);
	//console.log(clickedCards);
	if(clickedCards.length === 2) {
		comPair(clickedCards);
	}
}

//~~~~~~~~~ Play sounds                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function playSounds(sound) {
	// var source;
	var audioTagSource;
	// if(context) {
	// 	source = context.createBufferSource();
	// 	switch(sound) {
	// 		case "bubble": source.buffer = bubbleBuffer;
	// 		break;
	// 		case "flip": source.buffer = flipBuffer;
	// 		break;
	// 		case "applause": source.buffer = applauseBuffer;
	// 		break;
	// 	};
	// 	source.connect(context.destination);
	// 	source.start(0);
	// }
	// else {

	switch(sound) {
		case "bubble": audioTagSource = $("#multiaudio1");
		break;
		case "flip": audioTagSource = $("#multiaudio2");
		break;
		case "applause": audioTagSource = $("#multiaudio3");
		break;
	};
	audioTagSource.trigger("play");
	//
}

//~~~~~~~~~ Return to choose level Screen                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function backToLevelChoice() {

	oCradsContainer.html("");
	nLevel = 0;
	if (animationScreen.hasClass("displayBlock")) {
		pairsRemoved.length = 0;
		animationScreen.removeClass("displayBlock");
		animationScreen.addClass("displayNone");
	}
	else if (gameScreen.hasClass("displayBlock")) {
		pairsRemoved.length = 0;
		gameScreen.removeClass("displayBlock");
		gameScreen.addClass("displayBlock");
	}
	chooseLevelScreen.removeClass("visibilityH");
    instruction.addClass("visibilityH");
}

//~~~~~~~~~ Shuffle current SVG Array               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**         thanks to http://stackoverflow.com/users/310500/laurens-holst for a beautifull function
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//~~~~~~~~~ Compare cards to assertain pair or no   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function comPair(clickedCards) {
	var cardsBackArray = $(".back");
	var nCard1Length = clickedCards[0].length;
	var nCard2Length = clickedCards[1].length;
	var card1Str = clickedCards[0].slice(0,nCard1Length-1);
	var card2Str = clickedCards[1].slice(0,nCard1Length-1);
	var flippedCards = document.querySelectorAll(".flipper.flip");

	if(card1Str === card2Str) {
		setTimeout(function(){
			for(var k=0; k<flippedCards.length; k++) {
			var flippedCardContainer = flippedCards[k];
			playSounds("applause");
			flippedCardContainer.classList.add("visibilityH");
			};
		}, 800);
		pairsRemoved.push(card1Str);
	}
	else {
		setTimeout(function(){
			for(var k=0; k<flippedCards.length; k++) {
			var flippedCardContainer = flippedCards[k];
			flippedCardContainer.classList.remove("flip");
			}
		}, 800);
	}
	if ((cardsBackArray.length === 8 && pairsRemoved.length > 3) || (cardsBackArray.length === 12 && pairsRemoved.length > 5) || (cardsBackArray.length === 16 && pairsRemoved.length > 7)) {
		animationTime()
	}
	clickedCards.length = 0;
}

function animationTime() {
setTimeout(function(){
		animationScreen.removeClass("displayNone");
		animationScreen.addClass("displayBlock");
		animateTest.addClass("bounceIn");
		animateFireworks.addClass("bounceInUp");
	}, 800);
}

pairsRemoved.length = 0;
