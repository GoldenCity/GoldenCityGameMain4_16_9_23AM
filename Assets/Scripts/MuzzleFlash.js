//	http://wiki.unity3d.com/index.php?title=Animating_Tiled_texture_-_Extended#JavaScript_-_AnimatedTextureExtendedUV.js
//   
//    colCount: the total number of columns in the animation cell-sheet;
//    rowCount: the total number of rows in the animation cell-sheet;
//    rowNumber: the row where this animation will start;
//    colNumber: the column where this animation will start;
//    totalCells: the number of cells in this animation;
//    fps: the number of cells (frames) per second the animation will play; 


//vars for the whole sheet
var colCount	: int =  4;
var rowCount	: int =  4;
 
//vars for animation
var rowNumber	: int =  0; //Zero Indexed
var colNumber	: int =  0; //Zero Indexed
var totalCells	: int =  4;
var fps		: int = 10;
var playOnce	: boolean = false; //After playing, the script and renderer attached to the GO will be dissabled
var lights 		: GameObject[];
var lightsOn 	: int = 1;
var lightsOff 	: int = 3;
private var offset	: Vector2;  
private var timeOffset : float;
function Start () {
	gameObject.renderer.enabled = false;
	enabled = false;
	LightFX(false);
}
 
//Update
function Update () { SetSpriteAnimation(colCount,rowCount,rowNumber,colNumber,totalCells,fps);  }
 
//SetSpriteAnimation
function SetSpriteAnimation(colCount : int,rowCount : int,rowNumber : int,colNumber : int,totalCells : int,fps : int){
 	
	// Calculate index
	var index : int;

	index = (Time.time-timeOffset) * fps;
			
	// Repeat when exhausting all cells
	index = index % totalCells;

 
	// Size of every cell
	var size = Vector2 (1.0 / colCount, 1.0 / rowCount);
 
	// split into horizontal and vertical index
	var uIndex = index % colCount;
	var vIndex = index / colCount;
 
	// build offset
	// v coordinate is the bottom of the image in opengl so we need to invert.
	offset = Vector2 ((uIndex+colNumber) * size.x, (1.0 - size.y) - (vIndex+rowNumber) * size.y);
 
	renderer.material.SetTextureOffset ("_MainTex", offset);
	renderer.material.SetTextureScale  ("_MainTex", size);
	
	//LIGHTS
	if (index == lightsOn)
		LightFX(true);
	if (index == lightsOff)
		LightFX(false);
	
	//PLAY ONCE
	if (playOnce && index+1 >= totalCells){
		LightFX(false);
		gameObject.renderer.enabled = false;
		enabled = false;	
	}
	
}

function OnEnable () {
	gameObject.renderer.enabled = true;
	timeOffset = Time.time;
	transform.localEulerAngles.y = Random.value*360;
}

function LightFX (l : boolean) {
	for (var i = 0; i < lights.length; i++){
		lights[i].light.enabled = l;
	}
}