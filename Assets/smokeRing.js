#pragma strict
var speed = 10.0;
var growRate = 3.0;
var rotate = 45.0;
function Start () {
	rotate = Random.Range(-rotate, rotate);
	Destroy(gameObject, 12);
}

function Update () {
	transform.Translate(Vector3(0,speed*Time.deltaTime,0) );
	
	transform.localScale.x += growRate*Time.deltaTime;
	//transform.localScale.y += growRate*Time.deltaTime;
	transform.localScale.z += growRate*Time.deltaTime;
	transform.Rotate(0,rotate*Time.deltaTime,0);
	
	speed = speed/1.003;
	growRate = growRate*1.001;
}