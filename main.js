/*
Retrieves and compiles overwatch data for players
*/

var listOfPlayers = [];
var listofPlayerData =[];
var activeRank = 0;
var activeUser = "Varotyk";
var checkRank = false;
var currentQueue = [];

function updateData(){
	$("#users").empty();
	$("#prompter").empty();
	var counter = 1;
	listofPlayerData.map((x) =>{
		rankTier="bronze";
		rank = x.rank;
		if(rank>=4000){rankTier = "grandmaster";}
		else if(rank>=3500){rankTier = "master";}
		else if(rank>=3000){rankTier = "diamond";}
		else if(rank>=2500){rankTier = "platinum";}
		else if(rank>=2000){rankTier = "gold";}
		else if(rank>=1500){rankTier = "silver";}
		if(checkRank){
			if(currentQueue.reduce((acc,val)=>{
				return (acc || (val.username == x.username));
			}, false)){
				rankTier += " active";
			}
			else if(canQueueWith(rank)){
				rankTier += " cangroup";
			}
		}
		$("#users").append("<li class=\"" + rankTier + " playerblock\" id=\""
			 + x.username + "\" rank=\"" + x.rank + "\" onclick=\"clicked(" + x.rank + ", " + x.username + ")\">" +
		 	 "#" + counter + " <img src=\"" + x.img + "\"/>"+ x.username + " : "
			 + x.rank + "</li>");
		counter++;

	});
}

function clicked(rank, user){
	//console.log(activeUser, user.id, activeUser==user.id )
	if(currentQueue.reduce((acc,val)=>{
		return (acc || (val.username == user.id));
	}, false)){
		//TODO fix this part,
		//never mind it works?
		var searchTerm = user.id,
	    index = -1;
		for(var i = 0, len = currentQueue.length; i < len; i++) {
		    if (currentQueue[i].username === searchTerm) {
		        index = i;
		        break;
	    }
}
		currentQueue.splice(index, 1);
	}
	else if(currentQueue.length <6){
		if(currentQueue.length>0 && !canQueueWith(rank)){
			console.log("ineligible member");
		}
		else{
			currentQueue.push({username: user.id, rank: rank})
			//console.log(activeUser, activeRank, rank);
		}
	}
	else{
		console.log("Too many people");
	}
	checkRank = currentQueue.length != 0;
	updateData();
	updateBanner();
}

function addToData(data){
	//console.log(data);
	listofPlayerData.push({username: data.username, rank: data.competitive.rank, img: data.competitive.rank_img});
	listofPlayerData.sort(function(a,b){return b.rank - a.rank});
	updateData();
}

function addUser(){
	newName = document.getElementById('textbox').value;
	document.getElementById('textbox').value = '';
	//console.log(newName);
	newName = newName.replace('#', '-');
	//console.log(listOfPlayers.indexOf(newName == -1);
	if(listOfPlayers.indexOf(newName) == -1){
		$.get(
		"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newName,
		addToData,
		"json").done(listOfPlayers.push(newName));
	}
	else{
		console.log("User " + newPlayers[name] + " is already present in the list");
	}

	updateData();

}

function addMany(string){
	string = "" + string;
	//console.log(string);
	newPlayers = string.split('\n');
	newPlayers = cleanup(newPlayers);
	for (var name in newPlayers){
		//var string = "<p>" + newList[name] + "</p>\n";
		//$("#table").append(string);
		if(listOfPlayers.indexOf(newPlayers[name]) == -1){
			$.get(
			"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newPlayers[name],
	  	 	addToData,
			"json").done(listOfPlayers.push(newPlayers[name]));
			//console.log(sortedList)
		}
		else{
			console.log("User " + newPlayers[name] + " is already present in the list");
		}
	}
	//listOfPlayers = listOfPlayers.concat(newPlayers);
	//console.log(listOfPlayers);
}

function cleanup(list){
	list = list.map((x)=>{
		//console.log(x.replace('#','-'));
		return x.replace('#', '-');
		});
	list.splice(list.length-1,1);
	//console.log(list);
	return list;
}


function addKU(){
	//console.log("CLICKED");
	$.get(
	"https://masonwilde.github.io/OWTool/KUOWCommunity.txt",
	addMany,
	"text");
	//console.log("AFTER");
}

function canQueueWith(rank){
	var canQueue = false;
	canQueue = currentQueue.reduce((acc, val) =>{

		if((rank>=3500 || val.rank>=3500) && Math.abs(rank-val.rank)<=500) {
			return (acc && true);
		}
		else if(rank<=3499 && val.rank<=3499 && Math.abs(rank-val.rank)<=1000){
			return (acc && true);
		}
		else{
			return(acc && false);
		}
	}, true);
	return canQueue;
}

function updateBanner(){
	console.log("updatign banner");
	$('#groupsize').empty()
	$('#groupsize').append("" + currentQueue.length + "/6");

	var aveRank = 0;
	if(currentQueue.length>0){
		aveRank = currentQueue.reduce((acc,val)=>{
			return(acc + val.rank);
		}, 0);
		aveRank = Math.round(aveRank/currentQueue.length);
	}
	else{
		aveRank = 0;
	}

	$('#averank').empty();
	$('#averank').append( aveRank);


}
