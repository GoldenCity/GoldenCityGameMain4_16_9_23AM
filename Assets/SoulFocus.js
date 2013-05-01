#pragma strict

//Script controls placement of SoulFocus relative to screen so it can be lined up whatever the screen size or aspect

var _camera  : Camera;
var _xAdjust : int = 0;
var _yAdjust : int = 0;
var _zAdjust : int = 0;

function Start () {
	_zAdjust = transform.position.z;
}

function Update () {
	//based on the "Souls Collected: " GUI Label placement in Script_Hud
	var p : Vector3 = _camera.ScreenToWorldPoint (Vector3( 
													Screen.width - (Screen.width / (4.0 + (_xAdjust / 10.0) ) ), 
													Screen.height - (Screen.height / (80.0) + _yAdjust), 
													_zAdjust) );
													
	transform.position = p;
}