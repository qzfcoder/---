// 列表区，显示所有物料
// key对应的组件映射关系
import {ElButton, ElInput} from 'element-plus'

function createEditorConfig() {
  const componentList= []
  const componentMap ={}

  return {
    componentList,
    componentMap,
    register: (component) =>{
      componentList.push(component)
      componentMap[component.key] = component
    }
  }
}

export let registerConfig = createEditorConfig()
console.log(registerConfig,'zzzzzzz')
registerConfig.register({
  label:'文本',
  preview: ()=> '预览文本',
  render: ()=> '渲染文本',
  key:'text'
})

registerConfig.register({
  label:'按钮',
  preview: ()=> <ElButton>预览按钮</ElButton>,
  render: ()=> <ElButton>渲染按钮</ElButton>,
  key:'button'
})

registerConfig.register({
  label:'输入框',
  preview: ()=> <ElInput placeholder="预览按钮"></ElInput>,
  render: ()=> <ElInput placeholder="渲染按钮"></ElInput>,
  key:'input'
})