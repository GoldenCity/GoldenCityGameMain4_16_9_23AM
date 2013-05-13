#pragma strict

var s1 : ParticleEmitter; 
var s2 : ParticleEmitter;
var g1 : GameObject;
var g2 : GameObject;

var on : float = .5;
var wait: float = 3;

function Start () {
	Furt();
}
	

function Furt () {
while(-1<Time.time){
	s1.emit = true;
	s2.emit = true;
	//g1.particleEmitter.emit = true;
	//g2.particleEmitter.emit = true;
	yield WaitForSeconds(on);
    s1.emit = false;
	s2.emit = false;
	yield WaitForSeconds (wait);
	}
}