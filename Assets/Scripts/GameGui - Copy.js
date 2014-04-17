#pragma strict
import System.IO;
var image:Texture;
var pGUI:GUITexture;
var timeup:GUITexture;
var tootired:GUITexture;
var minute:int;
var seconds:int;
var guiskin:GUISkin;
var stamina:float;
var texture:Texture2D;
private var winePower:boolean;
private var fp : Vector2;  // first finger position
private var lp : Vector2;  // last finger position
function Start () {
	pGUI.enabled=false;
	timeup.enabled=false;
	tootired.enabled=false;
	winePower=false;
	stamina=1.0;
	minute=2;
	seconds=0;
	InvokeRepeating("decreaseTime",1,1);
	InvokeRepeating("decreaseStamina",1,1);
	guiskin.label.fontSize=Screen.width/20;
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
	if(GUI.Button(Rect(Screen.width*.85,Screen.height*0,width,width),image))
	{
		if(!timeup.enabled && !tootired.enabled){
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
		texture=createTexture(((Screen.width*.6-30)*stamina), ((Screen.height*.03-30)),new Color((1-stamina),stamina,0.4));
	}
	GUI.Label(Rect(Screen.width*.05,Screen.height*.03,Screen.width*.1,Screen.height*.03),minute+":"+secondss);
	GUI.Box(new Rect(Screen.width*.2,Screen.height*.03,Screen.width*.6,Screen.height*.03),"");
	//GUI.Box(new Rect(Screen.width*.2+15,Screen.height*.03+15,(Screen.width*.6-30)*stamina,(Screen.height*.03-30)),texture);
	GUI.DrawTexture(Rect(Screen.width*.2+15,Screen.height*.03+15,(Screen.width*.6-30)*stamina,(Screen.height*.03-30)), texture, ScaleMode.ScaleAndCrop, false, 10.0f);
	
	if(winePower==true)
		GUI.Box(Rect(Screen.width*.8,Screen.height*.93,Screen.width*.2,Screen.height*.07),"Wine");

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
function decreaseStamina()
{
	if(stamina>0)
		stamina=stamina-.01;
	else{
		tootired.enabled=true;
		Time.timeScale=0.0;
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