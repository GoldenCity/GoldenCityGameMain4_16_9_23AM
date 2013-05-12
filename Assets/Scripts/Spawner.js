#pragma strict

class Wave {
	public var total			: int;
	public var harpy 			: int;
	public var cyclops 			: int;
	public var batteringRam 	: int;
	public var manticore 		: int;
	public var gruntBoar 		: int;
	public var nemeanLion 		: int;	

	function Wave() {
		this.total = 0;
		this.harpy 				 = 0;
		this.cyclops 			 = 0;
		this.batteringRam 		 = 0;
		this.manticore 			 = 0;
		this.gruntBoar 			 = 0;
		this.nemeanLion 		 = 0;		
	}
	
	function Wave(harpy:int, cyclops:int, batteringRam:int, 
		manticore:int, gruntBoar:int, nemeanLion:int) {
		this.harpy 				= harpy;
		this.cyclops 			= cyclops;
		this.batteringRam 		= batteringRam;
		this.manticore 			= manticore;
		this.gruntBoar 			= gruntBoar;
		this.nemeanLion 		= nemeanLion;
		
		this.total = this.harpy + this.cyclops + this.batteringRam + 
						this.manticore + this.gruntBoar + this.nemeanLion;	
	}
}

var waves 						= new Wave[100];
var enemyList 					= new Transform[6];
var pathList 					= new Transform[4];
var harpySpawnList 				= new Transform[4];

var waveList : int[];
var currentWave : int;
private var enemyNum : int = 1;
private var num = 0;
var waveCount               : int = 0;
private var harpy 			: int = 0;
private var cyclops 		: int = 1;
private var batteringRam 	: int = 2;
private var manticore 		: int = 3;
private var gruntBoar 		: int = 4;
private var nemeanLion 		: int = 5;

var harpyTime = 3;
private var harpyTimer = 4.1;

var cyclopsTime = 25;
private var cyclopsTimer = 4.1;

var ramTime = 20;
private var ramTimer = 4.1;

var lionTime = 10;
private var lionTimer = 4.1;

var spawnAsWaves : boolean = true;


function Start () {
	pathList[0] = GameObject.Find("PathA").transform;
	pathList[1] = GameObject.Find("PathB").transform;
	pathList[2] = GameObject.Find("PathC").transform;
	pathList[3] = GameObject.Find("PathD").transform;
	
	//               Harpy, Cyclops, 	Ram, 	Manticore, 	Boar, 	Lion
	var w0 = new Wave(10, 	3, 			4, 		0, 			0, 		0);
	
//	waves[0] = w0;
	
	
	StartWave(waves[waveCount]);	
}

function StartWave(wave:Wave) {
	waveList = new int[wave.total];
	
	var index : int = 0;
	for (var i = 0; i < wave.harpy; i++) {
		waveList[index] = harpy;
		index++;	
	}
	for (var j = 0; j < wave.cyclops; j++) {
		waveList[index] = cyclops;
		index++;	
	}
	for (var k = 0; k < wave.batteringRam; k++) {
		waveList[index] = batteringRam;
		index++;	
	}
	for (var l = 0; l < wave.manticore; l++) {
		waveList[index] = manticore;
		index++;	
	}
	for (var m = 0; m < wave.gruntBoar; m++) {
		waveList[index] = gruntBoar;
		index++;	
	}
	for (var n = 0; n < wave.nemeanLion; n++) {
		waveList[index] = nemeanLion;
		index++;	
	}
	
	Randomize(waveList);
	
	if (spawnAsWaves == true) {
		SpawnEnemy();
	}	
}

function Update () {
	if(Input.GetKeyUp("p")) {
		//SpawnEnemy();
		Spawn(enemyNum);
	}
	if(Input.GetKey("0") || Input.GetKey("[0]")) {
		enemyNum = harpy;
	}
	if(Input.GetKey("1") || Input.GetKey("[1]")) {
		enemyNum = cyclops;
	}
	if(Input.GetKey("2") || Input.GetKey("[2]")) {
		enemyNum = batteringRam;
	}
	if(Input.GetKey("3") || Input.GetKey("[3]")) {
		enemyNum = manticore;
	}
	if(Input.GetKey("4") || Input.GetKey("[4]")) {
		enemyNum = gruntBoar;
	}
	if(Input.GetKey("5") || Input.GetKey("[5]")) {
		enemyNum = nemeanLion;
	}
			
	
}

function FixedUpdate() {
	if (spawnAsWaves == false) {
		SpawnEnemy();
	}
}

function SpawnEnemy () {
	if (spawnAsWaves == true) {	
	
	for (var i = 0; i < waveList.Length; i++) {
		
//		yield WaitForSeconds (1);
		if (i == (waveList.length - 1))
			{
			yield WaitForSeconds(20);
			waveCount++;
			i = 0;
			StartWave(waves[waveCount]);
			}
		
		if ( waveList[i] == harpy ) {
									yield WaitForSeconds (1);
									Instantiate(enemyList[harpy], harpySpawnList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
									}	
		if ( waveList[i] == cyclops )
									{
									yield WaitForSeconds (10);
									Spawn(cyclops);	
									}	
		if ( waveList[i] == batteringRam )
									{
									yield WaitForSeconds (5);
									Spawn(batteringRam);
									}		
		if ( waveList[i] == manticore )
									{
									yield WaitForSeconds (15);
									Spawn(manticore);
									yield WaitForSeconds (10);
									}
		if ( waveList[i] == gruntBoar )
									{
									yield WaitForSeconds (2);
									Spawn(gruntBoar);
									}		
		if ( waveList[i] == nemeanLion )
									{
									Spawn(nemeanLion);
									yield WaitForSeconds (2);
									}
//		waveCount++;			
	}
	
	}
	else {
	
	
	harpyTimer += Time.deltaTime;
	cyclopsTimer += Time.deltaTime;
	ramTimer += Time.deltaTime;
	lionTimer += Time.deltaTime;
	
	if (harpyTimer >= harpyTime) {
		Instantiate(enemyList[harpy], harpySpawnList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		harpyTimer = 0.0;
	}		
	
	if (cyclopsTimer >= cyclopsTime) {
		Spawn(cyclops);		
		cyclopsTimer = 0.0;
	}
	
	if (ramTimer >= ramTime) {
		Spawn(batteringRam);		
		ramTimer = 0.0;
	}
	
	if (lionTimer >= lionTime) {
		Spawn(nemeanLion);		
		lionTimer = 0.0;
	}
	
	}	
}

function Spawn(num : int) {
	var path = pathList[Random.Range(0.0, 4.0)];
	if (path.GetComponent(SpawnPoint).valid == true) {
		Instantiate(enemyList[num], path.position, Quaternion.identity);
	}else {
		print("Respawning");
		WaitForSeconds(3);
		//Instantiate(enemyList[num], path.position, Quaternion.identity);
		//Spawn(num);
	}	
}

static function Randomize(arr : int[])
{
    for (var i = arr.Length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}