#pragma strict

var level : int = 1;

var powerLevel : float = 0;
var powerLevelMax : float = 100;

var range : float = 50;
var rangeLvl2 : float = 75;
var rangeLvl3 : float = 100;

var dischargeTime : float = 5;
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
		if(powerLevel <= 0) switchedOn = false;
		
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
	
	ballArc.particleSystem.startSize = ballArcMin + (ballArcMax*powerLevel)/powerLevelMax;
	
	var c : SphereCollider;
	if(level == 2) {
		c = gameObject.collider as SphereCollider;
		c.radius = rangeLvl2;
		range = rangeLvl2;
	}
	if(level == 3) {
		c = gameObject.collider as SphereCollider;
		c.radius = rangeLvl3;
		range = rangeLvl3;
	}
	
	//set material of lightning based on power levels
	var emitterLevel = 1;
	if(powerLevel >= powerLevelMax*0.9)
		emitterLevel = 3;
	else if(powerLevel >= powerLevelMax*0.5)
		emitterLevel = 2;
	for(var emitter in arcEmitters){
		if(emitter.activeSelf)
			emitter.GetComponent(Lightning).level = emitterLevel;
	}
}
/*
function OnTriggerEnter (ob : Collider) {
	
	if(ob.gameObject.tag == "Enemy") {
		CleanUpList(); //remove dead enemies
		var i = 0;
		while(i < enemiesInRange.Length){ //Find empty space in list and add
			if(enemiesInRange[i] == null){
				enemiesInRange[i] = ob.gameObject;
				break;
			}
			else i++;	
		}
	}
}
*/

//quick remove of dead and destroyed enemies
function CleanUpList () {
	
//  for(var go in enemiesTargeted) {
//  	if (go == null || go.
//  }
}

//push any null elements to the back
//Return active enemy count
//function SortList () {
//	 CleanUpList ();
//	 //Sort list
//	 var newList = new GameObject[enemiesInRange.length];
//	 var count = 0; //how many active enemies are there?
//	 for(var j = 0; j < newList.Length; j++){
//	 	if(enemiesInRange[count] != null){
//	 		newList[j] = enemiesInRange[count] as GameObject;
//	 		count++;
//	 	}
//	 }
//	 enemiesInRange = newList;
//	 print(" sortList count = " +count);
//	 return count; //return how many active enemies found
//}

function Zap () {
	level = Mathf.Clamp(level, 1, 3);
	

	//if(!arcEmitters[0].activeSelf){
		//if(enemiesTargeted[0] != null){
			//arcEmitters[0].SetActive(true);
			//arcEmitters[0].GetComponent(Lightning).target = arcTargets[0];
			arcTargets[0].SetActive(true);
		//}
		//else 
		//	switchedOn = false;
		if(level == 2) {
			//arcEmitters[1].SetActive(true);
		//	arcEmitters[1].GetComponent(Lightning).target = arcTargets[1];
			//arcTargets[1].transform.position = enemiesTargeted[1].transform.position;
			arcTargets[1].SetActive(true);
			dps = dpsLvl2;
		}
		if(level == 3) {
			//arcEmitters[2].SetActive(true);
			//arcEmitters[3].SetActive(true);
			//arcEmitters[2].GetComponent(Lightning).target = arcTargets[2]; 
			//arcTargets[2].transform.position = enemiesTargeted[2].transform.position;
			//arcEmitters[3].GetComponent(Lightning).target = arcTargets[3]; 
			//arcTargets[3].transform.position = enemiesTargeted[3].transform.position;
			arcTargets[2].SetActive(true);
			arcTargets[3].SetActive(true);
			dps = dpsLvl3;
		}
	//}
	
//	GetTarget();
}
//
private var lastTarget;
function GetTarget () {
//	var enemies = new GameObject.FindGameObjectsWithTag("Enemy");
//	for (var enemy in enemies)
//		if(Vector3.Distance(this.transform.position, enemy.transform.position) < range &&)
//			enemiesInRange.Push(enemy);
//	//////////////
//	if (enemiesTargeted.Length > 0){
//		for (var i = 0; i < enemiesTargeted.Length; i++) {
//			var rdm = Mathf.RoundToInt(Random.Range(0, enemiesInRange.length-1) );
//			enemiesTargeted[i] = enemiesInRange[rdm] as GameObject;
//			enemiesInRange.RemoveAt(rdm);
//		}
//	}
//	var targets = new Array();
//
//	var hit : RaycastHit[];
//	Physics.SphereCastAll(gameObject.transform.position, range, Vector3.forward,  hit, 0);
//	for(var hits in hit){
//		if(hits.collider.gameObject.tag == "Enemy")
//			//var obj = GetParent(hits.collider.gameObject as GameObject);
//			if(!HasParent(hits.collider.gameObject) ); //only want top most objects in hierarchy
//				targets.Push(hits.collider.gameObject as GameObject);
//	}

}
//
//function WhileSwitchedOn () {
//		//test if targeted enemies are still alive
//
//}		
//function GetParent(obj : GameObject) {
//	var par = obj.transform.parent.gameObject as GameObject;
//	if(par != null)
//		GetParent(par as GameObject);
//	else
//		return par;
//
//}	

function HasParent(obj : GameObject) {
	var par = obj.transform.parent.gameObject as GameObject;
	if(par == null)
		return true;
	else
		return false;
}	