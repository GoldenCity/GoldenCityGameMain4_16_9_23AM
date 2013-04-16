#pragma strict

// Fades from minimum to maximum in one second


var minimum = 10.0;
var maximum = 20.0;
var timeStart = 1;
var timeTake = 2.0;
var delta = 0.0;

function Start ()
{
	
}
function Update () {
	print(Time.time + " + " + delta/timeTake + " + " + transform.position);
	
    transform.position = Vector3(Mathf.Lerp(minimum, maximum, ((delta-timeStart)/timeTake)), 0, 0);
    if (delta/timeTake >= 1.0) print("Here");
    delta += Time.deltaTime;
}