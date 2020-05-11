**所有设计及代码都可以根据游戏类型进行自由扩展**
# assets
## resources
### 简介
游戏动态加载的资源，通过脚本管理的资源**必须**放在该目录下

**需要手动创建**，必须位于assets目录下

除了在构建发布面板勾选的场景外，该目录下的所有资源，连同其关联依赖的外部资源都会被导出，**所以，不需要cc.loader.loadRes的资源不要放在该目录下，否则会增大包体和setting.js的大小**
### 设计
	audio, 音频目录
	gameRes, 游戏图片目录
	prefab, 预制体目录
## Scene
### 简介
游戏场景
### 设计
	preload, 加载场景
	game, 游戏场景
## Script
### 简介
游戏脚本
### 设计
	component, 公共预制体脚本存放目录
	config, 游戏环境配置
	|——dev, 开发环境
	|——pro, 正式环境
	|——MnEntryConfig.ts, 入口配置
	game, 游戏目录
	|——component, 游戏特有的预制体脚本存放目录
	|——config, 游戏特有配置
	|——manager, 游戏管理
	|——model, 游戏数据模型
	global, 全局数据存放目录
	lib, 工具存放目录
	manager, 公共管理类存放目录
	net, 网络
	sdk, 平台
## Texture
### 简介
资源
### 设计
	effect, 自定义着色效果
	material，自定义材质资源
	model, 3D模型
	prefab, 公共预制体
	game, 游戏资源