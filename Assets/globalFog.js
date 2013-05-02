#pragma strict

static var fogFar 	: float;
static var fogNear 	: float;

private var fogFarStart 	: float;
private var fogNearStart 	: float;

private var fogFarLast 	: float;
private var fogNearLast : float;

function Start () {
	fogFarStart = RenderSettings.fogEndDistance;
	fogNearStart = RenderSettings.fogStartDistance;
	fogNear = fogNearStart;
	fogFar = fogFarStart;
}

function Update () {
	fogNear = Mathf.Clamp(fogNear,-100,200);
	fogFar  = Mathf.Clamp(fogFar,150,270);
	if(fogNear >= fogFar)
		fogFar += fogFar-fogNear;
		
	if (fogFar > RenderSettings.fogEndDistance && fogFar > fogFarStart)
		RenderSettings.fogEndDistance += (fogFar/fogFarLast)*.1;
	
	if (fogNear > RenderSettings.fogStartDistance && fogNear > fogNearStart)
		RenderSettings.fogStartDistance += (fogNear/fogNearLast)*.1;

				
								
	fogFarLast = RenderSettings.fogEndDistance;
	fogNearLast = RenderSettings.fogStartDistance;
}