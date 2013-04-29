#pragma strict
	
			
// CONSTANTS
//privte var mbLIGHTNINGABILITY = "lightningAbility";

//SMALL VERSION
//UPGRADES
var arrow : Texture;
var cannonBtnTexture : Texture;
var wallBtnTexture : Texture;
var abilityBtnTexture : Texture;

var regenOne : Texture;
var regenTwo : Texture;
var regenThree : Texture;

var healthOne : Texture;
var healthTwo : Texture;
var healthThree : Texture;

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
var trackOnGui : int = 0;	
var cannonOn = true;

var cannonUpgrade : int = 1;

var miniCannon : GameObject;
var tank: GameObject;
var miniCannon1 : Transform;
var miniCannon2 : Transform;
var miniCannon3 : Transform;
var miniCannon4 : Transform;
var tank1 : Transform;
var tank2 : Transform;
var tank3 : Transform;
var tank4 : Transform;

//---------------------------------------

var scorcherFireOn = false;
var normalCannonOn = true;
var lightningOn = false;
var mineOn = false;

//----------------------------------------

	var lightningUpgrade : int = 1;
	var mineUpgrade : int = 1;
	var scorcherUpgrade : int = 1;
	var miniCannonsUpgrade : int = 1;
	
	var wallLevel : int = 1;
	var energyUpgrade : int = 0;
	var regenUpgrade : int = 0;
	
	var ul : UpgradeVariables;
	
	var uh : wallState;
	
	var ts : MasterLog;
	
	var spawnSolarbeamScript : spawnSolarbeam;
	
	var cannonStateScript : cannonState;
	
//----------------------------------------

	var customSkin : GUISkin;
	var customSkinUpgrades : GUISkin;
	
	//var guiRectArray : Rect[];

function Start ()
	{
		//guiRectArray[0] = new ...;
		
		camera_GameMenu.enabled = false;
		//-------------------Cannon
		ul = GameObject.Find("Globals").GetComponent(UpgradeVariables);
		lightningUpgrade = ul.upgradeLightning;
		
		mineUpgrade = ul.upgradeMine;
		
		scorcherUpgrade = ul.upgradeScorcher;
		//-------------------Wall
		uh = GameObject.Find("Wall").GetComponent(wallState);
		wallLevel = uh.levelOfWall;		
		
		cannonStateScript = GameObject.Find("prefabCannon").GetComponent(cannonState);
		cannonUpgrade = cannonStateScript.levelOfCannon;
		
		spawnSolarbeamScript = GameObject.Find("Globals").GetComponent(spawnSolarbeam);
	}
	
function Update()
{
	//cannonOn = true;
//	
//	if((GUI.tooltip.Length > 0) && (GUI.tooltip.Substring(0,5) == "hover") && (trackOnGui % 2 == 1)) {
//			cannonOn = false;
//			print("Substring: " + GUI.tooltip.Substring(0,5));
//	}
//	else {
//		cannonOn = true;
//	}

}


