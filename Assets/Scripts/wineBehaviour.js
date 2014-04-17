#pragma strict
function Start () {
	character=GameObject.FindGameObjectWithTag("Player");
	scripts=GameObject.FindGameObjectWithTag("Scripts");
	wineBottle=GameObject.FindGameObjectWithTag("Obstacles").Find("wineBottle");
	//bike=GameObject.FindGameObjectWithTag("Obstacles").GetComponent("Bike");
	//skate=GameObject.FindGameObjectWithTag("Obstacles").GetComponent("skates");
}
private var character:GameObject;
private var scripts:GameObject;
private var wineBottle:GameObject;
private var objectActive:boolean=true;
var distance=0;
function objectHit(){
	if(objectActive)
	{
		toggle();
		audio.Play();
		Invoke("toggle", 3);
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
	script1.invertAxis();
	script2.toggleWinePower();
	
}