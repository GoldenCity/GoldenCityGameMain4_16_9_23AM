#pragma strict

//UPGRADES
var arrow : Texture;
var cannonBtnTexture : Texture;
var wallBtnTexture : Texture;
var abilityBtnTexture : Texture;

var regenOne : Texture;
var regenTwo : Texture;
var regenThree : Texture;


var lightningOne : Texture;
var lightningTwo : Texture;
var lightningThree : Texture;

var cannonsOne : Texture;
var cannonsTwo : Texture;
var cannonsThree : Texture;

var mineOne : Texture;
var mineTwo : Texture;
var mineThree : Texture;

var scorcherOne: Texture;
var scorcherTwo: Texture;
var scorcherThree: Texture;

var showButtons : boolean = false;

var showCannonButtons : boolean = false;
var showWallButtons : boolean = false;
var showAbilityButtons : boolean = false;

var camera_GameMenu : Camera;
var camera_Main : Camera;

var soulCost : int = 100;
var totalSouls : int = 0;

//----------------------------------------

	var lightningUpgrade : int = 1;
	var mineUpgrade : int = 1;
	var scorcherUpgrade : int = 1;
	var miniCannonsUpgrade : int = 1;
	
	var wallLevel : int = 1;
	//var energyUpgrade : int = 0;
	//var regenUpgrade : int = 0;
	
	var ul : UpgradeVariables;
	var um : UpgradeVariables;
	var us : UpgradeVariables;
	
	var uh : wallState;
	var ue : UpgradeVariables;
	var ur : UpgradeVariables;
	
	var ts : MasterLog;
	var sc : MasterLog;
	
//----------------------------------------

	var customSkin : GUISkin;
	var customSkinUpgrades : GUISkin;
	

function Start ()
	{
		camera_GameMenu.enabled = false;
		//-------------------Cannon
		ul = GameObject.Find("Globals").GetComponent(UpgradeVariables);
		lightningUpgrade = ul.upgradeLightning;
		
		mineUpgrade = ul.upgradeMine;
		
		scorcherUpgrade = ul.upgradeScorcher;
		//-------------------Wall
		uh = GameObject.Find("prefabWall").GetComponent(wallState);
		wallLevel = uh.levelOfWall;
		
	}
	
