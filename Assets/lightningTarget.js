#pragma strict

var myLight : Light;
var intensity : float = 1; //light intensity multiplier

var target : GameObject;

var teslaCoil : GameObject;

var teslaScript : teslaControl;

var targetScript : scriptActorEnemy;

var arcObj : GameObject;

var makingDamage : boolean = false;

var player : Transform;

var enemiesTargeted = new Array();

var dph : int = 2; //damage per hit: bigger = more damge, less frequently

var dir : Vector3;

var speed = 100;

public var theAngle : int = 45;
public var segments : int = 10;

function Awake () {
	arcObj.GetComponent(Lightning).target = this.gameObject;
	gameObject.SetActive(false);
}

function Start () {
	teslaScript = teslaCoil.GetComponent(teslaControl);
	PickDir();
}

function Update () {
	if(target != null){ ///WE HAVE TARGET
		targetScript = target.GetComponent(scriptActorEnemy);
		if(targetScript.alive) //Only attach if alive
			gameObject.transform.position = target.transform.position;
		if(targetScript.alive && !makingDamage){	
			InvokeRepeating("MakeDamage",0,dph/teslaScript.dps);
		}
		if(!targetScript.alive){
			makingDamage = false;
			CancelInvoke();
			target = null;
			//gameObject.transform.parent = null;
			//gameObject.SetActive(false);
			teslaScript.GetTarget();
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
	transform.position.z = Mathf.Clamp(transform.position.z, 15, teslaScript.range);
	transform.position.x = Mathf.Clamp(transform.position.x, teslaCoil.transform.position.x - teslaScript.range/2, teslaCoil.transform.position.x + teslaScript.range/2);
	
	
		
} 

function OnEnable () {
	Jump();
	arcObj.SetActive(true);
}

function OnDisable () {
	arcObj.SetActive(false);
	transform.position = Vector3.zero;
}

function OnTriggerStay (obj : Collider) {
	if (target == null && obj.gameObject.tag == "Enemy") {
		target = obj.gameObject;
//		targetScript = target.GetComponent(scriptActorEnemy);
//		if(targetScript.alive) //Only attach if alive
//		gameObject.transform.position = target.transform.position;
	}
	if (target != null && obj.gameObject.tag == "Enemy"){
		if(Random.value > .5)
			target = obj.gameObject;
	}
	
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
//	var enemies = new GameObject.FindGameObjectsWithTag("Enemy");
//	for (var enemy in enemies)
//		if(Vector3.Distance(this.gameObject.transform.parent.position, enemy.transform.position) > teslaScript.range)
//			enemiesTargeted.Push(enemy);
//	//////////////
//	if (enemiesTargeted.length > 0){
//		var l = 0;
//			var rdm = Mathf.RoundToInt(Random.Range(0, enemiesTargeted.length-1) );
//			target = enemiesTargeted[rdm] as GameObject;
//		}
//	transform.position = target.transform.position;
//	
	var layer = Random.value;
	if(layer > .5)
		transform.position = Vector3(teslaCoil.transform.position.x, teslaCoil.transform.position.y - 3.3,teslaCoil.transform.position.z);
	else
		transform.position = Vector3(teslaCoil.transform.position.x, 15,teslaCoil.transform.position.z);
//	hit : RaycastHit;
//		
//	Physics.Raycast
//	for(var hits in hit){
//		if(hits.collider.gameObject.tag == "Enemy")
//			//var obj = GetParent(hits.collider.gameObject as GameObject);
//			if(!HasParent(hits.collider.gameObject) ); //only want top most objects in hierarchy
//				targets.Push(hits.collider.gameObject as GameObject);
//	}
//	RaycastSweep();
}

function PickDir() {

	dir = Vector3((Random.value-.5)*2,(Random.value-.3)*1.7,(Random.value)*2 );
}

function RaycastSweep()
{
var startPos : Vector3 = transform.position; // umm, start position !
var targetPos : Vector3 = Vector3.zero; // variable for calculated end position
 
var startAngle : int = parseInt( -theAngle * 0.5 ); // half the angle to the Left of the forward
var finishAngle : int = parseInt( theAngle * 0.5 ); // half the angle to the Right of the forward
 
// the gap between each ray (increment)
var inc : int = parseInt( theAngle / segments );
 
var hit : RaycastHit;
 
// step through and find each target point
for ( var i : int = startAngle; i < finishAngle; i += inc ) // Angle from forward
{
targetPos = (Quaternion.Euler( 0, i, 0 ) * transform.forward ).normalized * teslaScript.range;
 
// linecast between points
if ( Physics.Linecast( startPos, targetPos, hit ) )
{
Debug.Log( "Hit " + hit.collider.gameObject.name );
}
 
// to show ray just for testing
Debug.DrawLine( startPos, targetPos, Color.green );
}
}

function Jump() {
	transform.position.y = Random.Range(0.0, 25.0);
	transform.position.z = Random.Range(15, teslaScript.range);
	transform.position.x = Random.Range(teslaCoil.transform.position.x - teslaScript.range/2, teslaCoil.transform.position.x + teslaScript.range/2);
	yield WaitForSeconds (2*Random.value + .5);
	if (target == null)
	OnEnable();
}