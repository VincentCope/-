require.config({
	paths: {
		jquery: 'jquery-1.12.4',
		jqueryUI: 'jquery-ui.min'
	}
});

require(['jquery','window'],function ($,w) {
	$('#btn').click(function () {
		var win = new w.Window();
		win.alert({
			width: 500,
			height: 200,
			//y: 100,
			title: '提示',
			content: 'welcome your coming!',
			alertText: '确定',
			dragHandle: '.alert-title',
			skinClassName: 'redSkin',
			hasCloseBtn: true,
			hasMask: true,
			okHandler: function () {
				alert('You click the ok button!');
			},
			closeHandler: function () {
				alert('You click the close button!');
			}
		}).on('ok',function () {
				alert('You second click the ok button!');
		}).on('close',function () {
				alert('You second close the ok button!');
			});
	});

	$('#confirmbtn').click(function () {
		new w.Window().confirm({
			width: 500,
			height: 200,
			//y: 100,
			title: '系统消息',
			content: '你确定要删除这个文件吗？',
			confirmBtn: '确定',
			cancelBtn: '取消',
			dragHandle: '.alert-title',
			skinClassName: 'redSkin'
		}).on('confirm',function () {
				alert('确定');
		}).on('cancel',function () {
				alert('取消');
			});
	});

	$('#prompt').click(function () {
		new w.Window().prompt({
			width: 500,
			height: 200,
			//y: 100,
			title: '请输入姓名',
			defaultPromValue: '张三',
			promSubmitBtn: '确定',
			promCancelBtn: '取消',
			dragHandle: '.alert-title',
			skinClassName: 'redSkin'
		}).on('promSubmit',function (inputValue) {
				alert('您输入的是'+inputValue);
		}).on('promCancel',function () {
				alert('取消');
			});
	});

	$('#commen').click(function (){
		new w.Window().commen();
	});
    
});