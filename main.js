(function($){
	var opction={//设置默认参数
		bColor:"green",
		oldColor:"white",
		textColor:"white",
		oldtxtColor:"#767C8A",
		len:10,
		max:50,
		btncallback:function(data){},
		cssparent:""
	}
	var on_off=true;
	var $parent;
	var setting={}//设置空对象用于盛放目标参数与默认参数的合体；
	function fn(obj){
		$parent=this;
		$.extend(setting,opction,obj);
		if(!setting.csspatent){
			var link=$('<link rel="stylesheet" type="text/css" href="css.css"/>')
		}else{
			var link=$('<link rel="stylesheet" type="text/css" href="'+setting.cssparent+'/css.css"/>')
		}

		$('head').append(link);//动态生成link标签
		setbtn();
		setevent();
	}
	
	function setbtn(){//动态创建标签 
		var str="";
		var minnum=Math.min(setting.len,setting.max);
		if(setting.max<setting.len){
			on_off=false;
		}
		if(on_off){
			str+='<a href="javascript:;" class="prev mybtn">1</a>'+
			'<a href="javascript:;" class="prev mybtn">...</a>';
		}
		
		for(var i=0;i<minnum;i++){
			str+='<a href="javascript:;" class="mid mybtn">'+(i+1)+'</a>'
		}
		
		if(on_off){
			str+='<a href="javascript:;" class="nex mybtn">...</a>'+
			'<a href="javascript:;" class="nex mybtn">'+setting.max+'</a>';
		}
		
		$parent.html(str);
		$(".prev").css({"display":"none"});
		$(".mid").css({"backgroundColor":setting.oldColor,"color":setting.oldtxtColor});
		$(".mid").eq(0).css({"backgroundColor":setting.bColor,"color":setting.textColor});
	}
	
	function setevent(){//给input标签添加点击事件
		$(".mid,.prev:eq(0),.nex:eq(1)").click(function(){
			if(on_off){
				var thisnum=$(this).html();
				var midnum=$(this).html();
				var delnum=4;
				if(midnum<=setting.len/2){
					midnum=setting.len/2;
					$(".prev").css({"display":"none"});
					$(".nex").css({"display":"inline-block"});
				}else if(midnum>=setting.max-5){
					$(".prev").css({"display":"inline-block"});
					$(".nex").css({"display":"none"});
					midnum=setting.max-5;
				}else{
					$(".prev").css({"display":"inline-block"});
					$(".nex").css({"display":"inline-block"});
				}
				
				$(".mid").each(function(i,ele){
					var newnum=midnum-delnum;
					delnum--;
					$(ele).html(newnum);
				})
				$(".mid").each(function(i,ele){
					if(thisnum==$(ele).html()){
						$(ele).css({"backgroundColor":setting.bColor,"color":setting.textColor});
					}else{
						$(ele).css({"backgroundColor":setting.oldColor,"color":setting.oldtxtColor})
					}
				})
			}
			function suc(num){
				setting.btncallback&&setting.btncallback(num);
			}
			suc($(this).html());
		})
	}
	$.fn.extend({
		fullbtn:fn
	})
})(jQuery)
