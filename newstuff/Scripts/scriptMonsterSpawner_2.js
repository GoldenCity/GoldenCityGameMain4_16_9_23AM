#pragma strict
//Monster Spawner script

//Inspector variables
var waitTime	: float = 3.0; 	//time between enemy spawn events
var lineSize	: int 	= 3;	//number of enemies spawned in a line
var fileSize	: int 	= 1; 	//number of enemies spawned in a single file line
var enemySpacing: float	= 3;	//space between units spawned in a line
var enemy 		: Transform;	//Transform for enemies to spawn
var spawnPoint 	: Transform;	//Point where enemy tranfsorm starts from
//var gameTime 	: int = Mathf.RoundToInt(Time.time);

//
function Start () 
{
	
	InvokeRepeating("SpawnEnemy", waitTime, waitTime);	//invoke SpawnEnemy every waitTime seconds

}


function Update ()
{
	if(Time.time > 90) lineSize = 4;		//simply incease the number after time intervals
	else if(Time.time > 60) lineSize = 3;
	else if(Time.time > 30) lineSize = 2;	
}

//creates groups of enemies
function SpawnEnemy ()
{

	for(var i: int=0;i<lineSize;i++) //spawn a row of enemies
	{
		Instantiate(enemy, spawnPoint.position+Vector3(i*enemySpacing-(lineSize/2*enemySpacing), //enemy X position
														0, 
														0), //enemy Z position
														spawnPoint.rotation);
	}
	waitTime = Random.Range(1.0,15.0); //make the wait between spawns random
	CancelInvoke();
	InvokeRepeating("SpawnEnemy", waitTime, waitTime);	//invoke SpawnEnemy every waitTime seconds
}