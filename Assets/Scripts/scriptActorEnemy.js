#pragma downcast
// Enemy Actor Script
//most of this mess isnt used

// Inspector variables
static var enemyList = new Array();	//List to keep of enemies
var enemyID			: int;	//unique ID for this enemy instance
var moveNum			: int;
var soulsWorth : int = 40;

var speed 			: float = 6.0; 	//moving speed
var damageVelocity 	: float = 0.0; 	//relative velocity of collision with cannon ball to kill
var healthPoints	: float = 1.0;	//health of the enemy
var alive 			: boolean = true; //to prevent multi deaths

var miniBDmg 		: int = 1; //damage taken from minibullet
var tankBDmg 		: int = 5; //damage taken from tank bullet
var cannonBDmg 		: int = 5; //damage taken from cannon ball

var atGate			: boolean = false;	//is enemy touching gate?

var gateScript		: scriptGate;

var h : wallState;



//MasterLog
var s : Script_Hud;

//static variables
static var atGateCount	: int = 0;		//global count of enemies at gate
static var killCount 	: int = 0;		//global count of enemies killed

var suicideParticle : Transform;
var splosion : Transform;

// Private variables
private var moveDirection : Vector3; //vector describing the direction of movment

var _soulEffect : GameObject;

function Start ()
{	
	h = GameObject.Find("Wall").GetComponent(wallState);
	s = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
	//movePoint = movePoint.GetComponentInChildren("WallTargetPointC");
	//enemyList.Push(enemyID);
	//moveDirection = GameObject.Find("WallTargetPointA").GetComponent("Transform").transform.position;//transform.up; 
	
	if (enemyList.length > 0) 
	{	
		//var lastEnemyID : int = enemyList[enemyList.length-1];
		//enemyID = lastEnemyID+1;
		enemyID = enemyList.length;		
		if (enemyID % 3 == 0) moveNum = 0;
		if (enemyID % 3 == 1) moveNum = 1;
		if (enemyID % 3 == 2) moveNum = 2;
	}
	else enemyID = 0;	
	enemyList.Push(enemyID);
}

function Update() {
	// Make a character controller
    //var controller : CharacterController = GetComponent(CharacterController);
    
    // Move the controller
    //controller.Move(-moveDirection * speed * Time.deltaTime);
    
    //transform.position.z -= Time.deltaTime * speed;      
    
    if (scriptGate.zap == true && atGate == true)
    {
    	TakeDamage(2);
    }
    
    if (scriptGate.zap == true) atGateCount = 0; //hack to reset gate count because actual number at gate is not constantly tracked
    
  //  if (transform.position.z > 1) GameOver(); //if enemies get past the gate
}


function OnCollisionEnter (other : Collision)
{
	var collidedWith : String = other.gameObject.tag;
	//print(collidedWith);
	if(collidedWith == "MiniBullet") TakeDamage(miniBDmg);
	if(collidedWith == "TankBullet") TakeDamage(tankBDmg);
	if(collidedWith == "Projectile") TakeDamage(cannonBDmg);
	
	//if(collidedWith == "Explosion") TakeDamage(2);
	
	//if(other.gameObject.tag == "Enemy") {
	//	 Physics.IgnoreCollision(other.collider, collider); 
	//}	
}

function OnTriggerEnter (other : Collider)
{
	//var triggeredWith: String = other.gameObject.tag;
	//print("Triggered with: " + triggeredWith);
 	 	 	
 	if(other.gameObject.tag == "Gate")
 	{
 		atGate = true;
 		atGateCount++;
 	}
 	
 	if(other.gameObject.tag == "Explosion")
 	{
		TakeDamage(2);	
 	}
 	
 	//if(other.gameObject.CompareTag ("Enemy")) //learn about null reference exceptions and 
 	//{
// 		var buddy = GetComponent.Get; 
// 		print("touching buddy");
// 		if (other.gameObject.GetInstanceID() != GetInstanceID() && other.gameObject.GetComponent(scriptActorEnemy).atGate == true)
// 		{
// 			atGate = true;
// 			atGateCount++;
// 		}
 	//}
 	
 	if(other.gameObject.tag == "Wall") 
 	{
		Suicide ();
 		h.wallHealth -= 100;
	}
	


}

function TakeDamage (damage:float)
{
	healthPoints -= damage;
	
	if (alive && healthPoints <= 0)	//Enemy has died
	{	
		s.AddSouls(soulsWorth);
		
		Die();
		
		if(atGate) 
			atGateCount--;
			
	}
}

function GameOver ()
{
	yield WaitForSeconds(5.0);
	Application.LoadLevel("sceneGameOver");
}

function Die () 
{
	alive = false; 
			
	//Turn off all meshs
	var mySkins : Component[];
	mySkins = GetComponentsInChildren(SkinnedMeshRenderer);
	for (var skin : SkinnedMeshRenderer in mySkins){
		skin.renderer.enabled = false;
	}
	var myMeshs : Component[];
	myMeshs = GetComponentsInChildren(MeshRenderer);
	for (var mesh : MeshRenderer in myMeshs){
		mesh.renderer.enabled = false;
	}
	//turn off other components
	
	//collider.enabled = false; //I removed all of the colliders from the main object and put them on subComponents so I don' think this is needed. - Jeff
	
	if (gameObject.GetComponent(FlyingPathFinder) != null)
		gameObject.GetComponent(FlyingPathFinder).enabled = false;
	if (gameObject.GetComponent(PathFinder) != null)
		gameObject.GetComponent(PathFinder).enabled = false;	
	
	//make generic death fx
	Instantiate(suicideParticle, transform.position, transform.rotation);
	Instantiate(_soulEffect, gameObject.transform.position, Quaternion.Euler(-90,0,0));
	Instantiate(splosion, transform.position, transform.rotation);
	
	yield WaitForSeconds(.75); //delay to allow sound effect to play
	Destroy(gameObject);
	enemyList[enemyID] = -1; //represent a dead enemy as -1 in list
	killCount++;
}

function Suicide () 
{
		alive = false;
		Destroy(gameObject);
		Instantiate(suicideParticle, transform.position, transform.rotation);
		Instantiate(splosion, transform.position, transform.rotation);
}
/*
var speed = 4.0;
var delayTime = 1.0;

private var p : GameObject;
private var countTimer = 4.1;
private var vectorToPlayer : Vector3;

function Awake() {
	// Find the player
	p = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	FindAndChase();
}

function FindAndChase() {
	
	countTimer += Time.deltaTime;

	if(countTimer >= delayTime)
	{
	
		// Calculate the vector between the player and the enemy
		vectorToPlayer = p.transform.position - this.transform.position;
		vectorToPlayer.Normalize();
		countTimer = 0.0;
		//transform.LookAt(vectorToPlayer);
	}
	
	transform.position = transform.position + (vectorToPlayer * (speed * Time.deltaTime));

}
*/