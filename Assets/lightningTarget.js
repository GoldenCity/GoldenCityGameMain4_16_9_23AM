#pragma strict

var myLight : Light;
var intensity : float = 1; //light intensity multiplier

var target : GameObject;

var teslaCoil : GameObject;

var teslaScript : teslaControl;

var enemyScript : scriptActorEnemy;

var arcObj : GameObject;
var arcScript : Lightning;

var makingDamage : boolean = false;

var player : Transform;

var enemiesTargeted = new Array();

var dph : int = 2; //damage per hit: bigger = more damge, less frequently

var dir : Vector3;

var speed = 100;


function Awake () {
	arcScript = arcObj.GetComponent(Lightning);
	arcScript.target = this.gameObject;
	 
	gameObject.SetActive(false);
	
	player = GameObject.FindGameObjectWithTag("MainCamera").transform;
}

function Start () {
	teslaScript = teslaCoil.GetComponent(teslaControl);
	PickDir();
}

function Update () {
	if(target != null){ ///WE HAVE TARGET
		if(!enemyScript.alive){
			LockOff();
		}
		
		//set material of lightning based on power levels
		var emitterLevel = 1;
		if(teslaScript.powerLevel >= teslaScript.powerLevelMax*0.9)
			emitterLevel = 3;
		else if(teslaScript.powerLevel >= teslaScript.powerLevelMax*0.5)
			emitterLevel = 2;	
		arcScript.level = emitterLevel;
		
		myLight.intensity = (Random.value*intensity); //light effects
	}
	else {
		myLight.intensity = 0;
		if(teslaScript.enemiesInRange.length > 0)
			GetTarget();
			
		if(makingDamage) LockOff();
			
		arcScript.level = 1;					
	}
} 

function OnEnable () {
	GetTarget();
	Jump();
	arcObj.SetActive(true);
}

function OnDisable () {
	arcObj.SetActive(false);
	transform.position = teslaCoil.transform.position;
	
	CancelInvoke();
	
	var joints : ConfigurableJoint[];
	joints = gameObject.GetComponents.<ConfigurableJoint>();
	for(var joint : ConfigurableJoint in joints) {
		Destroy(joint);
	}
}

function OnTriggerStay (obj : Collider) {

}

function OnTriggerExit (obj : Collider) {

		
}

function MakeDamage () {
	makingDamage = true;
	if(enemyScript != null) enemyScript.TakeDamage(dph);
	else LockOff();
	teslaScript.powerLevel -= dph; //coil drains extra power
	
	var aps : float = dph/(teslaScript.dps*1.0);	
	gameObject.transform.LookAt(player); //for the attached light object
}

function GetTarget() {
	//Choose a target
	while(target == null && teslaScript.enemiesInRange.length > 0){
		var choice = Random.Range(0, teslaScript.enemiesInRange.length - 1 );
		var choiceGO : GameObject = teslaScript.enemiesInRange[choice] as GameObject;
		if(choiceGO == null || choiceGO.GetComponent(scriptActorEnemy).alive == false)
			teslaScript.enemiesInRange.RemoveAt(choice); //REMOVE DEAD/MISSING ENEMIES FROM LIST
		else{ 
			target = choiceGO;
			LockOn();
		}
	}
}

function LockOn () {
	//SET POSITION AT TARGET
	enemyScript = target.GetComponent(scriptActorEnemy);
	gameObject.transform.position = target.transform.position;
	
	//CONNECT THIS GO WITH A CONFIGURABLE JOINT
	var cfj : ConfigurableJoint;
	cfj = gameObject.AddComponent(ConfigurableJoint);
	cfj.connectedBody = target.gameObject.rigidbody;
	cfj.xMotion = ConfigurableJointMotion.Locked; 
	cfj.yMotion = ConfigurableJointMotion.Locked;
	cfj.zMotion = ConfigurableJointMotion.Locked;
	cfj.axis = Vector3(1,0,0);
	cfj.secondaryAxis = Vector3(0,1,0);
	
	//START DAMAGING ENEMY
	var aPS : float = dph/(teslaScript.dps*1.0); //Attacks Per Second
	InvokeRepeating("MakeDamage",0,aPS);
}

function LockOff () {
	//DESTROY FIXED JOINTS
	var joints : ConfigurableJoint[];
	joints = gameObject.GetComponents.<ConfigurableJoint>();
	for(var joint : ConfigurableJoint in joints) {
		Destroy(joint);
	}
	
	makingDamage = false;
	CancelInvoke();
	target = null;
	Jump();
}

function PickDir() {

	dir = Vector3((Random.value-.5)*2,(Random.value-.3)*1.7,(Random.value)*2 );
}


function Jump() {
	//var range = teslaScript.range;
	transform.position.y = Random.Range(0.0, 25.0);
	transform.position.z = Random.Range(5, 15);
	transform.position.x = Random.Range(teslaCoil.transform.position.x - 15, teslaCoil.transform.position.x + 15);
	yield WaitForSeconds (2*Random.value + .5);
	if (target == null)
	OnEnable();
}