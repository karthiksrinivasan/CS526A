#pragma strict
import System.IO;

private var pGUI:GUITexture;
private var timeup:GUITexture;
private var tootired:GUITexture;
private var levelover:GUITexture;

private var minute:int;
private var seconds:int;
var guiskin:GUISkin;
var stamina:float;
private var texture:Texture2D;
private var winePower:boolean;
private var cyclePower:boolean;
private var skatePower:boolean;
private var coinCounter:int;
private var fp : Vector2;  // first finger position
private var lp : Vector2;  // last finger position
function Start () {
	pGUI=GameObject.Find("Paused").guiTexture;
	timeup=GameObject.Find("timeup").guiTexture;
	tootired=GameObject.Find("tootired").guiTexture;
	levelover=GameObject.Find("levelover").guiTexture;
	pGUI.enabled=false;
	timeup.enabled=false;
	tootired.enabled=false;
	winePower=false;
	cyclePower=false;
	skatePower=false;
	stamina=1.0;
	minute=2;
	seconds=0;
	coinCounter=0;
	levelover.enabled=false;
	InvokeRepeating("decreaseTime",1,1);
	InvokeRepeating("decreaseStamina",.1,.1);
	guiskin.label.fontSize=Screen.width/20;
	var texturee:GUITexture;
	texturee=GameObject.Find("cointexture").guiTexture;
	texturee.pixelInset.x=-1*Screen.width/.9;
	texturee.pixelInset.y=-1*Screen.height/13;
	texturee.pixelInset.height=Screen.width*.2;
	texturee.pixelInset.width=Screen.width*.2;
	texturee.enabled=true;
	texturee=GameObject.Find("cycle").guiTexture;
	texturee.pixelInset.x=-1*Screen.width/3;
	texturee.pixelInset.y=-1*Screen.height/16;
	texturee.pixelInset.height=Screen.width*.2;
	texturee.pixelInset.width=Screen.width*.2;
	texturee.enabled=cyclePower;
	texturee=GameObject.Find("skateboard").guiTexture;
	texturee.pixelInset.x=-1*Screen.width/2.5;
	texturee.pixelInset.y=-1*Screen.height/13;
	texturee.pixelInset.height=Screen.width*.2;
	texturee.pixelInset.width=Screen.width*.2;
	texturee.enabled=skatePower;
	texturee=GameObject.Find("wine").guiTexture;
	texturee.pixelInset.x=-1*Screen.width/3;
	texturee.pixelInset.y=-1*Screen.height/13;
	texturee.pixelInset.height=Screen.width*.2;
	texturee.pixelInset.width=Screen.width*.2;
	texturee.enabled=winePower;


}

