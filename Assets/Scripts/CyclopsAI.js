#pragma strict

var smogSource1 : Transform;
var smogSource2 : Transform;
var smogPrefab  : GameObject;
var coG 		: Transform; //Center of Gravity
private var moveTime = 0.0;

function Start () {
  //  animation["Moving"].layer = 1;
   /// animation["SmogAttack"].layer = 1;
   // animation["exhaust_normal"].layer = 0;
   // animation["exhaust_smog_attack"].layer = 0;
    
	animation.Play("Moving");
	//animation.Blend("exhaust_normal",1,.5);
	
	rigidbody.centerOfMass = coG.localPosition; //set the center of gravity 
	
}

function Update () {
	if(!isSmogging && !isRaging){
		moveTime += Time.deltaTime;
		if(moveTime >= 10){
			moveTime = 0;
			SmogOfWar();		
		}
	}
}

function OnTriggerEnter(objColl : Collider) {
	
	if(objColl.gameObject.tag == "MovingWall") {			
		Physics.IgnoreCollision(objColl.collider, collider);
	}
	
}

function OnCollisionEnter (other : Collision) {
	if(other.gameObject.tag == "Projectile" || 
	   other.gameObject.tag == "MiniBullet" || 
	   other.gameObject.tag == "TankBullet")
	{
		if(Random.value < .15) //small chance to "rage" when hit
			Rage ();
	}   
}

////
//Smog animation
////
private var isSmogging = false;
function SmogOfWar () {
	
	if(!isSmogging){
		
	    
		animation.CrossFade("SmogAttack",.3);
		//animation.Blend("exhaust_smog_attack",1,.3);
		
		yield WaitForSeconds(.75);
		var a = Instantiate(smogPrefab, smogSource1.position,  smogSource1.rotation);
		var b = Instantiate(smogPrefab, smogSource2.position,  smogSource2.rotation);
			a.transform.parent = gameObject.transform;	
			b.transform.parent = gameObject.transform;
			isSmogging = true;
		
		globalFog.fogFarTarget -= 15;
	}	
	//end smog attack
	yield WaitForSeconds(1.5) ;
		animation.CrossFade("Moving",.5);
		//animation.Blend("exhaust_normal",1,.5);
		isSmogging = false;
		b.transform.parent = null;
		a.transform.parent = null;

	
}

////
//rage/aggro animation
////
private var isRaging = false;
function Rage (){
	if(Random.value > .3) { //small chance the rotation will not be frozen so theres a chance clops could be knocked on his ass
		rigidbody.constraints = RigidbodyConstraints.FreezeRotationX |   	//lock rigidbody rotations
								//RigidbodyConstraints.FreezeRotationY | 
								RigidbodyConstraints.FreezeRotationZ;
	}						
	if(!animation.IsPlaying("Moving") ){
		return;
	}
	isRaging = true;
	animation.CrossFade("Agro",.3);
	var s = gameObject.GetComponent(PathFinder).speed;
	gameObject.GetComponent(PathFinder).speed = 0.1;
	yield WaitForSeconds(3);
	gameObject.GetComponent(PathFinder).speed = s;
	animation.CrossFade("Moving",3);
	//animation.Blend("exhaust_normal",1,.5);
	rigidbody.constraints = RigidbodyConstraints.None; //unlock rigidbody constraints
	isRaging = false;
}