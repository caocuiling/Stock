	/** 
	输出任务  
	*/
(function($) {
$(function() {
  //点击配置商券时就出发更新商券的事件
   function newUpdate(index,newBrokername,newBrokerweb){
   	localStorage['newBroker_'+index]=JSON.stringify({
      
   		'newBrokername':encodeURIComponent($.trim(newBrokername)),
   		'newBrokerweb':encodeURIComponent($.trim(newBrokername))
   	});
   }
   
//每次添加之后重新输出所有的
    function newoutputBroker(){
    	$('#setBrokerTable').empty();
    	var broker='';
    	broker='<tr><th>选择</th><th>证券名称</th><th>web网址</th></tr>';
    	//alert(broker);
    	
    	for(var i=0;i<localStorage.length;i++){
    		//alert(broker);
    		var data=$.parseJSON(localStorage['newBroker_'+i]);
        var Brokername=decodeURIComponent(data.newBrokername);
        var Brokerweb=decodeURIComponent(data.newBrokerweb);
        broker+='<tr><td><input type="checkbox"></td><td>'+Brokername+'</td><td>'+Brokerweb+'</td></tr>';        
    		//alert(data);
    	}
    	//alert(broker);
    	$('#setBrokerTable').append(broker);
    }
	/** 新任务热键  */
  $("#broker").click(function(){
    //调用newoutputBroker()
    newoutputBroker();
  });
	$('#addBroker').click(function(){
		/*
		for(var i=0;i<localStorage.length-1;i++){
		localStorage.removeItem('newBroker_'+i);	
		}*/
    
		//alert(localStorage.length);
		var newBrokername=$('#brokername').val();
		var newBrokerweb=$('#brokerweb').val();
		if(newBrokername!==''&&newBrokerweb!==''){
			newUpdate(localStorage.length,newBrokername,newBrokerweb);
			newoutputBroker();
			$('#brokername').val('');
			$('#brokerweb').val('');
		}
	});


});
})(jQuery);