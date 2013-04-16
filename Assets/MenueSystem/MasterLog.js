#pragma strict

//initial values for base level objects
private var cannonLevel : int = 1;
private var playerLevel : int = 1;
private var wallLevel : int = 1;
private var waveLevel: int = 1;
//var souls: int = 0;

//instantiation of non-valued items to be given levels later

//private var lightningLevel : int;
//private var mineLevel : int;
//private var judgementLaserLevel : int;

//var soulsChosen : int;
//var cs : scriptActorEnemy;

var ts : Script_Hud;

function Start()
{

	ts = GameObject.Find("Camera_Main").GetComponent(Script_Hud);


//cs = GameObject.Find("Globals").GetComponent(scriptActorEnemy);
//soulsChosen = cs.soulsWorth;

}


function Update () {
//method will call different methods when needed to udate 
//gamesave data including levels for cannon, player, wall
//what enemy wave, how many souls are owned by player and 
//will remove souls when purchasing items (linked to gui)

}

function upgradeCannon(){//adds to cannon level and changes parameters per level (using cannon object, void method).

}

function upgradePlayer(){//records player level (if needed, void method)

}

function Restart()
{
	cannonLevel = 1;
	playerLevel = 1;
	wallLevel = 1;
	waveLevel = 1;
	
}

function upgradeWave(){//records intensity of enemy waves (void method)

}







/*
function lightning(){
	 if (lightningLevel == null){
	 lightningLevel = 1; 
	 }
	 else if (lightningLevel >= 1){
	 lightningLevel++;
	 }
	 var lLevel = lightningLevel;
	 return lLevel;
}

function mine(){
	if (mineLevel == null){
	mineLevel = 1;
	}
	else if(mineLevel >= 1){
	mineLevel++;
	}
	var mLevel = mineLevel;
	return mLevel;
}

function judgement(){
	if(judgementLaserLevel == null){
	judgementLaserLevel = 1;
	}
	else if(judgementLaserLevel >= 1){
	judgementLaserLever++;
	}
	var jLevel = judgementLaserLevel;
	return jLevel;
}*/