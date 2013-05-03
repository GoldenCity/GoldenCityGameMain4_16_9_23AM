#pragma strict

static var fogFarTarget 	: float;
static var fogNearTarget 	: float;
static var fogTarget	 	: float;

private var fogFarStart 	: float;
private var fogNearStart 	: float;

private var fogFarLast 	: float;
private var fogNearLast : float;

var maxDelta = 5.0;

function Start () {
	fogFarStart = RenderSettings.fogEndDistance;
	fogNearStart = RenderSettings.fogStartDistance;
	fogNearTarget = fogNearStart;
	fogFarTarget = fogFarStart;
	
	fogFarLast = fogFarStart;
	fogNearLast = fogNearStart;
	
	InvokeRepeating("Wind", 1, 1);
}

function Update () {

	fogNearTarget = Mathf.Clamp(fogNearTarget,-100,200);
	fogFarTarget  = Mathf.Clamp(fogFarTarget,150,270);
	if(fogNearTarget >= fogFarTarget)
		fogFarTarget += fogFarTarget-fogNearTarget;
		
	RenderSettings.fogEndDistance = Mathf.MoveTowards(fogFarLast, fogFarTarget, maxDelta*Time.deltaTime) ;
	RenderSettings.fogStartDistance = Mathf.MoveTowards(fogNearLast, fogNearTarget, maxDelta*Time.deltaTime) ;
		
//	if (fogFar > RenderSettings.fogEndDistance && fogFar > fogFarStart)
//		RenderSettings.fogEndDistance += (fogFar/fogFarLast)*.1;
//	
//	if (fogNear > RenderSettings.fogStartDistance && fogNear > fogNearStart)
//		RenderSettings.fogStartDistance += (fogNear/fogNearLast)*.1;

	
				
								
	fogFarLast = RenderSettings.fogEndDistance;
	fogNearLast = RenderSettings.fogStartDistance;
}

function AddFog(amt : int) {
	fogFarTarget += amt;
	fogNearTarget += amt;
	
	fogNearTarget = Mathf.Clamp(fogNearTarget,-100,200);
	fogFarTarget  = Mathf.Clamp(fogFarTarget,150,270);
}

function Wind() { //Clear Away the fog over time
	if (fogNearTarget < fogNearStart) {
		fogNearTarget += 5;
		fogNearTarget = Mathf.Clamp(fogNearTarget,-100,200);
	}
	if (fogFarTarget < fogFarStart) {
		fogFarTarget += 5;
		fogFarTarget = Mathf.Clamp(fogFarTarget,150,270);
	}
}