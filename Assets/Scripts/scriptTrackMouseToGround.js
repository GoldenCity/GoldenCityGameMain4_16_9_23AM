#pragma strict

//Track the mouse to the ground in 3D space
//Place a target point on the ground object where the mouse is pointing
//Position cannon to hit target with projectile
//Fire projectile on mouse click

//inspector variables

var cannonIsOn = true;
var mask : LayerMask = -1;

//private variables
var target				: Transform;
var arcX				: float	= 60.0; 	//cannon degrees of freedom on X axis (point up/down)
var arcXOffset 			: float = 90; 		//elevation of cannon when mouseY is center
var projectile 			: Transform;		//Transforms added to projectile on its instantiation
var projectileEmitter 	: Transform;		//Transforms added to the emitter object
var smokeRing		 	: GameObject;
var smokePillow		 	: GameObject;
var muzzleEmitter 		: Transform;
var muzzleFlash 		: GameObject;
var muzzleSmoke 		: GameObject;
var muzzleSmoke2 		: GameObject; 
var cannonBoom 			: AudioClip;
var mine 				: Transform;
var shotDelay 			: double = 1.0;
var delay				: double = 0.0;

static var hitPoint 	: Vector3;			//point where mouse 'touches' ground
static var launchVelocity : float = 50.0;	//velocity of projectile when instantiated

var hitPointX : float;
var hitPointY : float;
var hitPointZ : float;

var info : System.String = "";

var c : Script_Hud;

var spawnSolarbeamScript : spawnSolarbeam;
var spawnMineScript : NovaMineSpawn;

var basicCooldown = 2.0;
var basicCooldownTimer = 2.0;

var shotsLeft = 4;
var shotsMax = 4;

function Start()
{
	c = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
	
	spawnSolarbeamScript = GameObject.Find("Globals").GetComponent(spawnSolarbeam);
	spawnMineScript = GameObject.Find("Globals").GetComponent(NovaMineSpawn);
}

function Update () 
{ 
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition); //active camera must be tagged MainCamera!
	var hit : RaycastHit;
	
	cannonIsOn = true; //c.cannonOn;	
	//print("CannonON is: " + cannonIsOn);
	if (Physics.Raycast (ray, hit, 1000, mask.value)) 
	{

    	hitPoint = hit.point;
    	    	
    	info = "";
		info += "HitPoint: (" + hitPoint.x + ", " + hitPoint.y + ", " + hitPoint.z + ")";
    	
    	hitPointX = hitPoint.x;
    	hitPointY = hitPoint.y;
    	hitPointZ = hitPoint.z;
    	
    	if (hitPoint.z < 20) { //turns cannon off if mouse is at a certain point
    		cannonIsOn = false;
    	}
    	if (hitPoint.z < 25) { //fixes z point so that cannon will not continue to follow mouse 
    		hitPoint.z = 25;
    	}
    	
    	var theta = GetTheta(hitPoint); //get angle cannon must be at to hit target given		
	    target.position = hitPoint; //place the spotlight target	       	    
	                
		if (cannonIsOn)
		{
	    	transform.LookAt(hitPoint); //point camera at target
	    	transform.Rotate(Vector3(theta,0,0));	//adjust angle of launch to hit target	    	
	    }else {   		    	
	    	transform.rotation = Quaternion.Euler ( 45, 0, 0 );	    	
	    }    	    	    
	}
	
	Debug.DrawRay (ray.origin, ray.direction * 1000, Color.yellow);
	
	if (cannonIsOn)
	{
		target.gameObject.SetActive(true);
		
		//target.active = true;
		if(c.scorcherFireOn)
		{
			if(Input.GetMouseButtonDown(0))
			{
				spawnSolarbeamScript.SpawnSolarbeam();
			}
		}
		
		if(c.mineOn)
		{
			if(Input.GetMouseButtonDown(0))
			{
				spawnMineScript.SpawnNovaMine();
			}
		}
		
		if(c.normalCannonOn)
		//if (cannonIsOn) 
		{
			if (Input.GetMouseButtonDown(0) && target.gameObject.active == true)//fire cannon
			{
				if(shotsLeft > 0)
				{
				CannonFireFX();
				Instantiate(projectile, projectileEmitter.position, projectileEmitter.rotation); //create a projectile object at the emitter position and rotation			
				shotsLeft--;
				basicCooldownTimer = basicCooldown;
				//basicAttackCooldown();
				} 
			}
		}
	} else {
	//target.active = false;
		//print("deactivate cannon");
		target.gameObject.SetActive(false);
	}
	//info = "";
	//info += "target: " + hitPoint;
	
	//angle += Input.GetAxis("Vertical") * Time.deltaTime * 10;
	//angle = Mathf.Clamp( angle, 0, 180 ); 
    //transform.localRotation = Quaternion.AngleAxis(angle, Vector3.right);   
    
    
    //----------------------------------COOLDOWN CONSTANT------------
    basicCooldownTimer -= Time.deltaTime;
    //print(basicCooldownTimer);
    if(basicCooldownTimer <= 0)
    { 
    	shotsLeft = shotsMax;
    	basicCooldownTimer = basicCooldown;
    }
    //----------------------------------------------------------------
    
}

//function basicAttackCooldown()
//{	
//	if(shotsLeft == 0)
//	{
//		yield WaitForSeconds(basicCooldown);
//		shotsLeft = shotsMax;
//	}
//}

function GetTheta(hitPoint : Vector3) //
{ //See http://en.wikipedia.org/wiki/Trajectory_of_a_projectile#Angle_required_to_hit_coordinate_.28x.2Cy.29

	var v = launchVelocity;
	var d = Mathf.Sqrt(Mathf.Pow(hitPoint.z-transform.position.z,2)+Mathf.Pow(hitPoint.x-transform.position.z,2));//the hypotenuse of a right triangle shall be d
	var y = transform.position.y-hitPoint.y-0.7; //altitude of target
	var g = Mathf.Abs(Physics.gravity.y); //assume gravity is a positive
	var partA = Mathf.Pow(v,2); //trying to break it up to be easier to read
	var partB = Mathf.Pow(v,4)-g*(g*d*d+2*y*v*v); //and so if this part is <0 we wont square root it
	
	if (partB<0) //equation will choke on irrational number if target is outside max range of cannon, need better way to deal with this
	{
		partB=0;
		//print ("irrational number warning!");
	}
	
	var theta = Mathf.Atan((partA+Mathf.Sqrt(partB))/(g*d)); //complete the calculation
		theta = theta*Mathf.Rad2Deg; //convert result from radians to degrees
		
	//print (theta);
	return theta ;
}

function OnGUI() {
	//GUI.Label(Rect (500,10,300,100), info);
}

function CannonFireFX () {
		//SMOKEY POOFS
		if(Random.value < .1) { //make it somewhat rare
			if(Random.value > .3) {
				Instantiate(smokePillow, muzzleEmitter.position, projectileEmitter.rotation ); 			
			}	
			else
				Instantiate(smokeRing, muzzleEmitter.position, projectileEmitter.rotation ); 
		}
					
		//FLASH	
		muzzleFlash.GetComponent(MuzzleFlash).enabled = true;
		//SMOKE
		muzzleSmoke.GetComponent(ParticleSystem).Play();
		muzzleSmoke2.GetComponent(ParticleSystem).Play();
		//SOUND
		gameObject.audio.clip = cannonBoom;
		gameObject.audio.Play();
		
		globalFog.fogNearTarget -= 5;
}