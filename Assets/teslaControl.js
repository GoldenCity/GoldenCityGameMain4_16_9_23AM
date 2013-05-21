#pragma strict

var level : int = 1;

var powerLevel : float = 0;
var powerLevelMax : float = 100;
var powerLevelMax2 : float = 250;
var powerLevelMax3 : float = 800;

var range : float = 50;
var rangeLvl2 : float = 75;
var rangeLvl3 : float = 100;

var dischargeTime : float = 15;
var rechargeTime : float = 10;

var dps : int = 12; //damage per second 
var dpsLvl2 : int = 24;
var dpsLvl3 : int = 52;

var ballArc : GameObject;
var arcEmitters : GameObject[];
var arcTargets : GameObject[];
var arcTarget : GameObject;
var ballArcMin : float = .1; //Size of the arcs on the ball
var ballArcMax : float = 3;
//var emitterScript : 

var enemiesInRange = new Array(); //keep a list of enemies

var switchedOn : boolean = false;


function Awake () {
	for(var lE in arcEmitters) //turn off all emitters
		lE.SetActive(false);
	ballArc.particleSystem.startSize = ballArcMin; //ball arcs at min
}

function Update () {
	if(switchedOn){
		Zap();	
		
	 	//DRAIN POWER
		powerLevel -= (Time.deltaTime / dischargeTime) * powerLevelMax;
		
		if(powerLevel <= 0) {
			powerLevel = 0;
			switchedOn = false;
		}
		
		//DO WHILE ON STUFF
		//WhileSwitchedOn();
	}
	
	if(!switchedOn) {
		if(arcTargets[0].activeSelf){	
			for(var a = 0; a < arcTargets.length; a++){
				 arcTargets[a].SetActive(false);
				//print("switched off" + a);
			}
		}
		powerLevel += (Time.deltaTime / rechargeTime) * powerLevelMax;
		powerLevel = Mathf.Clamp(powerLevel, 0, powerLevelMax);
	}	
	
	//SPARKS GROWING ON BALL EFFECT
	ballArc.particleSystem.startSize = ballArcMin + (ballArcMax*powerLevel)/powerLevelMax;
	
	var c : SphereCollider;
	if(level == 2 && range != rangeLvl2) {
		c = gameObject.collider as SphereCollider;
		c.radius = rangeLvl2;
		range = rangeLvl2;
		
		powerLevelMax = powerLevelMax2;
	}
	else if(level == 3 && range != rangeLvl3) {
		c = gameObject.collider as SphereCollider;
		c.radius = rangeLvl3;
		range = rangeLvl3;
		
		powerLevelMax = powerLevelMax3;
	}
	

}

function OnTriggerEnter (ob : Collider) {
	
	if(ob.gameObject.tag == "Enemy") {
		var enemy = ob.gameObject.transform.root.gameObject; //get top-most obj in hierarchy(the one with scriptActorEnemy it is assumed )
		for(var eIndex = 0; eIndex < enemiesInRange.length; eIndex++ ){ //compare to list and ignore if already in list
			var eListed : GameObject = enemiesInRange[eIndex] as GameObject;
			if(eListed == enemy){
				return;
			}
		}
		CleanUpList(); 
		enemiesInRange.push(enemy); //add enemy to lisr
	}
}


//quick remove of destroyed enemies
function CleanUpList () {

    var eir = enemiesInRange.length;
    
    if(eir <= 0) return;
    
	for(var i = 0; i < eir; i++) {
		if (enemiesInRange[i] as GameObject == null ){
			enemiesInRange.RemoveAt(i); //REMOVE MISSING OBJECTS
			eir = enemiesInRange.length;//reset target
			i--;	//step back index
		}
	}
}



function Zap () {

	level = Mathf.Clamp(level, 1, 3);
	
			arcTargets[0].SetActive(true);

		if(level == 2) {
			arcTargets[1].SetActive(true);
			dps = dpsLvl2;
		}
		if(level == 3) {
			arcTargets[2].SetActive(true);
			arcTargets[3].SetActive(true);
			dps = dpsLvl3;
		}
}

