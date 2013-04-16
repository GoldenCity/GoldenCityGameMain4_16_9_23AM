
#pragma strict

//select camera script
//http://answers.unity3d.com/questions/14381/main-camera-switch.html
/*
You can activate and deactivate cameras if you can get a hold of the object that holds them.

//cameraObject is the gameObject which holds the camera

cameraObject.camera.active = false;

So If you had a script which kept track of all the cameras in your scene then you could switch cameras easily. For example here is a function which would go through an array of camera objects and turn a certain one on (based on the index sent to it).

var cameras : GameObject[]; 

function SelectCamera (index : int) {
    for (var i : int=0 ;i<wcameras.length; i++) {
    // Activate the selected camera
        if (i == index){
            cameras[i].camera.active = true;
    // Deactivate all other cameras
        }else{
        cameras[i].camera.active = false;
    }

}

You could use this function by calling it with a message

BroadcastMessage ("SelectCamera", 1);

or by outright calling it

SelectCamera(1);

You just need to get hold of the instance of the script it's in
*/

var cameras : GameObject[]; 

function Start () {

}

function Update () {

}


/*
function SelectCamera (index : int) {
    for (var i : int=0 ;i<cameras.length; i++) 
    {
    // Activate the selected camera
        if (i == index)
        {
            cameras[i].camera.active = true;
        }
    // Deactivate all other cameras
        else
        {
        cameras[i].camera.active = false;
    	}
	}
}
*/

/*
Assets/Scripts/scriptCameraSelect.js(57,31): BCW0012: 
WARNING: 'UnityEngine.Component.active' is obsolete. 
the active property is deprecated on components. 
Please use gameObject.active instead. 
If you meant to enable / disable a single component use enabled instead.
*/

