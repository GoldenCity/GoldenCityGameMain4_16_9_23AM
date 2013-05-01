#pragma strict

var _camera  : Camera;
var _xAdjust : int = 0;
var _yAdjust : int = 0;
var _zAdjust : int = 0;

function Start () {
	_zAdjust = transform.position.z;
}

function Update () {
	//based on the "Souls Collected: " GUI Label placement in Script_Hud
	var p : Vector3 = _camera.ScreenToWorldPoint (Vector3 ( Screen.width-(Screen.width/(4.0+_xAdjust)), Screen.height-(Screen.height/(80.0)+_yAdjust), _zAdjust));
	print(p);
	transform.position = p;
	


}