#pragma strict
var _number : int = 0;
function Start () 
{

}

function Update () 
{
	transform.position.x = Mathf.Sin(Time.realtimeSinceStartup) * _number;
}