// Peter Valleskey
// Visual Frameworks 11/2011
// Project 4

//Waits for the DOM
window.addEventListener("DOMContentLoaded", function() {
    
    //getElementByID function
    var $ = function (x) {
        var theElement = document.getElementById(x);
        return theElement;
    };
        
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
    };
    
    //radio button value function
    var getSelectedRadio = function () {
        var radios = document.forms[0].sex;
        for (var i = 0;i < radios.length;i++) {
            if(radios[i].checked) {
                sexValue = radios[i].value;
            }
        }
    };
    //check box value function
    var getCheckBoxValue = function () {
        if($('guild').checked) {
            guildValue = $('guild').value;
        } else {
            guildValue = "Not in the guild";
        }
    };
    //clears local storage
    var clearLocal = function() {
        if(localStorage.length === 0) {
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("Data cleared.");
            window.location.reload();
            return false;
        }
    };
    //switch between form and storage views
    var toggleControls = function(n) {
        switch(n) {
            case "on":
                $('advForm').style.display     = "none";
                $('clear').style.display       = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display      = "inline";
                break;
            case "off":
                $('advForm').style.display     = "block";
                $('clear').style.display       = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display      = "none";
                $('items').style.display       = "none";
                break;
            case "edit":
                $('advForm').style.display     = "block";
                $('clear').style.display       = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display      = "none";
                $('items').style.display       = "none";
                break;
            default:
                return false;
        }
    };
    //store form with a key
    var storeData = function(key) {
        //makes (or uses an existing) key
        if (!key) {
            var id          = Math.floor(Math.random()*10000000001);
        } else {
            id = key;
        }
        getSelectedRadio();
        getCheckBoxValue();
        var item            = {};
            item.name       = ["Name: ",                $('name').value];
            item.age        = ["Age: ",                 $('age').value];
            item.sex        = ["Sex: ",                 sexValue];
            item.group      = ["Class: ",               $('groups').value];
            item.date       = ["Date joined: ",         $('date').value];
            item.guild      = ["Guild member status: ", guildValue];
            item.comments   = ["Comments: ",            $('comments').value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Adventurer saved sucessfully!");
    };
    //retrieve key than bring back form info into a list
    var getData = function () {
        toggleControls("on");
        if(localStorage.length === 0) {
            autoFillData();
			alert("There is no data in local storage, default data was added.");
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
			makeli.setAttribute("id", "list");
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //parses string into an object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.group[1], makeSubList);
			for(var n in obj){
                var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }//making edit and delete links for each item in local storage
    };
	
	//category image function
	var getImage = function(catName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".gif");
		imageLi.appendChild(newImg);
	}
	
	//JSON autofill data
	var autoFillData = function() {
		var json = {
			"contact1": {
				"name"    : ["Name: ", "Chuck Norris"],
				"age"     : ["Age: ", "71"],
				"sex"     : ["Sex: ", "Male"],
				"group"   : ["Class: ", "Hunter"],
				"date"    : ["Date joined: ", "11/11/2011"],
				"guild"   : ["Guild member status: ", "Not in the guild."],
				"comments": ["Comments: ", "Chuck Norris doesn't read books. He stares them down until he gets the information he wants."]
			},
			"contact2": {
				"name"    : ["Name: ", "Conan The Barbarian"],
				"age"     : ["Age: ", "31"],
				"sex"     : ["Sex: ", "Male"],
				"group"   : ["Class: ", "Warrior"],
				"date"    : ["Date joined: ", "11/11/2011"],
				"guild"   : ["Guild member status: ", "Not in the guild."],
				"comments": ["Comments: ", "What's that, do I hear the lamentations of women?"]
			}
		};
		for(var n in json) {
			var id = Math.floor(Math.random()*100000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
    //making item links that will be displayed in stored data
    var makeItemLinks = function(key, linksLi) {
        
		//edit
		var editLink = document.createElement('a');
        editLink.setAttribute("id", "editLink");
		editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Adventurer";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //delete
        var deleteLink = document.createElement('a');
		deleteLink.setAttribute("id", "deleteLink");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Adventurer";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    };
    
    var editItem = function() {
        //pull the stringifyed object out of storage and repopulate the form with it
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        toggleControls("edit");
        
        $('groups').value =    item.group[1];
        $('name').value =      item.name[1];
        $('age').value =       item.age[1];
        var radios = document.forms[0].sex;
        for(var i = 0; i < radios.length; i++) {
            if(radios[i].value == "Male" && item.sex[1] == "Male") {
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Female" && item.sex[1] == "Female") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        if(item.guild[1] == "true") {
            $('guild').setAttribute("checked", "checked");
        }
        $('groups').value =   item.group[1];
        $('date').value =     item.date[1];
        $('comments').value = item.comments[1];
        
        //remove listener to stop saving a new contact upon edit submition
        save.removeEventListener("click", storeData);
        $('submit').value = "Edit Contact";
        var editSubmit = $('submit');
        //the local storage key is saved as a property to be used to target the correct object in localStorage
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    };
    
    var deleteItem = function() {
        var ask = confirm("Are you sure you want to delete this adventurer?");
        if(ask) {
            localStorage.removeItem(this.key);
            alert("Adventurer was deleted!");
            window.location.reload();
        } else {
            alert("Adventurer was not deleted.");
        }
    };
    
    var validate = function(e) {
        var getGroup = $('groups');
        var getName = $('name');
        getSelectedRadio();
        var getTheDate = $('date');
        var getGender = $('gender');
    
        //reset
        errMsg.innerHTML = "";
        getName.style.border = "none";
        getGroup.style.border = "none";
        getGender.style.border = "none";
        getTheDate.style.border = "none";
		//array created (or cleared) that will hold all error messages
        var messageAry = [];
        //name validation
        if(getName.value === "") {
            var nameError = "Please enter a name";
            getName.style.border = "1px solid red";
            messageAry.push(nameError);
        }
        //class validation
        if(getGroup.value == "--Choose A Class--") {
            var groupError = "Please choose a class";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        }
        //sex validation
        if (sexValue == null) {
            var sexError = "Please choose a sex";
            getGender.style.border = "1px solid red";
            messageAry.push(sexError);
        }
        //date validation
        var yyyymmdd = /^(19|20)\d\d[\- \/.](0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])$/;
        var mmddyyyy = /^(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)\d\d$/;
        if(yyyymmdd.test(getTheDate.value) || mmddyyyy.test(getTheDate.value)) {
        } else {
            var dateError = "Please enter a valid date";
            getTheDate.style.border = "1px solid red";
            messageAry.push(dateError);
            }
        
        //display errors
        if(messageAry.length >= 1) {
            for(var i = 0, j = messageAry.length; i < j; i++) {
                var txt = document.createElement('div');
                txt.innerHTML = messageAry[i];
                
                errMsg.appendChild(txt);
            }
            e.preventDefault();
        return false;
        } else {
            //validated --> submits
            storeData(this.key);
        }
    };
    
    //drop down select
    var chooseClass = ["--Choose A Class--", "Warrior", "Rogue", "Mage", "Hunter", "Priest"],
        sexValue;
        guildValue = "Not in the guild";
        errMsg = $('errors');
    makeCats();
    
    
    var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", validate);
    
    
});





