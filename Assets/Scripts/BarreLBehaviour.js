#pragma strict
var player : Transform;
var speed: int=10;
var gravity=20.0;
 
function Update () {

		Chase();
			transform.Rotate(10,0,0);

}

function Chase()
{
	var moveSpeed:Vector3;
	var enemy=GetComponent(CharacterController);
	if(enemy.isGrounded)
	{
		var delta=player.transform.position-transform.position;
		delta.y=0;
		delta.Normalize();
		transform.forward=delta;
		 moveSpeed=delta*speed;	
	}
	moveSpeed.y-=gravity*Time.deltaTime;
	enemy.Move(moveSpeed*Time.deltaTime);

}