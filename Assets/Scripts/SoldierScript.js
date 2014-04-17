#pragma strict
var player : Transform;
var speed: int=10;
var gravity=20.0;
private var _animation : Animation;
var animation_jump:AnimationClip;

function Start () {

}

function Update () {
	_animation = GetComponent(Animation);
	_animation[animation_jump.name].speed=1.5;
	_animation.CrossFade(animation_jump.name);
		Chase();
			
}
function Chase()
{
	var moveSpeed:Vector3;
	var enemy=GetComponent(CharacterController);
	//if(enemy.isGrounded)
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