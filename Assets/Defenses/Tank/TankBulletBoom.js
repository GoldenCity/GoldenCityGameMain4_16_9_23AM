#pragma strict

function Start ()

	{
		yield WaitForSeconds (3.0);
		Die();
	}
function Die()
{
Destroy (gameObject);
}

/*

#pragma strict

function Start ()

	{
		yield WaitForSeconds (3.0);
		Die();
	}
function Die()
{
Destroy (gameObject);
}

*/