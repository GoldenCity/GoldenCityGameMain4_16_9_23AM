#pragma strict
var _centerPillar : Transform;

var _number : float = 40;

function Start () 
{

}

function Update () 
{
	transform.position.x = _centerPillar.position.x + (Mathf.Sin(Time.time) * _number);
	//print(Time.time);
	//transform.position = Vector3(_candle.position.x + (Mathf.Sin((Time.realtimeSinceStartup) * .5)), _candle.position.y + 2, _candle.position.z);
}