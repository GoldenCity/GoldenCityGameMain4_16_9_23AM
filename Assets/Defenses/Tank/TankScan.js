#pragma strict

var rotate = 2;


function Update () 
{
	//transform.rotation = Quaternion.Euler(0, rotate , 0); 
	
	transform.rotation = Quaternion.Euler( 0, (Mathf.Sin(Time.realtimeSinceStartup) * 25), 0);
	
//	if(Input.GetKeyDown("a"))
//		renderer.material.color = Color.red;

}

function RotateRight ()
{
	rotate++;
}

function RotateLeft ()
{
	rotate--;
}