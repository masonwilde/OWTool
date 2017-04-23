/*
Retrieves and compiles overwatch data for players
*/

var listOfPlayers = [];
var listofPlayerData =[];
var activeRank = 0;
var activeUser = "Varotyk";
var checkRank = false;


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
			if(activeUser==x.username){
				rankTier += " active";
			}
			else if((activeRank>=3500 || x.rank>=3500) && Math.abs(activeRank-x.rank)<=500) {
				rankTier += " cangroup";
			}
			else if(activeRank<=3499 && x.rank<=3499 && Math.abs(activeRank-x.rank)<=1000){
				rankTier += " cangroup"
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
	if(checkRank==true && (activeUser == user.id)){
		checkRank = !checkRank;
	}
	else{
		checkRank = true;
		activeRank=rank;
		activeUser = user.id;
		//console.log(activeUser, activeRank, rank);
	}
	updateData();
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
	"http://masonwilde.github.io/OWTool/KUOWCommunity.txt",
	addMany,
	"text");
	//console.log("AFTER");
}
