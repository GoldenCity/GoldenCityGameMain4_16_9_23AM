#pragma strict
var amount : int = 60;

function Start () {

}

function Update () {
	transform.position.z += Mathf.Sin(Time.time * 2) * Time.deltaTime  * amount;
}