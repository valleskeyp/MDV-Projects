// Peter Valleskey
// Visual Frameworks 10/2011
// Project 2

//Waits for the DOM
window.addEventListener("DOMContentLoaded", function() {
	
	//getElementByID function
	var $ = function (x) {
		var theElement = document.getElementById(x);
		return theElement;
		}
		
	//make class categories
	var makeCats = function() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i = 0, j=chooseClass.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = chooseClass[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//radio button value function
	var getSelectedRadio = function () {
		var radios = document.forms[0].sex;
		for (var i = 0;i < radios.length;i++) {
			if(radios[i].checked) {
				sexValue = radios[i].value;
			}
		}
	}
	//check box value function
	var getCheckBoxValue = function () {
		if($('guild').checked) {
			guildValue = $('guild').value;
		} else {
			guildValue = "Not in the guild"
		}
	}
	//clears local storage
	var clearLocal = function() {
		if(localStorage.length === 0) {
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("Data cleared.")
			window.location.reload();
			return false;
		}
	}
	//switch between form and storage views
	var toggleControls = function(n) {
		switch(n) {
			case "on":
				$('advForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('advForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	//store form with a key
	var storeData = function() {
		var id              = Math.floor(Math.random()*10000000001);
		getSelectedRadio();
		getCheckBoxValue();
		var item            = {};
			item.name		= ["Name: ", $('name').value];
			item.age		= ["Age: ", $('age').value];
			item.sex		= ["Sex: ", sexValue];
			item.group		= ["Class: ", $('groups').value];
			item.date		= ["Date joined: ", $('date').value];
			item.guild		= ["Guild member status: ", guildValue];
			item.comments	= ["Comments: ", $('comments').value];
		localStorage.setItem(id, JSON.stringify(item));
	}
	//retrieve key than bring back form info into a list
	var getData = function () {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in local storage.");
		}
		//local storage to browser function
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for(var i = 0, len=localStorage.length; i < len; i++) {
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i)
			var value = localStorage.getItem(key);
			//parses string into an object
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	//drop down select
	var chooseClass = ["--Choose A Class--", "Warrior", "Rogue", "Mage", "Hunter", "Priest"],
		sexValue;
		guildValue = "Not in the guild";
	makeCats();
	
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	
	
});