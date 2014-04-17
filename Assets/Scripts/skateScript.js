#pragma strict

function Start () {
	character=GameObject.FindGameObjectWithTag("Player");
	scripts=GameObject.FindGameObjectWithTag("Scripts");
	obstacles=GameObject.FindGameObjectWithTag("Obstacles");
	//bike=GameObject.FindGameObjectWithTag("Obstacles").GetComponent("Bike");
	//skate=GameObject.FindGameObjectWithTag("Obstacles").GetComponent("skates");
}
private var character:GameObject;
private var scripts:GameObject;
private var obstacles:GameObject;
private var bike:GameObject;
private var skate:GameObject;
private var objectActive:boolean=true;
var distance=0;
function objectHit(){
	if(objectActive)
	{
		toggle();
		Invoke("toggle", 3);
		bike=obstacles.Find("Bike");
		var cycle:cycleBehaviour=bike.GetComponent("cycleBehaviour");
		cycle.CancelInvoke();
		audio.Play();
		
	}
}
function Update () {
	var hit:RaycastHit;
	if(Physics.Raycast(transform.position,transform.TransformDirection(Vector3.forward),hit)){
		distance=hit.distance;
		if(hit.distance<5)
		{
			
			objectHit();
		}
	}
	else if(Physics.Raycast(transform.position,transform.TransformDirection(Vector3.left),hit)){
		distance=hit.distance;
		if(hit.distance<5)
		{
			objectHit();
		}
	}
	else if(Physics.Raycast(transform.position,transform.TransformDirection(Vector3.right),hit)){
		distance=hit.distance;
		if(hit.distance<5)
		{
			objectHit();
		}
	}
	else if(Physics.Raycast(transform.position,transform.TransformDirection(Vector3.forward)*-1,hit)){
		distance=hit.distance;
		if(hit.distance<5)
		{
			objectHit();
		}
	}
}
function toggle(){
	var script1:Movement=character.GetComponent("Movement");
	var script2:GameGui=scripts.GetComponent("GameGui");
	objectActive=!objectActive;
	script1.skateboardToggle();
	script2.toggleSkatePower();
	
}