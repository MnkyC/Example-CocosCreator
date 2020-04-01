# UI
## Label
文字对齐方式？

	设置Horizontal Align，还要设置Anchor，否则无效
	如靠右对齐，Align为"RIGHT"，Anchor为(1, 0.5)

# 缓存池
## Node对象
cc.NodePool，用于管理节点对象的对象缓存池

实例：子弹，星星，木块等

需要实例化后使用，不同节点需要不同的对象池

	const Star = require('Star');
	this.starPool = new cc.NodePool('Star');
	let newStar = cc.instantiate(this.starPrefab); // 池子没有就新建
	this.starPool.put(star); // 用完就回收
	// get会调用Star类中的reuse方法，this是当前节点，作为参数传递
	let newStar = this.starPool.get(this); 
	this.starPool.size(); // 可用对象数量，get前先判断其>0
	this.starPool.clear(); // 销毁所有节点，游戏结束记得释放
	
	// Star中需要编写reuse方法
	
# 脚本执行顺序
* 使用统一的脚本来初始化和控制其他脚本
* 同一个节点上的脚本可以根据**属性检查器中的排列顺序**来控制，排列在上的组件会优先执行，通过组件**右上角齿轮按钮**中的Move Up和Move Down来调节
* 以上不行就设置组件的**executionOrder，值越小优先级越高，默认是0，注意，对onDisable和onDestroy无效**

		cc.Class({
			extends: cc.Component,
			editor: {
				executionOrder: -1	
			},
			...
		})

