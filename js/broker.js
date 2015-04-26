	/** 
	输出任务  
	*/
(function($) {
$(function() {
  //点击配置商券时就出发更新商券的事件
   function newUpdate(newBrokername,newBrokerweb){
    var newBroker={'newBrokername':encodeURIComponent($.trim(newBrokername)),
    'newBrokerweb':encodeURIComponent($.trim(newBrokername))}
    var arr=new Array();
    arr=$.parseJSON(localStorage['newBroker']);
    arr.push(newBroker);
    localStorage['newBroker']=JSON.stringify(arr);

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
        broker+='<tr><td><input type="checkbox" class="checkboxs"></td><td>'+Brokername+'</td><td>'+Brokerweb+'</td></tr>';        
    		//alert(data);
    	}
    	//alert(broker);
    	$('#setBrokerTable').append(broker);
    }
	/** 新任务热键  */
  $("#broker").click(function(){
    //localStorage.clear();
    //初始化localStorage
    /*
    var newBroker={'newBrokername':encodeURIComponent('caocuiling'),'newBrokerweb':encodeURIComponent('caocuiling1')};
    var arr=new Array();
    arr.push(newBroker);
    localStorage['newBroker']=JSON.stringify(arr);
    */
    newoutputBroker();
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
    $('.checkboxs').each(function(){
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
});
})(jQuery);