function OnGUI() 
{	GUI.skin = customSkinUpgrades;
	GUI.backgroundColor = Color.blue;
	
	//Make Group
	GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
	
	//-------------Show Souls

	GUI.Label(new Rect (Screen.width-(Screen.width/5),Screen.height/80, Screen.width/4, Screen.height/4),("Souls Collected: " + totalSouls));
		

	
	if (GUI.Button(Rect((Screen.width/20)*19,0,Screen.width/18,Screen.height/16),GUIContent(arrow, "hoverMenue")))
		{
			showCannonButtons = false;
			showWallButtons = false;
			showAbilityButtons = false;
		
			if (showButtons){showButtons = false;}
			else {showButtons = true;}
		}
	
	if (GUI.tooltip == "hoverMenue")
		{
			GUI.Label(new Rect((Screen.width/20)*19,Screen.height/20,Screen.width/20,Screen.height/20), "MENU");
		}
		
	//------------------SHOW BUTTONS
	if (showButtons){
	if (GUI.Button(Rect((Screen.width/20)*19,Screen.height/8,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverCannonUpgrades")))
		{
		showWallButtons = false;
		showAbilityButtons = false;
		if (showCannonButtons){showCannonButtons = false;}
		else{showCannonButtons = true;}
		}
	if (GUI.Button(Rect((Screen.width/20)*19,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(wallBtnTexture, "hoverWallUpgrades")))
		{
		showCannonButtons = false;
		showAbilityButtons = false;
		if (showWallButtons){showWallButtons = false;}
		else{showWallButtons = true;}
		}
	if (GUI.Button(Rect((Screen.width/20)*19,(Screen.height/8)*3,Screen.width/20,Screen.height/20),GUIContent(abilityBtnTexture, "hoverAbilityUpgrades")))
		{
		showCannonButtons = false;
		showWallButtons = false;
		if (showAbilityButtons){showAbilityButtons = false;}
		else{showAbilityButtons = true;}
		}
	}
	//------------------ CANNON BUTTONS
	if (showCannonButtons){
	if (GUI.Button(Rect((Screen.width/20)*17.5,Screen.height/8,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverCannonUpgrades")))
		{
				//ADD BASIC CANNON UPGRADE CODE HERE
		}
		if (GUI.tooltip == "hoverCannonUpgrades")
			{
				GUI.Label(new Rect((Screen.width/10)*3,(Screen.height/10)*7,(Screen.width/10)*2,(Screen.height/10)*2), "CANNON UPGRADES");
			}
	/*if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)/2,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverCannonUpgrades")))
		{
				//ADD BASIC CANNON UPGRADE CODE HERE
		}
		if (GUI.tooltip == "hoverCannonUpgrades")
			{
				GUI.Label(new Rect((Screen.width/10)*3,(Screen.height/10)*7,(Screen.width/10)*2,(Screen.height/10)*2), "CANNON UPGRADES");
			}*/
	/*if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*1.5,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverCannonUpgrades")))
		{
				//ADD BASIC CANNON UPGRADE CODE HERE
		}
		if (GUI.tooltip == "hoverCannonUpgrades")
			{
				GUI.Label(new Rect((Screen.width/10)*3,(Screen.height/10)*7,(Screen.width/10)*2,(Screen.height/10)*2), "CANNON UPGRADES");
			}*/
	
	}
	//------------------ WALL BUTTONS LEVEL 1--------------------
	if (showWallButtons){
	
	if (wallLevel == 1){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(regenOne, "hoverHealthUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					print("*********1");
					wallLevel++;
					print("*********2");
					uh.UpgradeWall();
					print("*********3");
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*1.5,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health");
			}
		}
	/*if (energyUpgrade == 0){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverEnergyUpgrade")))
		{
				//ADD ENERGY UPGRADE CODE HERE(DECREASES ABILITY COOLDOWNS)
		}
		if (GUI.tooltip == "hoverEnergyUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*13,(Screen.height/8)*2,(Screen.width/10)*2,(Screen.height/10)*2), "Decrease Ability Cooldowns");
			}
		}
	if (regenUpgrade == 0){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(regenOne, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites");
			}
		}*/
		
	}
	//------------------ WALL BUTTONS LEVEL 2--------------------
	if (showWallButtons){
	
	if (wallLevel == 2){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(regenOne, "hoverHealthUpgrade2")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					wallLevel++;
					uh.UpgradeWall();
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade2")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*1.5,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health II");
			}
		}
	/*if (energyUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverEnergyUpgrade")))
		{
				//ADD ENERGY UPGRADE CODE HERE(DECREASES ABILITY COOLDOWNS)
		}
		if (GUI.tooltip == "hoverEnergyUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*13,(Screen.height/8)*2,(Screen.width/10)*2,(Screen.height/10)*2), "Decrease Ability Cooldowns");
			}
		}
	if (regenUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(regenTwo, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites");
			}
		}
		*/
	}
	//------------------ WALL BUTTONS LEVEL 3--------------------
	if (showWallButtons){
	
	if (wallLevel == 3){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(regenOne, "hoverHealthUpgrade3")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					wallLevel++;
					uh.UpgradeWall();
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade3")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*1.5,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health III");
			}
		}
	/*if (energyUpgrade > 1){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*2,Screen.width/20,Screen.height/20),GUIContent(cannonBtnTexture, "hoverEnergyUpgrade")))
		{
				//ADD ENERGY UPGRADE CODE HERE(DECREASES ABILITY COOLDOWNS)
		}
		if (GUI.tooltip == "hoverEnergyUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*13,(Screen.height/8)*2,(Screen.width/10)*2,(Screen.height/10)*2), "Decrease Ability Cooldowns");
			}
		}
	if (regenUpgrade > 1){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(regenThree, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites");
			}
		}*/
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 1--------------------------

	if (showAbilityButtons){
	if (lightningUpgrade == 1){print ("==1");
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(lightningOne, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack");
			}
		}
	if (mineUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*3,Screen.width/20,Screen.height/20),GUIContent(mineOne, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.25,(Screen.height/8)*3,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability");
			}
		}
	if (miniCannonsUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*3.5,Screen.width/20,Screen.height/20),GUIContent(lightningOne, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*3.5,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses");
			}
		}
	if (scorcherUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*19,(Screen.height/8)*4,Screen.width/20,Screen.height/20),GUIContent(scorcherOne, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15.75,(Screen.height/8)*4,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack");
			}
		}
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 2--------------------------
	if (showAbilityButtons){
	
	if (lightningUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(lightningTwo, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack II");
			}
		}
	if (mineUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*3,Screen.width/20,Screen.height/20),GUIContent(mineTwo, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.25,(Screen.height/8)*3,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability II");
			}
		}
	if (miniCannonsUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*3.5,Screen.width/20,Screen.height/20),GUIContent(lightningTwo, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*3.5,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses II");
			}
		}
	if (scorcherUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*19,(Screen.height/8)*4,Screen.width/20,Screen.height/20),GUIContent(scorcherTwo, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15.75,(Screen.height/8)*4,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack II");
			}
		}
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 3--------------------------
	if (showAbilityButtons){
	
	if (lightningUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*2.5,Screen.width/20,Screen.height/20),GUIContent(lightningThree, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack III");
			}
		}
	if (mineUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*17,(Screen.height/8)*3,Screen.width/20,Screen.height/20),GUIContent(mineThree, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.25,(Screen.height/8)*3,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability III");
			}
		}
	if (miniCannonsUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*17.75,(Screen.height/8)*3.5,Screen.width/20,Screen.height/20),GUIContent(lightningThree, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*3.5,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses III");
			}
		}
	if (scorcherUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*19,(Screen.height/8)*4,Screen.width/20,Screen.height/20),GUIContent(scorcherThree, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15.75,(Screen.height/8)*4,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack III");
			}
		}
		
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL ONE//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*9,80,60),lightningOne))
		{
			//Use lightning shot - ADD LIGHTNING ATTACK CODE HERE
		}
	}
	if (mineUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*9,80,60),mineOne))
		{
			//Use Mine - ADD MINE ATTACK CODE HERE
		}
	}
	if (scorcherUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*9,80,60),scorcherOne))
		{
			//Use Scorcher - ADD SCORCHER ATTACK CODE HERE
		}
	}
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL TWO//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*9,80,60),lightningTwo))
		{
			//Use lightning shot - ADD LIGHTNING ATTACK CODE HERE
		}
	}
	if (mineUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*9,80,60),mineTwo))
		{
			//Use Mine - ADD MINE ATTACK CODE HERE
		}
	}
	if (scorcherUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*9,80,60),scorcherTwo))
		{
			//Use Scorcher - ADD SCORCHER ATTACK CODE HERE
		}
	}
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL THREE//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*9,80,60),lightningThree))
		{
			//Use lightning shot - ADD LIGHTNING ATTACK CODE HERE
		}
	}
	if (mineUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*9,80,60),mineThree))
		{
			//Use Mine - ADD MINE ATTACK CODE HERE
		}
	}
	if (scorcherUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*9,80,60),scorcherThree))
		{
			//Use Scorcher - ADD SCORCHER ATTACK CODE HERE
		}
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////MAIN MENU////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	if (GUI.Button(Rect(0,0,Screen.width/20,Screen.height/20),GUIContent(arrow,"hoverGameMenue")))
		{
    		camera_Main.enabled = false;
    		camera_GameMenu.enabled = true;
		}
	if (GUI.tooltip == "hoverGameMenue")
		{
			GUI.Label(new Rect(0,Screen.height/20,Screen.width/20,Screen.height/20), "GAME MENU");
		}
	
	

	
	
	GUI.EndGroup();
}
/*
function UpgradeWall (wLevel : int)
{
	if(wLevel == 1)
	{
		_health = _health + 10;
		wallLevel++;
	}
	else if(wLevel == 2)
	{
		_health = _health + 40;
		wallLevel++;
	}
	else if(wLevel == 3)
	{
		_health = _health + 100;
		wallLevel++;
	}
	
	return wallLevel;
}*/


function MinusSouls(soulCost2 : int)
{
	print("B: totalSouls: " + totalSouls + " - " + "soulCost: " + soulCost2);

	totalSouls = (totalSouls - soulCost2);

	print("A: totalSouls: " + totalSouls + " - " + "soulCost: " + soulCost2);
}

function AddSouls(soulsWorth : int)
{
	
	totalSouls = (totalSouls + soulsWorth);
	
	
}
	//function totalSoulsUpdate(souls : int)
	//{
	
	//	totalSouls = souls;
		

	//}