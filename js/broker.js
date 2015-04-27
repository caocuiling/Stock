	/** 
	输出任务  
	*/

(function($) {
$(function() {
  //点击配置商券时就出发更新商券的事件
   function newUpdate(newBrokername,newBrokerweb){
    var newBroker={'newBrokername':encodeURIComponent($.trim(newBrokername)),
    'newBrokerweb':encodeURIComponent($.trim(newBrokername))};
    var arr=new Array();
    arr=$.parseJSON(localStorage['newBroker']);
    arr.push(newBroker);
    localStorage['newBroker']=JSON.stringify(arr);

   }
   function customBroker(){
    $('#customBrokerTable').empty();
      var broker='';
      broker='<tr><th>选择</th><th>证券名称</th><th>web网址</th></tr>';
      //alert(broker);
      var arr=new Array();
      arr=$.parseJSON(localStorage['newBroker']);
      for(var i=0;i<arr.length;i++){
        //alert(broker);
        var data=arr[i];
        var Brokername=decodeURIComponent(data.newBrokername);
        var Brokerweb=decodeURIComponent(data.newBrokerweb);
        broker+='<tr><td><input type="checkbox" class="checkbox2"></td><td>'+Brokername+'</td><td>'+Brokerweb+'</td></tr>';        
        //alert(data);
      }
      //alert(broker);
      $('#customBrokerTable').append(broker);
   }
   
//每次添加之后重新输出所有的
    function newoutputBroker(){
    	$('#setBrokerTable').empty();
    	var broker='';
    	broker='<tr><th>选择</th><th>证券名称</th><th>web网址</th></tr>';
    	//alert(broker);
    	var arr=new Array();
      arr=$.parseJSON(localStorage['newBroker']);
    	for(var i=0;i<arr.length;i++){
    		//alert(broker);
    		var data=arr[i];
        var Brokername=decodeURIComponent(data.newBrokername);
        var Brokerweb=decodeURIComponent(data.newBrokerweb);
        broker+='<tr><td><input type="checkbox" class="checkbox1"></td><td>'+Brokername+'</td><td>'+Brokerweb+'</td></tr>';        
    		//alert(data);
    	}
    	//alert(broker);
    	$('#setBrokerTable').append(broker);
    }
	/** 新任务热键  */
  

  $('#custom').click(function(){
    customBroker();
  });
	$('#addBroker').click(function(){
		var newBrokername=$('#brokername').val();
		var newBrokerweb=$('#brokerweb').val();
		if(newBrokername!==''&&newBrokerweb!==''){
			newUpdate(newBrokername,newBrokerweb);
			newoutputBroker();
			$('#brokername').val('');
			$('#brokerweb').val('');
		}
	});
  $('#removeBorker').click(function(){
    var arr=$.parseJSON(localStorage['newBroker']);
    $('.checkbox1').each(function(){
      if($(this).attr("checked")){
        var removeBorkername=$(this).parent().next().text();
        var tag=0;//标志是否是从循环里跳出来的
        var t=0;//记录在数组中的位置
        //在本地localStorage里找到选择删除的商券
        for(var i=0;i<arr.length;i++){
          var data=arr[i];
          var Brokername=decodeURIComponent(data.newBrokername);
          if(removeBorkername==Brokername){
            t=i;//记录要删除的项在数组的哪里
            tag=1;
            break;//找到则跳出循环
          }
        }
        if(tag){
          arr.splice(t,1);//删除
        }
      }
    });
    localStorage['newBroker']=JSON.stringify(arr);
    newoutputBroker();
  });
  $('#enSure').click(function(){
    var arr=new Array();
    $('.checkbox2').each(function(){
      if($(this).attr("checked")){
        var enBorkername=$(this).parent().next().text();
        var enBorkerweb=$(this).parent().next().next().text();
        var enBorker={'enBorkername':encodeURIComponent(enBorkername),
        'enBorkerweb':encodeURIComponent(enBorkerweb)};
        arr.push(enBorker);
        $(this).attr('checked',false);
      }
    });
    localStorage['enBorker']=JSON.stringify(arr);
    alert('添加完成');
    //测试
    /*
    var arr1=$.parseJSON(localStorage['enBorker']);
    for(var i=0;i<arr1.length;i++){
      var data=arr1[i];
      var enBorkername=decodeURIComponent(data.enBorkername);
      alert(enBorkername);
    }
    */
  });
  //页面加载时就更新自定义商券和配置商券
  $(document).ready(function(){
    //初始化本地存储
    var arr=new Array();
    arr=$.parseJSON(localStorage['newBroker']);
    if(!arr.length){
      localStorage['newBroker']=JSON.stringify(arr);
    }
    customBroker();
    newoutputBroker();
  });
});
})(jQuery);