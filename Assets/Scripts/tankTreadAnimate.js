#pragma strict

var scrollSpeed : float = .5;//determins the speed of tread movement relative to spatial movement
var texOffset : float = 0;
var trackTarget : Transform; //object to track movement through space-- Use the middle wheel_mount on the this tread's side


function Update() {    
	var scrollMin = -0.07373; 
	var scrollMax =  0.0625;

	texOffset = (trackTarget.position.z)
				*scrollSpeed*transform.localScale.x 
				% (scrollMin - scrollMax)-scrollMax;     
				
    gameObject.renderer.material.mainTextureOffset = Vector2 (0, texOffset);
}