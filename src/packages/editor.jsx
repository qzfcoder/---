import { computed, defineComponent, inject, ref } from "vue";
import "./editor.scss";
import EditBlock from "./editor-block.jsx";
import { deepClone } from "../utils/deepClone";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDragger } from "./useBlockDragger";
export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  components: {
    EditBlock,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit("update:modelValue", deepClone(newValue));
      },
    });
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    const config = inject("config");

    const containRef = ref(null);
    // 实现菜单拖拽功能
    const { dragstart, dragend } = useMenuDragger(containRef, data);
    // 实现获取焦点
    let { blockMousedown, focusData, containerMousedown } = useFocus(data, (e) => {
      console.log(focusData.value);
      mousedown(e);
    });
    const {mousedown} = useBlockDragger(focusData)

    
    return () => (
      <div class="editor">
        <div class="editor-left">
          {/* 实现h5的拖拽 */}
          {config.componentList.map((component) => (
            <div
              class="editor-left-item"
              draggable
              onDragstart={(e) => dragstart(e, component)}
              onDragend={dragend}
            >
              <span>{component.label}</span>
              <div>{component.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor-top">菜单栏</div>
        <div class="editor-right">右侧</div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 这是页面的内容 */}
            <div
              class="editor-container-canvas_content"
              style={containerStyles.value}
              onMousedown={containerMousedown}
              ref={containRef}
            >
              {data.value.blocks.map((block) => (
                <EditBlock
                  class={block.focus ? "editor-block-focus" : ""}
                  onMousedown={(e) => {
                    blockMousedown(e, block);
                  }}
                  block={block}
                ></EditBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
