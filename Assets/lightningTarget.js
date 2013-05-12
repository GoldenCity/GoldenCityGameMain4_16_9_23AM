#pragma strict

var myLight : Light;
var intensity : float = 1; //light intensity multiplier

var target : GameObject;

var teslaCoil : GameObject;

var teslaScript : teslaControl;

var targetScript : scriptActorEnemy;

var makingDamage : boolean = false;

var player : Transform;

var dph : int = 2; //damage per hit: bigger = more damge, less frequently

function Awake () {
	gameObject.SetActive(false);
}

function Start () {
	teslaScript = teslaCoil.GetComponent(teslaControl);
}

function Update () {
	if(target != null){
		if(targetScript.alive && !makingDamage){	
			InvokeRepeating("MakeDamage",0,dph/teslaScript.dps);
		}
		if(!targetScript.alive){
			makingDamage = false;
			CancelInvoke();
			target = null;
			gameObject.transform.parent = null;
			//gameObject.SetActive(false);
		}
		myLight.intensity = (Random.value*intensity); //light effects
	}
	else {
		myLight.intensity = 0;
		transform.position += Vector3(Random.value,Random.value,Random.value);
	}
		
	gameObject.transform.LookAt(player);
	
	
		
} 

function OnEnable () {
	//if(gameObject.transform.parent.gameObject);
}

function OnTriggerStay (obj : Collider) {
	if (target == null && obj.gameObject.tag == "Enemy") {
		target = obj.gameObject;
		targetScript = target.GetComponent(scriptActorEnemy);
		if(targetScript.alive) //Only attach if alive
			gameObject.transform.position = target.transform.position;
	}
	if (target != null && obj.gameObject.tag == "Enemy"){
		if(Random.value > .5)
			target = obj.gameObject;
	}
	gameObject.transform.position = target.transform.position;
}

function OnTriggerExit (obj : Collider) {
	if(obj.gameObject == target) {
		gameObject.transform.parent = null;
		target = null;
		CancelInvoke();
		//gameObject.SetActive(false);
	}
		
}

function MakeDamage () {
	makingDamage = true;
	//var dmg = teslaScript.dps/4;
	targetScript.TakeDamage(dph);
}