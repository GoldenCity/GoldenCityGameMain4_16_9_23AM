#pragma strict


var mount : Transform;
var bullet : Transform;
var turret : Transform;

function Start()
{
	Wait();
}


function Wait()
{

yield WaitForSeconds (1.0);

//Instantiate(bullet, mount.position, Quaternion.Euler(mount.rotation.x,mount.rotation.y,0));

Instantiate(bullet, mount.position, mount.rotation);


delayForWait();

}

function delayForWait()
{

Wait();

}