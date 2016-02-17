window.onload=function(){
		var oBlank=document.getElementById('blank');
		var oUl=document.getElementById('text-ul');
		var oInput=document.getElementById('text-input');
		var oArea=oInput.getElementsByTagName('textarea')[0];
		var oBtn=oInput.getElementsByTagName('input')[0];
		var oIcon=document.getElementById('plus-icon');
		var oDate=new Date();
		var iM=oDate.getMinutes();
			if(iM<10){
				iM='0'+iM;
			}else{
				iM=''+iM;
			}
		var iTime=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月'+oDate.getDate()+'日 '+oDate.getHours()+':'+iM;
		
		var iCent=1;
//留言过程				
		function showText(){
			var oSpan=document.createElement('span');
			oSpan.innerHTML=iCent+'楼，'+iTime;

			var oLi=document.createElement('li');
			var aLi=oUl.getElementsByTagName('li');
			oLi.innerHTML='<p>'+oArea.value+'</p>';
			if(oArea.value==''){
				alert('请输入留言');
			}else if(aLi.length){
					oUl.insertBefore(oLi,aLi[0]);
					oLi.appendChild(oSpan);
				}else{
					oUl.appendChild(oLi);
					oLi.appendChild(oSpan);
				}
			oArea.value='';
			iCent++;
			var iHeight=oLi.offsetHeight;
			oLi.style.height=0;
			setMove(oLi,{height:iHeight,'opacity':100});
		};
//提交留言
		oBtn.onclick=function(){
			showText();		
		};
		document.onkeydown=function(ev){
			var oEvent=ev||event;
			if(oEvent.ctrlKey&&oEvent.keyCode==13){
				showText();	
			}
		}
//加号和输入界面运动
		oIcon.onclick=function(ev){
			var oEvent=ev||event;
			setMove(oIcon,{'bottom':210,'opacity':0});
			setMove(oInput,{'bottom':10,'opacity':100});
			oEvent.cancelBubble=true;
		}
		oBlank.onclick=function(){
			setMove(oInput,{'bottom':-205,'opacity':0});
		
			setMove(oIcon,{'bottom':10,'opacity':100});
		}
	}