function Update () {
	if(Input.GetKey(KeyCode.Escape))
		Application.LoadLevel(0);
	
}
function OnGUI(){
	GUI.skin=guiskin;
	var width=Screen.width*.15;
	if(width>Screen.height*.15)
		width=Screen.height*.15;
	if(GUI.Button(Rect(Screen.width*.85,Screen.height*0,width,width),Resources.Load("pause") as Texture))
	{
		if(!timeup.enabled && !tootired.enabled && !levelover.enabled){
			pGUI.enabled=!pGUI.enabled;
		if(pGUI.enabled==true)
			Time.timeScale=0.0;
		else
			Time.timeScale=1.0;
		}
	
	}
	var secondss;
	if(seconds<10)
		secondss="0"+seconds;
	else secondss=seconds+"";
	if(Time.timeScale!=0)
	{
		Destroy(texture);
		texture=createTexture(((Screen.width*.6-30)*stamina), ((Screen.height*.03-30)),new Color((1-stamina),stamina,0));
	}
	GUI.Label(Rect(Screen.width*.05,Screen.height*.03,Screen.width*.1,Screen.height*.03),minute+":"+secondss);
	//GUI.DrawTexture(Rect(Screen.width*0,Screen.height*.86,Screen.width*.2,Screen.height*.14),cointexture,ScaleMode.StretchToFill, false, 10.0f);

	GUI.Label(Rect(Screen.width*.2,Screen.height*.86,Screen.width*.2,Screen.height*.14),coinCounter+"");

	GUI.Box(new Rect(Screen.width*.2,Screen.height*.03,Screen.width*.6,Screen.height*.03),"");
	//GUI.Box(new Rect(Screen.width*.2+15,Screen.height*.03+15,(Screen.width*.6-30)*stamina,(Screen.height*.03-30)),texture);
	//texture.alphaIsTransparency
	GUI.DrawTexture(Rect(Screen.width*.2+15,Screen.height*.03+15,(Screen.width*.6-30)*stamina,(Screen.height*.03-30)), texture, ScaleMode.ScaleAndCrop, false, 10.0f);
	var texturee:GUITexture;
	texturee=GameObject.Find("cointexture").guiTexture;

	texturee.enabled=true;
	texturee=GameObject.Find("cycle").guiTexture;
	texturee.enabled=cyclePower;
	texturee=GameObject.Find("skateboard").guiTexture;
	texturee.enabled=skatePower;
	texturee=GameObject.Find("wine").guiTexture;
	texturee.enabled=winePower;
	
//	if(winePower==true){
//		
//		GUI.DrawTexture(Rect(Screen.width*.8,Screen.height*.86,Screen.width*.2,Screen.height*.14),winetexture,ScaleMode.StretchToFill, false, 10.0f);
//	}
//	if(cyclePower==true)
//		GUI.DrawTexture(Rect(Screen.width*.8,Screen.height*.72,Screen.width*.2,Screen.height*.14),cycletexture,ScaleMode.StretchToFill, false, 10.0f);
//	if(skatePower==true)
//		GUI.DrawTexture(Rect(Screen.width*.6,Screen.height*.86,Screen.width*.2,Screen.height*.14),skatetexture,ScaleMode.StretchToFill, false, 10.0f);
	
	//if(coinCounter==21){
	//	coinCounter=0;
	//}


	//var box:Rect=new Rect(Screen.width*.8,Screen.height*.3,Screen.width*.1,Screen.height*.5);
	//GUI.DrawTexture(box,barTexture);

}

function decreaseTime(){
	if(seconds==0)
	{
		if(minute==0){
			//time up
			timeup.enabled=true;
			Time.timeScale=0.0;
		} else{ 
			minute--;
			seconds=59;
		}
	}
	else seconds--;
}
function applePower(){
	stamina+=.5;
	if(stamina>1)
		stamina=1;
}
function cocPower(){
	stamina+=.3;
	if(stamina>1)
		stamina=1;

}
function decreaseStamina()
{
	if(winePower==false){
		if(stamina>0)
			stamina=stamina-.001;
		else{
			stamina=0;
			tootired.enabled=true;
			Time.timeScale=0.0;
		}
	}
}
function createTexture(width:int,height:int,color:Color){
	var pixcolor:Color[]=new Color[1];
	var i:int;
	var widths:int=width;
	var heights:int=height;
	for(i=0;i<pixcolor.length;i++)
		pixcolor[i]=color;

	var texture:Texture2D=Texture2D(1,1);
	texture.SetPixels(pixcolor);
	texture.Apply();
	return texture;
}
function SaveTextureToFile( texture: Texture2D,fileName)
 {
    var bytes=texture.EncodeToPNG();
    var file = new File.Open(Application.dataPath + "/"+fileName,FileMode.Create);
    var binary= new BinaryWriter(file);
    binary.Write(bytes);
    file.Close();
 }
 function toggleWinePower(){
 	winePower=!winePower;
 }
 function toggleCyclePower(){
 	cyclePower=!cyclePower;
 	skatePower=false;
 }
  function toggleSkatePower(){
 	skatePower=!skatePower;
 	cyclePower=false;
 }
 function incrementCoin(){
 	coinCounter++;
 }
 function getStamina(){
 	return stamina;
 }
 function levelOverS(){
 	levelover.enabled=true;
 	Time.timeScale=0.0;
 }