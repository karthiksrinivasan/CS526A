#pragma strict
private var invert:int;
function Start () {
	invert=1.5;
	swipeTolarance=70;
	collisionTolarance=25;
	characterState=1;
	jumpSpeed=6;
	var controller : CharacterController = GetComponent(CharacterController);
	height=controller.height;
	slideTimer=2;
	isSliding=false;
}
var speed : float = 6.0;
private var swipeTolarance: int;
private var characterState:float; // 1-Running, 1.5-Skateboard, 2- Bicycle
var jumpSpeed : float = 1.0;
var gravity : float = 40.0;
var animation_jump:AnimationClip;
var animation_run:AnimationClip;
private var collisionTolarance: int;
var scripts:GameObject;
private var height:float;
private var _animation : Animation;
private var fp:Vector2;
private var lp:Vector2;
var a:int;
var isSliding:boolean;
private var slideTimer:float;
private var moveDirection : Vector3 = Vector3.zero;
function invertAxis(){
	invert*=-1;
}
function Update() {
	var scriptss:GameGui=scripts.GetComponent("GameGui");

	if(transform.position.x>500 && transform.position.x<520 && transform.position.z>-200 && transform.position.z<-170){
		scriptss.levelOverS();
		return;
	}
	var controller : CharacterController = GetComponent(CharacterController);
	var h=height;
	_animation = GetComponent(Animation);
	if (controller.isGrounded) {
	a=Input.acceleration.x;
	moveDirection = Vector3(Input.acceleration.x*invert, 0,
	                        characterState*scriptss.getStamina());
	if(Input.GetKey(KeyCode.LeftArrow) ) // up swipe
    {
         moveDirection.x-=invert;        	
    }
    if(Input.GetKey(KeyCode.RightArrow) ) // up swipe
    {
         moveDirection.x+=invert;        	
    }
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= speed;

	if (Input.GetKeyUp (KeyCode.Space) && characterState!=2) {
		moveDirection.y = jumpSpeed;
		_animation[animation_jump.name].speed=1.5;
		_animation.CrossFade(animation_jump.name);
		_animation.CrossFadeQueued(animation_run.name);
	}
		if(Input.GetKeyUp(KeyCode.DownArrow)  && characterState!=2 ) // up swipe
        {
                 	// add your jumping code here
                 	//moveDirection.y = jumpSpeed;
			       isSliding = true;
                 	slideTimer=0;
					_animation[animation_jump.name].speed=3.5;
					_animation.CrossFade(animation_jump.name);
					_animation.CrossFadeQueued(animation_run.name);
       }
       
       
	}
	for (var touch : Touch in Input.touches)
    {
         if (touch.phase == TouchPhase.Began)
         {
               fp = touch.position;
               lp = touch.position;
         }
         if (touch.phase == TouchPhase.Moved )
         {
               lp = touch.position;
         }
         if(touch.phase == TouchPhase.Ended)
         { 
     
               if((fp.x - lp.x) > swipeTolarance) // left swipe
         		{
      				var fwd1 = controller.transform.TransformDirection (Vector3.left);
					if (!Physics.Raycast (controller.transform.position, fwd1, collisionTolarance)) {
						controller.transform.Rotate(0,-90,0);
					}
          		}
          		else if((fp.x - lp.x) < 0-swipeTolarance) // right swipe
          		{
          			var fwd2 = controller.transform.TransformDirection (Vector3.right);
					if (!Physics.Raycast (controller.transform.position, fwd2, collisionTolarance)) {
						controller.transform.Rotate(0,90,0);
					}
          		}
          		else if((fp.y - lp.y) < 0-swipeTolarance  && characterState!=2 ) // up swipe
          		{
                 	// add your jumping code here
                 	if(controller.isGrounded)
                 	moveDirection.y = jumpSpeed;
					_animation[animation_jump.name].speed=1.5;
					_animation.CrossFade(animation_jump.name);
					_animation.CrossFadeQueued(animation_run.name);
          		}
          		else if((fp.y - lp.y) > swipeTolarance  && characterState!=2 ) // up swipe
          		{
                 	// add your jumping code here
                 	//moveDirection.y = jumpSpeed;
			       isSliding = true;
                 	slideTimer=0;
					_animation[animation_jump.name].speed=3.5;
					_animation.CrossFade(animation_jump.name);
					_animation.CrossFadeQueued(animation_run.name);
          		}
     		}
    }
    if(isSliding){
    h = 0.85 * height; // height is crouch height
       slideTimer += Time.deltaTime;
       if (slideTimer > 1)
       {
         isSliding = false;
       }
    }
	// Apply gravit5
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	controller.Move(moveDirection * Time.deltaTime);
	if (Input.GetKeyUp (KeyCode.X)) {
		//controller.transform.RotateAround(Vector3(0,1,0),90*Time.deltaTime);
		var fwd3 = controller.transform.TransformDirection (Vector3.right);
		if (!Physics.Raycast (controller.transform.position, fwd3, collisionTolarance)) {
					controller.transform.Rotate(0,90,0);
		}
		
	}
	if (Input.GetKeyUp (KeyCode.Z)) {
		var fwd4 = controller.transform.TransformDirection (Vector3.left);
		if (!Physics.Raycast (controller.transform.position, fwd4, collisionTolarance)) {
					controller.transform.Rotate(0,-90,0);
		}
	}
	var oldheight=controller.height;
	controller.height = Mathf.Lerp(controller.height, h, 5 * Time.deltaTime);
	transform.position.y += (controller.height - oldheight) / 2; // fix vertical position
}
function bicycleToggle(){
	if(characterState!=2)
		characterState=2;
	else{
		characterState=1;
	}
}
function skateboardToggle(){
	if(characterState!=1.5)
		characterState=1.5;
	else{
		characterState=1;
	}
}
	