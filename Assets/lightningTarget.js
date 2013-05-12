#pragma strict

var myLight : Light;
var intensity : float = 1; //light intensity multiplier

var target : GameObject;

var teslaCoil : GameObject;

var teslaScript : teslaControl;

var targetScript : scriptActorEnemy;

var makingDamage : boolean = false;

var player : Transform;

var enemiesTargeted = new Array();

var dph : int = 2; //damage per hit: bigger = more damge, less frequently

var dir : Vector3;

var speed = 100;

function Awake () {
	gameObject.SetActive(false);
}

function Start () {
	teslaScript = teslaCoil.GetComponent(teslaControl);
	PickDir();
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
			//gameObject.transform.parent = null;
			//gameObject.SetActive(false);
		}
		myLight.intensity = (Random.value*intensity); //light effects
	}
	else {
		myLight.intensity = 0;
		if(Vector3.Distance(teslaCoil.transform.position, transform.position) < teslaScript.range - 10 || Time.time%5 < 4.9)
			transform.Translate(dir*Time.deltaTime*speed);
		else {
			transform.position = teslaCoil.transform.position;
			PickDir();
		}
	}
		
	gameObject.transform.LookAt(player);
	
	transform.position.y = Mathf.Clamp(transform.position.y, 0.0, 25.0);
	transform.position.z = Mathf.Clamp(transform.position.z, 0, teslaScript.range);
	transform.position.x = Mathf.Clamp(transform.position.x, teslaCoil.transform.position.x - teslaScript.range/2, teslaCoil.transform.position.x + teslaScript.range/2);
	
	
		
} 

function OnEnable () {
	GetTarget();
}

function OnTriggerStay (obj : Collider) {
	if (target == null && obj.gameObject.tag == "Enemy") {
		target = obj.gameObject;
		targetScript = target.GetComponent(scriptActorEnemy);
		if(targetScript.alive) //Only attach if alive
			gameObject.transform.position = target.transform.position;
	}
//	if (target != null && obj.gameObject.tag == "Enemy"){
//		if(Random.value > .5)
//			target = obj.gameObject;
//	}
	
}

function OnTriggerExit (obj : Collider) {
	if(obj.gameObject == target) {
		//gameObject.transform.parent = null;
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

function GetTarget() {
	var enemies = new GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy in enemies)
		if(Vector3.Distance(this.gameObject.transform.parent.position, enemy.transform.position) > teslaScript.range)
			enemiesTargeted.Push(enemy);
	//////////////
	if (enemiesTargeted.length > 0){
		var l = 0;
			var rdm = Mathf.RoundToInt(Random.Range(0, enemiesTargeted.length-1) );
			target = enemiesTargeted[rdm] as GameObject;
		}
	transform.position = target.transform.position;
	
}

function PickDir() {

	dir = Vector3((Random.value-.5)*2,(Random.value-.3)*1.7,(Random.value) );
}