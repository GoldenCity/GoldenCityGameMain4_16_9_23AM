#pragma strict
//cycles through list of cameras on a key press
//Camera must be tagged MainCamera for the raycast in scriptTrackMouseToGround to work!

//inspector vars
var cameras : Camera[]; //array to store camera objects; increase size and add more cams if you like
var activeCam : int = 0; //default cam 0

function Start () 
{
	cameras[0].enabled = true;		//set 0th cam as active
	for(var i=1; i<=cameras.Length-1; i++)
	{	
		cameras[i].enabled = false;	//disable all other cams
	}
}

function Update () 
{

	if (Input.GetKeyDown("c"))
	{
		//print("ChangeCam!" + cameras.Length);
		activeCam++;
		if(activeCam > cameras.Length-1) activeCam = 0;
		for(var i=0; i<=cameras.Length-1; i++)
		{	
			if (i == activeCam)	cameras[i].enabled = true; //activate ith cam
			else cameras[i].enabled = false;	//deactive all other cams
		}
	}

}