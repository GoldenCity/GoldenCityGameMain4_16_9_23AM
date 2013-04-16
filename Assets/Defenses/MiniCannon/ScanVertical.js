#pragma strict

function Start () {

}

function Update () {
	
	
	
	transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup*4) * 25, Mathf.Sin(Time.realtimeSinceStartup) * 70, 0); 
	

//	if(Input.GetKeyDown("a"))
//		renderer.material.color = Color.red;

}