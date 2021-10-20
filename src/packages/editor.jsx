import { computed, defineComponent, inject } from "vue";
import "./editor.scss";
import EditBlock from "./editor-block.jsx";

export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  components: {
    EditBlock,
  },
  setup(props) {
    const data = computed({
      get() {
        return props.modelValue;
      },
    });
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    const config = inject("config");
    return () => (
      <div class="editor">
        <div class="editor-left">
          {config.componentList.map((component) => (
            <div class="editor-left-item">
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
            >
              {data.value.blocks.map((block) => (
                <EditBlock block={block}></EditBlock>
                // <div>1</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
