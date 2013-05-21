var timeActive : int = 0;

var pitchTweak : boolean = false; //hack to vary audio pitch attached to particle effect GO
var tweakDivisor : float = 5; //smaller -> bigger variations (never set to 0)

function Start () {
	if(pitchTweak)
		audio.pitch = 1 + (Random.value-.5)/tweakDivisor;
		
	Destroy(gameObject, timeActive);
}

function Update () {

}