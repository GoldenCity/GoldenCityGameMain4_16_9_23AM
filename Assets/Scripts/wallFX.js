//thank you: http://www.mikedoesweb.com/2012/camera-shake-in-unity/

private var originPosition:Vector3;
private var originRotation:Quaternion;

var set_shake_decay: float = 0.001;
var set_shake_intensity: float = 0.2; 
var shake_scale : float = 1.0;

var allowRotate: boolean = false;   

var wallState: wallState;
var wallHealthLast: int;

private var shake_decay: float;
private var shake_intensity: float;


function Start () {
	wallHealthLast = wallState.wallHealth;
}

/*  
function OnGUI () {
    if (GUI.Button (Rect (20,40,80,20), "Shake")) {
        Shake();
    }
}
*/

function Update(){
	//WALL DAMAGED
	if(wallState.wallHealth < wallHealthLast){
		var amt =  wallHealthLast - wallState.wallHealth;
		wallHealthLast = wallState.wallHealth;
		Shake(amt);
	}
	
	//WALL HEALTH UP
	if(wallState.wallHealth > wallHealthLast){
		var amtUp =  wallState.wallHealth - wallHealthLast;
		wallHealthLast = wallState.wallHealth;
		HealthUp(amtUp);
	}
	
	//SHAKE EFFECT
    if(shake_intensity > 0){
        transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
        if(allowRotate){
	        transform.rotation =  Quaternion(
	                        originRotation.x + Random.Range(-shake_intensity,shake_intensity)*.1,
	                        originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.1,
	                        originRotation.z + Random.Range(-shake_intensity,shake_intensity)*.1,
	                        originRotation.w + Random.Range(-shake_intensity,shake_intensity)*.1);
	    }
        shake_intensity -= shake_decay;
        
    }
}
 
function Shake(){
    originPosition = transform.position;
    originRotation = transform.rotation;
    shake_intensity = set_shake_intensity;
    shake_decay = set_shake_decay;
   	// shake_intensity = 0.3;
    //shake_decay = 0.001;
}

function Shake(amount : int){
	//print("SHAKE  "+amount);
    originPosition = transform.position;
    originRotation = transform.rotation;
    shake_intensity = amount*shake_scale*.01;
    shake_decay = amount*shake_scale*.0005;
   	// shake_intensity = 0.3;
    //shake_decay = 0.001;
}

function HealthUp (amount : int) {
	//something for here
}