function OnGUI() 
{	
	//trackOnGui++;
	
//		if(Event.current.type == EventType.Repaint))
//		{
//			for(var i = 0 ; i < guiRecdtArray.length ; i++)
//				cannonOn = !guiRectArray[i].Contains(Event.current.mousePosition);
//		}
//		else {
//			cannOn = true;
//		}
		
GUI.skin = customSkin;
GUI.color = Color.yellow;
GUI.skin.label.fontSize = ( (Screen.width * 20) / 1132 );

	GUI.backgroundColor = Color.blue;
	
	//Make Group
	GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
	
	//-------------Show Souls

//guiRectArray[0] = new Rect (Screen.width-(Screen.width/5),Screen.height/80, Screen.width/4, Screen.height/4)
	GUI.Label(new Rect (Screen.width-(Screen.width/4),Screen.height/80, Screen.width/4, Screen.height/4),("Souls Collected: " + totalSouls));
		
GUI.color = Color.white;
GUI.skin.label.fontSize = ( (Screen.width * 13) / 1132 );

	//Top-Right Menu
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
			//cannonOn = false;
			
			//print("hoverMenue");
		}
		
	//------------------SHOW BUTTONS
	if (showButtons){
	if (GUI.Button(Rect((Screen.width/20)*18.5,Screen.height/8,Screen.width/15,Screen.height/10),GUIContent(cannonBtnTexture, "hoverCannonButton")))
		{
		showWallButtons = false;
		showAbilityButtons = false;
		if (showCannonButtons){showCannonButtons = false;}
		else{showCannonButtons = true;}
		}
//		if (GUI.tooltip == "hoverCannonButton")
//			{
//				//cannonOn = false;
//			}



	if (GUI.Button(Rect((Screen.width/20)*18.5,(Screen.height/8)*3,Screen.width/15,Screen.height/10),GUIContent(wallBtnTexture, "hoverWallButton")))
		{
		showCannonButtons = false;
		showAbilityButtons = false;
		if (showWallButtons){showWallButtons = false;}
		else{showWallButtons = true;}
		}
		if (GUI.tooltip == "hoverWallButton")
			{
				//cannonOn = false;
			}
	if (GUI.Button(Rect((Screen.width/20)*18.5,(Screen.height/8)*5,Screen.width/15,Screen.height/10),GUIContent(abilityBtnTexture, "hoverAbilityButton")))
		{
		showCannonButtons = false;
		showWallButtons = false;
		if (showAbilityButtons){showAbilityButtons = false;}
		else{showAbilityButtons = true;}
		}
		if (GUI.tooltip == "hoverAbilityButton")
			{
				//cannonOn = false;
			}
	}
	//------------------ CANNON BUTTONS
	if (showCannonButtons){
	
	if (cannonUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/7.5,Screen.width/20,Screen.height/12),GUIContent(cannonBtnTexture, "hoverCannonUpgrades")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					cannonStateScript.UpgradeCannon();
					cannonUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverCannonUpgrades")
			{
				GUI.Label(new Rect((Screen.width/10)*7,(Screen.height/10)*1.5,(Screen.width/10)*2,(Screen.height/10)*2), "CANNON UPGRADES");
				//cannonOn = false;
			}
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
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/2.6,Screen.width/20,Screen.height/12),GUIContent(healthOne, "hoverHealthUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					uh.UpgradeWall();
					wallLevel++;					
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.2,(Screen.height/8)*3.25,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health");
				//cannonOn = false;
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
		}*/
	if (regenUpgrade == 0){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/12),GUIContent(regenOne, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites");
				//cannonOn = false;
			}
		}
		
	}
	//------------------ WALL BUTTONS LEVEL 2--------------------
	if (showWallButtons){
	
	if (wallLevel == 2){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/2.6,Screen.width/20,Screen.height/12),GUIContent(healthTwo, "hoverHealthUpgrade2")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					uh.UpgradeWall();
					wallLevel++;
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade2")
			{
				GUI.Label(new Rect((Screen.width/20)*14.2,(Screen.height/8)*3.25,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health II");
				//cannonOn = false;
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
		}*/
	if (regenUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/12),GUIContent(regenTwo, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites II");
				//cannonOn = false;
			}
		}
		
	}
	//------------------ WALL BUTTONS LEVEL 3--------------------
	if (showWallButtons){
	
	if (wallLevel == 3){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/2.6,Screen.width/20,Screen.height/12),GUIContent(healthThree, "hoverHealthUpgrade3")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					uh.UpgradeWall();
					wallLevel++;
				}
		}
		if (GUI.tooltip == "hoverHealthUpgrade3")
			{
				GUI.Label(new Rect((Screen.width/20)*14.2,(Screen.height/8)*3.25,(Screen.width/10)*2,(Screen.height/10)*2), "Increase Wall Health III");
				//cannonOn = false;
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
		}*/
	if (regenUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17.5,(Screen.height/8)*2.5,Screen.width/20,Screen.height/12),GUIContent(regenThree, "hoverRegenUpgrade")))
		{
				if (regenUpgrade < 3){regenUpgrade++;}
		}
		if (GUI.tooltip == "hoverRegenUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*15,(Screen.height/8)*2.5,(Screen.width/10)*2,(Screen.height/10)*2), "Regenerative Nanites III");
				//cannonOn = false;
			}
		}
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 1--------------------------

	if (showAbilityButtons){
	if (lightningUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/2.0,Screen.width/20,Screen.height/12),GUIContent(lightningOne, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.35,(Screen.height/8)*4.25,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack");
				//cannonOn = false;
			}
		}
	if (mineUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/1.6,Screen.width/20,Screen.height/12),GUIContent(mineOne, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*5.25,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability");
				//cannonOn = false;
			}
		}
	if (miniCannonsUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/1.35,Screen.width/20,Screen.height/12),GUIContent(lightningOne, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					MiniCannons();
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*6.0,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses");
				//cannonOn = false;
			}
		}
	if (scorcherUpgrade == 1){
	if (GUI.Button(Rect((Screen.width/20)*18.5,Screen.height/1.25,Screen.width/20,Screen.height/12),GUIContent(scorcherOne, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*16.25,(Screen.height/10)*8.25,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack");
				//cannonOn = false;
			}
		}
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 2--------------------------
	if (showAbilityButtons){
	
	if (lightningUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/2.0,Screen.width/20,Screen.height/12),GUIContent(lightningTwo, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.35,(Screen.height/8)*4.25,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack II");
				//cannonOn = false;
			}
		}
	if (mineUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/1.6,Screen.width/20,Screen.height/12),GUIContent(mineTwo, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*5.25,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability II");
				//cannonOn = false;
			}
		}
	if (miniCannonsUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/1.35,Screen.width/20,Screen.height/12),GUIContent(lightningTwo, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					MiniCannons();
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*6.0,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses II");
				//cannonOn = false;
			}
		}
	if (scorcherUpgrade == 2){
	if (GUI.Button(Rect((Screen.width/20)*18.5,Screen.height/1.25,Screen.width/20,Screen.height/12),GUIContent(scorcherTwo, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*16.25,(Screen.height/10)*8.25,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack II");
				//cannonOn = false;
			}
		}
		
	}
	//------------------SHOW ABILITY BUTTONS LEVEL 3--------------------------
	if (showAbilityButtons){
	
	if (lightningUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/2.0,Screen.width/20,Screen.height/12),GUIContent(lightningThree, "hoverBoltUpgrade")))
		{
			if (totalSouls >= soulCost)
			{
				MinusSouls(soulCost);
				lightningUpgrade++;
			}
		}
		if (GUI.tooltip == "hoverBoltUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*4.25,(Screen.width/10)*2,(Screen.height/10)*2), "Lightning Bolt Attack III");
				//cannonOn = false;
			}
		}
	if (mineUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*16.5,Screen.height/1.6,Screen.width/20,Screen.height/12),GUIContent(mineThree, "hoverMineUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					mineUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMineUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.5,(Screen.height/8)*5.25,(Screen.width/10)*2,(Screen.height/10)*2), "Land Mine Ability III");
				//cannonOn = false;
			}
		}
	if (miniCannonsUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/1.35,Screen.width/20,Screen.height/12),GUIContent(lightningThree, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					MiniCannons();
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.9,(Screen.height/8)*6.0,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses III");
				//cannonOn = false;
			}
		}
	if (scorcherUpgrade == 3){
	if (GUI.Button(Rect((Screen.width/20)*18.5,Screen.height/1.25,Screen.width/20,Screen.height/12),GUIContent(scorcherThree, "hoverSunScorcherUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					scorcherUpgrade++;
				}
		}
		if (GUI.tooltip == "hoverSunScorcherUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*16.25,(Screen.height/10)*8.25,(Screen.width/10)*2,(Screen.height/10)*2), "Sun-Scorcher Attack III");
				//cannonOn = false;
			}
		}
		
	}
	//-----------------------------------------miniCannonLevel4--------------------------
	if (miniCannonsUpgrade == 4){
	if (GUI.Button(Rect((Screen.width/20)*17,Screen.height/1.35,Screen.width/20,Screen.height/12),GUIContent(lightningThree, "hoverMiniCannonUpgrade")))
		{
				if (totalSouls >= soulCost)
				{
					MinusSouls(soulCost);
					MiniCannons();
					miniCannonsUpgrade++;
				}	
		}
		if (GUI.tooltip == "hoverMiniCannonUpgrade")
			{
				GUI.Label(new Rect((Screen.width/20)*14.75,(Screen.height/8)*6.0,(Screen.width/10)*2,(Screen.height/10)*2), "Add Auto Defenses IV");
				//cannonOn = false;
			}
		}
	
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL ONE//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),lightningOne))
		{
			lightningOn = true;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = false;
		}
	}
	if (mineUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),mineOne))
		{
			lightningOn = false;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = true;
		}
	}
	if (scorcherUpgrade == 2)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),scorcherOne))
		{
			lightningOn = false;
			scorcherFireOn = true;
			normalCannonOn = false;
			mineOn = false;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL TWO//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),lightningTwo))
		{
			lightningOn = true;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = false;
		}
	}
	if (mineUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),mineTwo))
		{
			lightningOn = false;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = true;
		}
	}
	if (scorcherUpgrade == 3)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),scorcherTwo))
		{
			lightningOn = false;
			scorcherFireOn = true;
			normalCannonOn = false;
			mineOn = false;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////USE ABILITY BUTTONS LEVEL THREE//////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	

	
	if (lightningUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*3.25,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),lightningThree))
		{
			lightningOn = true;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = false;
		}
	}
	if (mineUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/2)-40,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),mineThree))
		{
			lightningOn = false;
			scorcherFireOn = false;
			normalCannonOn = false;
			mineOn = true;
		}
	}
	if (scorcherUpgrade == 4)
	{	
		GUI.skin = customSkin;
		if (GUI.Button(Rect((Screen.width/10)*6,(Screen.height/10)*8.5,Screen.height/6,Screen.height/6),scorcherThree))
		{
			lightningOn = false;
			scorcherFireOn = true;
			normalCannonOn = false;
			mineOn = false;
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
			//cannonOn = false;
		}
		
	//print("ToolTip is: " + GUI.tooltip + " with length: " + GUI.tooltip.Length);
	//print("Substring: " + GUI.tooltip.Substring(0,5));
	
	//	print("Content.tip is: " + GUI.tooltip);
	
//	if ((GUI.tooltip != "hoverMenue") && (GUI.tooltip != "hoverCannonButton") & (GUI.tooltip != "hoverWallButton") & (GUI.tooltip != "hoverAbilityButton") 
//	& (GUI.tooltip != "hoverCannonUpgrades") & (GUI.tooltip != "hoverHealthUpgrade") & (GUI.tooltip != "hoverHealthUpgrade2") & (GUI.tooltip != "hoverHealthUpgrade3") 
//	& (GUI.tooltip != "hoverRegenUpgrade") & (GUI.tooltip != "hoverRegenUpgrade2") & (GUI.tooltip != "hoverRegenUpgrade3") & (GUI.tooltip != "hoverHealthUpgrade2") 
//	& (GUI.tooltip != "hoverBoltUpgrade") & (GUI.tooltip != "hoverBoltUpgrad2") & (GUI.tooltip != "hoverBoltUpgrad3") & (GUI.tooltip != "hoverMineUpgrade") 
//	& (GUI.tooltip != "hoverMineUpgrade2") & (GUI.tooltip != "hoverMineUpgrade3") & (GUI.tooltip != "hoverSunScorcherUpgrade") & (GUI.tooltip != "hoverSunScorcherUpgrade2") 
//	& (GUI.tooltip != "hoverSunScorcherUpgrade3") & (GUI.tooltip != "hoverMiniCannonUpgrade") & (GUI.tooltip !== "hoverMiniCannonUpgrade2") & (GUI.tooltip != "hoverMiniCannonUpgrade3") 
//	& (GUI.tooltip != "hoverGameMenue"))
//		{
//			cannonOn = true;
//		}


	
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
	//print("B: totalSouls: " + totalSouls + " - " + "soulCost: " + soulCost2);

	totalSouls = (totalSouls - soulCost2);

	//print("A: totalSouls: " + totalSouls + " - " + "soulCost: " + soulCost2);
}

function AddSouls(soulsWorth : int)
{
	
	totalSouls = (totalSouls + soulsWorth);
	
	
}

function MiniCannons()
{
	if (miniCannonsUpgrade == 1)
	{
	Instantiate(miniCannon,miniCannon3.position, miniCannon3.rotation);
	Instantiate(miniCannon,miniCannon4.position, miniCannon4.rotation);
	}
	if (miniCannonsUpgrade == 2)
	{
	Instantiate(miniCannon,miniCannon1.position, miniCannon1.rotation);
	Instantiate(miniCannon,miniCannon2.position, miniCannon2.rotation);
	}
	if (miniCannonsUpgrade == 3)
	{
	Instantiate(tank,tank1.position, tank1.rotation);
	Instantiate(tank,tank2.position, tank2.rotation);
	}
	if (miniCannonsUpgrade == 4)
	{
	Instantiate(tank,tank3.position, tank3.rotation);
	Instantiate(tank,tank4.position, tank4.rotation);
	}
		
}
	//function totalSoulsUpdate(souls : int)
	//{
	
	//	totalSouls = souls;
		

	//}